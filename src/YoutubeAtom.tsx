import React, { useEffect, useState, useRef } from 'react';
import { css } from '@emotion/react';
import YouTubePlayer from 'youtube-player';
import { pillarPalette } from './lib/pillarPalette';

import {
    focusHalo,
    space,
    textSans,
    neutral,
} from '@guardian/source-foundations';
import { SvgPlay } from '@guardian/source-react-components';

import { MaintainAspectRatio } from './common/MaintainAspectRatio';
import { Placeholder } from './common/Placeholder';
import { formatTime } from './lib/formatTime';
import { Picture } from './Picture';
import { AdTargeting, ImageSource, RoleType } from './types';
import { ArticleTheme } from '@guardian/libs';
import type { ConsentState } from '@guardian/consent-management-platform/dist/types';
import {
    AdsConfig,
    buildAdsConfigWithConsent,
    disabledAds,
} from '@guardian/commercial-core';

type Props = {
    assetId: string;
    overrideImage?: ImageSource[];
    posterImage?: ImageSource[];
    adTargeting?: AdTargeting;
    consentState?: ConsentState;
    height?: number;
    width?: number;
    title?: string;
    alt: string;
    role: RoleType;
    duration?: number; // in seconds
    origin?: string;
    eventEmitters: ((event: VideoEventKey) => void)[];
    pillar: ArticleTheme;
};
declare global {
    interface Window {
        onYouTubeIframeAPIReady: unknown;
    }
}

type YoutubeStateChangeEventType = { data: -1 | 0 | 1 | 2 | 3 | 5 };

type VideoEventKey = 'play' | '25' | '50' | '75' | 'end' | 'skip';

// https://developers.google.com/youtube/iframe_api_reference#Events
export const youtubePlayerState = {
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5,
};

const overlayStyles = css`
    background-size: cover;
    background-position: 49% 49%;
    background-repeat: no-repeat;
    text-align: center;
    height: 100%;
    width: 100%;
    position: absolute;
    max-height: 100vh;
    cursor: pointer;

    /* hard code "overlay-play-button" to be able to give play button animation on focus/hover of overlay */
    :focus {
        ${focusHalo}
        .overlay-play-button {
            transform: scale(1.15);
            transition-duration: 300ms;
        }
    }
    :hover {
        .overlay-play-button {
            transform: scale(1.15);
            transition-duration: 300ms;
        }
    }
`;

// Overlay CSS
const hideOverlayStyling = css`
    visibility: hidden;
    opacity: 0;
    transition: opacity 1s linear, visibility 1s;
    transition-delay: 500ms;
    transition-duration: 500ms;
`;

const playButtonStyling = (pillar: ArticleTheme) => css`
    background-color: ${pillarPalette[pillar][500]};
    border-radius: 100%;
    height: 60px;
    width: 60px;
    transform: scale(1);
    transition-duration: 300ms;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        fill: ${neutral[100]};
        width: 45px;
        height: 40px;
    }
`;

const overlayInfoWrapperStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    bottom: ${space[4]}px;
    left: ${space[4]}px;
`;

const videoDurationStyles = (pillar: ArticleTheme) => css`
    ${textSans.medium({ fontWeight: 'bold' })};
    padding-left: ${space[3]}px;
    color: ${pillarPalette[pillar][500]};
`;

type YoutubeCallback = (
    e: YT.PlayerEvent & YoutubeStateChangeEventType,
) => void;

// youtube-player doesn't have a type definition, do we have to create our own based on https://github.com/gajus/youtube-player
type YoutubePlayerType = {
    on: (state: string, callback: YoutubeCallback) => YoutubeCallback;
    off: (callback: YoutubeCallback) => void;
    loadVideoById: (videoId: string) => void;
    playVideo: () => void;
    getCurrentTime: () => number;
    getDuration: () => number;
    getPlayerState: () => number;
};

// Note, this is a subset of the CAPI MediaAtom essentially.
export const YoutubeAtom = ({
    assetId,
    overrideImage,
    posterImage,
    adTargeting,
    consentState,
    height = 259,
    width = 460,
    alt,
    role,
    title,
    duration,
    origin,
    eventEmitters,
    pillar,
}: Props): JSX.Element => {
    const [iframeSrc, setIframeSrc] = useState<string | undefined>(undefined);
    const [hasUserLaunchedPlay, setHasUserLaunchedPlay] = useState<boolean>(
        false,
    );
    const [interactionStarted, setInteractionStarted] = useState<boolean>(
        false,
    );
    const player = useRef<YoutubePlayerType>();

    const hasOverlay = overrideImage || posterImage;

    /**
     * Show the overlay if:
     * - It exists
     *
     * and
     *
     * - It hasn't been clicked upon
     */
    const showOverlay = hasOverlay && !hasUserLaunchedPlay;
    /**
     * Show a placeholder if:
     *
     * - We don't have an iframe source yet (probably because we don't have consent)
     *
     * and
     *
     * - There's no overlay to replace it with or the reader clicked to play but we're
     * still waiting on consent
     *
     */
    const showPlaceholder = !iframeSrc && (!hasOverlay || hasUserLaunchedPlay);

    let loadIframe: boolean;
    if (!iframeSrc) {
        // Never try to load the iframe if we don't have a source value for it
        loadIframe = false;
    } else if (!hasOverlay) {
        // Always load the iframe if there is no overlay
        loadIframe = true;
    } else if (hasUserLaunchedPlay) {
        // The overlay has been clicked so we should load the iframe
        loadIframe = true;
    } else {
        // Load early when either the mouse over or touch start event is fired
        loadIframe = interactionStarted;
    }

    useEffect(() => {
        /**
         * Build the iframe source url
         *
         * We do this on the client following hydration so we can dynamically build
         * adsConfig using client side data (primarily consent)
         *
         */

        // We don't want to ever load the iframe until we know the reader's consent preferences
        if (!consentState) return;

        const adsConfig: AdsConfig =
            !adTargeting || adTargeting.disableAds
                ? disabledAds
                : buildAdsConfigWithConsent(
                      false,
                      adTargeting.adUnit,
                      adTargeting.customParams,
                      consentState,
                  );
        const embedConfig = encodeURIComponent(JSON.stringify({ adsConfig }));
        const originString = origin
            ? `&origin=${encodeURIComponent(origin)}`
            : '';
        // `autoplay`?
        // We don't typically autoplay videos but in this case, where we know the reader has
        // already clicked to play, we use this param to ensure the video plays. Why would it
        // not play? Because when a reader clicks, we call player.current.playVideo() but at
        // that point the video may not have loaded and the click event won't work. Autoplay
        // is a failsafe for this scenario.
        const autoplay = hasUserLaunchedPlay ? '&autoplay=1' : '';
        setIframeSrc(
            `https://www.youtube.com/embed/${assetId}?embed_config=${embedConfig}&enablejsapi=1&widgetid=1&modestbranding=1${originString}${autoplay}`,
        );
    }, [consentState, hasUserLaunchedPlay]);

    useEffect(() => {
        if (loadIframe) {
            if (!player.current) {
                player.current = YouTubePlayer(`youtube-video-${assetId}`);
            }

            let hasSentPlayEvent = false;
            let hasSent25Event = false;
            let hasSent50Event = false;
            let hasSent75Event = false;

            const listener =
                player.current &&
                player.current.on(
                    'stateChange',
                    (e: YT.PlayerEvent & YoutubeStateChangeEventType) => {
                        if (e.data === youtubePlayerState.PLAYING) {
                            if (!hasSentPlayEvent) {
                                eventEmitters.forEach((eventEmitter) =>
                                    eventEmitter('play'),
                                );
                                hasSentPlayEvent = true;

                                setTimeout(() => {
                                    checkProgress();
                                }, 3000);
                            }

                            const checkProgress = async () => {
                                if (!player || !player.current) return null;
                                const currentTime =
                                    player.current &&
                                    (await player.current.getCurrentTime());
                                const duration =
                                    player.current &&
                                    (await player.current.getDuration());

                                if (!duration || !currentTime) return;

                                const percentPlayed =
                                    (currentTime / duration) * 100;

                                if (!hasSent25Event && 25 < percentPlayed) {
                                    eventEmitters.forEach((eventEmitter) =>
                                        eventEmitter('25'),
                                    );
                                    hasSent25Event = true;
                                }

                                if (!hasSent50Event && 50 < percentPlayed) {
                                    eventEmitters.forEach((eventEmitter) =>
                                        eventEmitter('50'),
                                    );
                                    hasSent50Event = true;
                                }

                                if (!hasSent75Event && 75 < percentPlayed) {
                                    eventEmitters.forEach((eventEmitter) =>
                                        eventEmitter('75'),
                                    );
                                    hasSent75Event = true;
                                }

                                const currentPlayerState =
                                    player.current &&
                                    (await player.current.getPlayerState());

                                if (
                                    currentPlayerState !==
                                    youtubePlayerState.ENDED
                                ) {
                                    // Set a timeout to check progress again in the future
                                    window.setTimeout(
                                        () => checkProgress(),
                                        3000,
                                    );
                                }
                            };
                        }

                        if (e.data === youtubePlayerState.ENDED) {
                            eventEmitters.forEach((eventEmitter) =>
                                eventEmitter('end'),
                            );
                        }
                    },
                );

            return () => {
                listener && player.current && player.current.off(listener);
            };
        }
    }, [eventEmitters, loadIframe]);

    return (
        <MaintainAspectRatio height={height} width={width}>
            {showPlaceholder && (
                <div
                    css={css`
                        width: ${width}px;
                        height: ${height}px;
                        position: absolute;
                        top: 0;
                        left: 0;
                    `}
                >
                    <Placeholder
                        height={height}
                        width={width}
                        shouldShimmer={true}
                    />
                </div>
            )}

            {loadIframe && (
                <iframe
                    title={title}
                    width={width}
                    height={height}
                    id={`youtube-video-${assetId}`}
                    src={iframeSrc}
                    // needed in order to allow `player.playVideo();` to be able to run
                    // https://stackoverflow.com/a/53298579/7378674
                    allow="autoplay"
                    tabIndex={overrideImage || posterImage ? -1 : 0}
                    allowFullScreen
                    data-atom-id={`youtube-video-${assetId}`}
                    data-atom-type="youtube"
                />
            )}

            {showOverlay && (
                <div
                    daya-cy="youtube-overlay"
                    data-testid="youtube-overlay"
                    onClick={() => {
                        setHasUserLaunchedPlay(true);
                        iframeSrc &&
                            player.current &&
                            player.current.playVideo();
                    }}
                    onKeyDown={(e) => {
                        if (e.code === 'Space' || e.code === 'Enter') {
                            setHasUserLaunchedPlay(true);
                            iframeSrc &&
                                player.current &&
                                player.current.playVideo();
                        }
                    }}
                    onMouseEnter={() => setInteractionStarted(true)}
                    onTouchStart={() => setInteractionStarted(true)}
                    css={[
                        overlayStyles,
                        hasUserLaunchedPlay ? hideOverlayStyling : '',
                        css`
                            img {
                                height: 100%;
                                width: 100%;
                            }
                        `,
                    ]}
                    tabIndex={0}
                >
                    <Picture
                        imageSources={overrideImage || posterImage || []}
                        role={role}
                        alt={alt}
                        height={`${height}`}
                        width={`${width}`}
                    />
                    <div css={overlayInfoWrapperStyles}>
                        <div
                            className="overlay-play-button"
                            css={css`
                                ${playButtonStyling(pillar)}
                            `}
                        >
                            <SvgPlay />
                        </div>
                        {duration && (
                            <div css={videoDurationStyles(pillar)}>
                                {formatTime(duration)}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </MaintainAspectRatio>
    );
};
