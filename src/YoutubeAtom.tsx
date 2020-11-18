import React, { useEffect, useState, useCallback } from 'react';
import { css } from 'emotion';

import { palette, space } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { SvgPlay } from '@guardian/src-icons';

import { YoutubeStateChangeEventType } from './types';
import { MaintainAspectRatio } from './common/MaintainAspectRatio';
import { formatTime } from './lib/formatTime';

declare let window: any;

type EmbedConfig = {
    adsConfig: {
        adTagParameters: {
            iu: string;
            cust_params: string;
        };
    };
};

interface AdTargeting {
    adUnit: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customParams: { [key: string]: any };
}

const buildEmbedConfig = (adTargeting: AdTargeting): EmbedConfig => {
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

const constructQuery = (query: { [key: string]: any }): string =>
    Object.keys(query)
        .map((param: any) => {
            const value = query[param];
            const queryValue = Array.isArray(value)
                ? value.map((v) => encodeURIComponent(v)).join(',')
                : encodeURIComponent(value);
            return `${param}=${queryValue}`;
        })
        .join('&');

type YoutubeMeta = {
    assetId: string;
    mediaTitle: string;
    id?: string;
    channelId?: string;
    duration?: number;
    posterSrc?: string;
    height?: string;
    width?: string;
};

type VideoEventKey = 'play' | '25' | '50' | '75' | 'end' | 'skip';

type YoutubeAtomType = {
    videoMeta: YoutubeMeta;
    overlayImage?: string;
    adTargeting?: AdTargeting;
    height?: number;
    width?: number;
    title?: string;
    duration?: number; // in seconds
    origin?: string;
    gaEventEmitter?: (event: VideoEventKey) => void;
    ophanEventEmitter?: (event: VideoEventKey) => void;
};

let progressTracker: NodeJS.Timeout | null;

// make sure that only 1 event has been sent per video
let has25PercentEventBeenDispatched = false;
let has50PercentEventBeenDispatched = false;
let has75PercentEventBeenDispatched = false;
export const onPlayerStateChangeAnalytics = ({
    e,
    hasUserLaunchedPlay,
    setHasUserLaunchedPlay,
    gaEventEmitter,
    ophanEventEmitter,
    getCurrentTime,
    getDuration,
}: {
    e: YoutubeStateChangeEventType;
    hasUserLaunchedPlay: boolean;
    setHasUserLaunchedPlay: (userLaunchEvent: boolean) => void;
    gaEventEmitter?: (event: VideoEventKey) => void;
    ophanEventEmitter?: (event: VideoEventKey) => void;
    getCurrentTime: () => number;
    getDuration: () => number;
}) => {
    /** YouTube API
            -1 (unstarted)
            0 (ended)
            1 (playing)
            2 (paused)
            3 (buffering)
            5 (video cued)
        **/
    switch (e.data) {
        // playing
        case 1: {
            // need to make sure user is not resuming
            if (!hasUserLaunchedPlay) {
                gaEventEmitter && gaEventEmitter('play');
                ophanEventEmitter && ophanEventEmitter('play');
            }
            setHasUserLaunchedPlay(true);

            progressTracker = setInterval(() => {
                if (!gaEventEmitter)
                    // eslint-disable-next-line no-console
                    console.error(`GA function is not available`);
                if (!ophanEventEmitter)
                    // eslint-disable-next-line no-console
                    console.error(`Ophan function is not available`);

                const currentTime = getCurrentTime();
                const duration = getDuration();
                const percentPlayed = Math.round(
                    (currentTime / duration) * 100,
                );

                switch (percentPlayed) {
                    case 25: {
                        if (!has25PercentEventBeenDispatched) {
                            gaEventEmitter && gaEventEmitter('25');
                            ophanEventEmitter && ophanEventEmitter('25');
                            has25PercentEventBeenDispatched = true;
                        }
                        break;
                    }
                    case 50: {
                        if (!has50PercentEventBeenDispatched) {
                            gaEventEmitter && gaEventEmitter('50');
                            ophanEventEmitter && ophanEventEmitter('50');
                            has50PercentEventBeenDispatched = true;
                        }
                        break;
                    }
                    case 75: {
                        if (!has75PercentEventBeenDispatched) {
                            gaEventEmitter && gaEventEmitter('75');
                            ophanEventEmitter && ophanEventEmitter('75');
                            has75PercentEventBeenDispatched = true;
                        }
                        break;
                    }
                }
            }, 1000);
            break;
        }
        // paused
        case 2: {
            progressTracker && clearInterval(progressTracker);
            break;
        }
        // ended
        case 0: {
            gaEventEmitter && gaEventEmitter('end');
            ophanEventEmitter && ophanEventEmitter('end');
            progressTracker && clearInterval(progressTracker);
        }
    }
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
    :focus,
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

const playButtonStyling = css`
    background-color: ${palette['news'][500]};
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

const videoDurationStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })};
    padding-left: ${space[3]}px;
    color: ${palette['news'][500]};
`;

// Note, this is a subset of the CAPI MediaAtom essentially.
export const YoutubeAtom = ({
    videoMeta,
    overlayImage,
    adTargeting,
    height = 259,
    width = 460,
    title = 'YouTube video player',
    duration,
    origin,
    gaEventEmitter,
    ophanEventEmitter,
}: YoutubeAtomType): JSX.Element => {
    const embedConfig =
        adTargeting && JSON.stringify(buildEmbedConfig(adTargeting));
    const originString = origin ? `&origin=${origin}` : '';
    const iframeSrc = `https://www.youtube.com/embed/${videoMeta.assetId}?embed_config=${embedConfig}&enablejsapi=1${originString}&widgetid=1&modestbranding=1`;

    const [hasUserLaunchedPlay, setHasUserLaunchedPlay] = useState<boolean>(
        false,
    );
    const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
    const [player, setPlayer] = useState<YT.Player | null>(null);

    const loadVideo = () => {
        setPlayer(
            new window.YT.Player(`${videoMeta.assetId}`, {
                videoId: `${videoMeta.assetId}`,
                events: {
                    onReady: () => setIsPlayerReady(true),
                    // Issue with setting events on Youtube object (refer to useEffect below)
                    // https://stackoverflow.com/a/17078152
                    // onPlayerStateChange,
                },
                playerVars: {
                    mute: 1,
                    autoplay: 1,
                },
            }),
        );
    };

    useEffect(() => {
        if (player) {
            // ts-ignore is used because onStateChange has different listener to what is actually sent
            // @ts-ignore
            const playerAnalyticsFunction = (e) =>
                onPlayerStateChangeAnalytics({
                    e,
                    hasUserLaunchedPlay,
                    setHasUserLaunchedPlay,
                    gaEventEmitter,
                    ophanEventEmitter,
                    getCurrentTime: player.getCurrentTime,
                    getDuration: player.getDuration,
                });
            // Issue with setting events on Youtube object
            // https://stackoverflow.com/a/17078152

            player.addEventListener('onStateChange', playerAnalyticsFunction);
            // return player.removeEventListener(
            //     'onStateChange',
            //     playerAnalyticsFunction,
            // );
        }
    }, [
        player,
        hasUserLaunchedPlay,
        setHasUserLaunchedPlay,
        gaEventEmitter,
        ophanEventEmitter,
    ]);

    useEffect(() => {
        // if window is undefined it is because this logic is running on the server side
        if (typeof window === 'undefined') return;

        if (window.YT) {
            loadVideo();
        } else {
            // If not, load the script asynchronously
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

            // onYouTubeIframeAPIReady will load the video after the script is loaded
            window.onYouTubeIframeAPIReady = loadVideo;

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag &&
                firstScriptTag.parentNode &&
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    }, []);

    const onClickOverlay = useCallback(() => {
        if (isPlayerReady && player) {
            try {
                player.playVideo();
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error(`Unable to play video due to: ${e}`);
            }
        }
    }, [player, isPlayerReady]);

    const onKeyDownOverlay = useCallback(
        (e) => {
            const spaceKey = 32;
            const enterKey = 13;
            if (
                (e.keyCode === spaceKey || e.keyCode === enterKey) &&
                isPlayerReady &&
                player
            ) {
                try {
                    player.playVideo();
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.error(`Unable to play video due to: ${e}`);
                }
            }
        },
        [player, isPlayerReady],
    );

    return (
        <MaintainAspectRatio height={height} width={width}>
            <iframe
                title={title}
                width={width}
                height={height}
                id={videoMeta.assetId}
                src={iframeSrc}
                // needed in order to allow `player.playVideo();` to be able to run
                // https://stackoverflow.com/a/53298579/7378674
                allow="autoplay"
                tabIndex={overlayImage ? -1 : 0}
            />
            {overlayImage && (
                <div className={hasUserLaunchedPlay ? hideOverlayStyling : ''}>
                    <img
                        className={overlayStyles}
                        src={overlayImage}
                        onClick={onClickOverlay}
                        onKeyDown={onKeyDownOverlay}
                        tabIndex={0}
                    />
                    <div className={overlayInfoWrapperStyles}>
                        <div
                            className={`${playButtonStyling} overlay-play-button`}
                        >
                            <SvgPlay />
                        </div>
                        {duration && (
                            <div className={videoDurationStyles}>
                                {formatTime(duration)}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </MaintainAspectRatio>
    );
};
