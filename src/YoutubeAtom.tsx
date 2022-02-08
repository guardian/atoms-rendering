import React, { useEffect, useState, useRef } from 'react';
import { css } from '@emotion/react';
import { pillarPalette } from './lib/pillarPalette';

import {
    focusHalo,
    space,
    textSans,
    neutral,
} from '@guardian/source-foundations';
import { SvgPlay } from '@guardian/source-react-components';

import { MaintainAspectRatio } from './common/MaintainAspectRatio';
// import { Placeholder } from './common/Placeholder';
import { formatTime } from './lib/formatTime';
import { Picture } from './Picture';
import { AdTargeting, ImageSource, RoleType } from './types';
import { ArticleTheme, loadScript } from '@guardian/libs';
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
        YT?: typeof YT;
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

type OnStateChangeListener = (
    e: YT.PlayerEvent & YoutubeStateChangeEventType,
) => void;

const createOnStateChangeListener = (
    eventEmitters: Props['eventEmitters'],
): OnStateChangeListener => (e) => {
    console.log('onStateChange', e);
    const player = e.target;
    let hasSentPlayEvent = false;
    let hasSent25Event = false;
    let hasSent50Event = false;
    let hasSent75Event = false;

    if (e.data === youtubePlayerState.PLAYING) {
        if (!hasSentPlayEvent) {
            eventEmitters.forEach((eventEmitter) => eventEmitter('play'));
            hasSentPlayEvent = true;

            setTimeout(() => {
                checkProgress();
            }, 3000);
        }

        const checkProgress = async () => {
            if (!player) return null;
            const currentTime = player && player.getCurrentTime();
            const duration = player && player.getDuration();

            if (!duration || !currentTime) return;

            const percentPlayed = (currentTime / duration) * 100;

            if (!hasSent25Event && 25 < percentPlayed) {
                eventEmitters.forEach((eventEmitter) => eventEmitter('25'));
                hasSent25Event = true;
            }

            if (!hasSent50Event && 50 < percentPlayed) {
                eventEmitters.forEach((eventEmitter) => eventEmitter('50'));
                hasSent50Event = true;
            }

            if (!hasSent75Event && 75 < percentPlayed) {
                eventEmitters.forEach((eventEmitter) => eventEmitter('75'));
                hasSent75Event = true;
            }

            const currentPlayerState = player && player.getPlayerState();

            if (currentPlayerState !== youtubePlayerState.ENDED) {
                // Set a timeout to check progress again in the future
                window.setTimeout(() => checkProgress(), 3000);
            }
        };
    }

    if (e.data === youtubePlayerState.ENDED) {
        eventEmitters.forEach((eventEmitter) => eventEmitter('end'));
    }
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
    eventEmitters,
    pillar,
}: Props): JSX.Element => {
    const [YTReady, setYTReady] = useState<boolean>(false);
    const [hasUserLaunchedPlay, setHasUserLaunchedPlay] = useState<boolean>(
        false,
    );
    const [interactionStarted, setInteractionStarted] = useState<boolean>(
        false,
    );
    const playerRef = useRef<YT.Player>();

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
    // const showPlaceholder = !hasOverlay || hasUserLaunchedPlay;

    let loadPlayer: boolean;
    if (!hasOverlay) {
        // Always load the iframe if there is no overlay
        loadPlayer = true;
    } else if (hasUserLaunchedPlay) {
        // The overlay has been clicked so we should load the iframe
        loadPlayer = true;
    } else {
        // Load early when either the mouse over or touch start event is fired
        loadPlayer = interactionStarted;
    }

    useEffect(() => {
        loadScript('https://www.youtube.com/iframe_api').then(
            () =>
                (window.onYouTubeIframeAPIReady = () => {
                    console.log('Setting YTReady');
                    setYTReady(true);
                }),
        );
    }, []);

    useEffect(() => {
        if (consentState && YTReady && loadPlayer) {
            if (playerRef.current) {
                if (hasUserLaunchedPlay) {
                    playerRef.current.playVideo();
                }
            } else {
                console.log('Initialising YouTubePlayer');

                const adsConfig: AdsConfig =
                    !adTargeting || adTargeting.disableAds
                        ? disabledAds
                        : buildAdsConfigWithConsent(
                              false,
                              adTargeting.adUnit,
                              adTargeting.customParams,
                              consentState,
                          );

                const onStateChangeListener = createOnStateChangeListener(
                    eventEmitters,
                );

                // @ts-expect-error -- no public types for Player.embedConfig
                playerRef.current = new window.YT.Player(
                    `youtube-video-${assetId}`,
                    {
                        height: width,
                        width: height,
                        videoId: assetId,
                        playerVars: {
                            modestbranding: 1,
                            origin,
                            playsinline: 1,
                            rel: 0,
                        },
                        events: {
                            onReady: (e) => {
                                console.log('onReady', e);
                                // play if queued up
                                if (hasUserLaunchedPlay) {
                                    e.target.playVideo();
                                }
                            },
                            onStateChange: onStateChangeListener,
                        },
                        embedConfig: {
                            relatedChannels: [],
                            adsConfig,
                        },
                    },
                );

                console.log('playerRef initialised', playerRef.current);

                // return () => {
                //     onStateChangeListener &&
                //         playerRef.current &&
                //         playerRef.current.removeEventListener(
                //             'onStateChange',
                //             onStateChangeListener,
                //         );
                // };
            }
        }
    }, [consentState, YTReady, loadPlayer, eventEmitters, hasUserLaunchedPlay]);

    console.log({
        YTReady,
        loadPlayer,
        hasUserLaunchedPlay,
        interactionStarted,
    });

    return (
        <MaintainAspectRatio height={height} width={width}>
            {/* {showPlaceholder && (
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
            )} */}

            <div
                title={title}
                id={`youtube-video-${assetId}`}
                tabIndex={overrideImage || posterImage ? -1 : 0}
                data-atom-id={`youtube-video-${assetId}`}
                data-atom-type="youtube"
            ></div>

            {showOverlay && (
                <div
                    data-cy="youtube-overlay"
                    data-testid="youtube-overlay"
                    onClick={() => {
                        setHasUserLaunchedPlay(true);
                    }}
                    onKeyDown={(e) => {
                        if (e.code === 'Space' || e.code === 'Enter') {
                            setHasUserLaunchedPlay(true);
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
