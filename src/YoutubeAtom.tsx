import React, { useEffect, useState, useRef } from 'react';
import { css } from '@emotion/core';
import YouTubePlayer from 'youtube-player';
import { pillarPalette } from './lib/pillarPalette';

import { focusHalo } from '@guardian/src-foundations/accessibility';
import { palette, space } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { SvgPlay } from '@guardian/src-icons';

import { MaintainAspectRatio } from './common/MaintainAspectRatio';
import { formatTime } from './lib/formatTime';
import { Picture } from './Picture';
import { ImageSource, RoleType, AdTargetingType } from './types';
import { Theme } from '@guardian/types';

type Props = {
    assetId: string;
    overrideImage?: ImageSource[];
    posterImage?: ImageSource[];
    adTargeting?: AdTargetingType;
    height?: number;
    width?: number;
    title?: string;
    alt: string;
    role: RoleType;
    duration?: number; // in seconds
    origin?: string;
    eventEmitters: ((event: VideoEventKey) => void)[];
    pillar: Theme;
};
declare global {
    interface Window {
        onYouTubeIframeAPIReady: unknown;
    }
}

type YoutubeStateChangeEventType = { data: -1 | 0 | 1 | 2 | 3 | 5 };

type EmbedConfig = {
    adsConfig: {
        adTagParameters: {
            iu: string;
            cust_params: string;
        };
    };
};

const buildEmbedConfig = (adTargeting: AdTargetingType): EmbedConfig => {
    return {
        adsConfig: {
            adTagParameters: {
                iu: `${adTargeting.adUnit || ''}`,
                cust_params: encodeURIComponent(
                    constructQuery(adTargeting.customParams),
                ),
            },
        },
    };
};

const constructQuery = (query: { [key: string]: string }): string =>
    Object.keys(query)
        .map((param: string) => {
            const value = query[param];
            const queryValue = Array.isArray(value)
                ? value.map((v) => encodeURIComponent(v)).join(',')
                : encodeURIComponent(value);
            return `${param}=${queryValue}`;
        })
        .join('&');

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

const playButtonStyling = (pillar: Theme) => css`
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
        fill: ${palette['neutral'][100]};
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

const videoDurationStyles = (pillar: Theme) => css`
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
    const embedConfig =
        adTargeting && JSON.stringify(buildEmbedConfig(adTargeting));
    const originString = origin ? `&origin=${origin}` : '';
    const iframeSrc = `https://www.youtube.com/embed/${assetId}?embed_config=${embedConfig}&enablejsapi=1${originString}&widgetid=1&modestbranding=1`;

    const [hasUserLaunchedPlay, setHasUserLaunchedPlay] = useState<boolean>(
        false,
    );

    const player = useRef<YoutubePlayerType>();

    useEffect(() => {
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
                                currentPlayerState !== youtubePlayerState.ENDED
                            ) {
                                // Set a timeout to check progress again in the future
                                window.setTimeout(() => checkProgress(), 3000);
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
    }, [eventEmitters]);

    return (
        <MaintainAspectRatio height={height} width={width}>
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

            {(overrideImage || posterImage) && (
                <div
                    daya-cy="youtube-overlay"
                    onClick={() => {
                        setHasUserLaunchedPlay(true);
                        player.current && player.current.playVideo();
                    }}
                    onKeyDown={(e) => {
                        const spaceKey = 32;
                        const enterKey = 13;
                        if (e.keyCode === spaceKey || e.keyCode === enterKey) {
                            setHasUserLaunchedPlay(true);
                            player.current && player.current.playVideo();
                        }
                    }}
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
