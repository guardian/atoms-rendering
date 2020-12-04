import React, { useEffect, useState, useRef } from 'react';
import { css, cx } from 'emotion';
import YouTubePlayer from 'youtube-player';

import { focusHalo } from '@guardian/src-foundations/accessibility';
import { palette, space } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { SvgPlay } from '@guardian/src-icons';

import { YoutubeStateChangeEventType } from './types';
import { MaintainAspectRatio } from './common/MaintainAspectRatio';
import { formatTime } from './lib/formatTime';

type Props = {
    videoMeta: YoutubeMeta;
    overlayImage?: { src: string; alt: string };
    posterImage?: { srcSet: { url: string; width: number }[]; alt: string };
    adTargeting?: AdTargeting;
    height?: number;
    width?: number;
    title?: string;
    duration?: number; // in seconds
    origin?: string;
    eventEmitters: ((event: VideoEventKey) => void)[];
};
declare global {
    interface Window {
        onYouTubeIframeAPIReady: unknown;
    }
}

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

// https://developers.google.com/youtube/iframe_api_reference#Events
export const youtubePlayerState = {
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5,
};

let progressTrackerTimoutId: number | undefined;
let pastProgressPercentage = 0;

const intervalProgressTracker = async ({
    player,
    eventEmitters,
}: {
    eventEmitters: ((event: VideoEventKey) => void)[];
    player: YoutubePlayerType;
}) => {
    const currentTime = await player.getCurrentTime();
    const duration = await player.getDuration();

    // Note that getDuration() will return 0 until the video's metadata is loaded
    // which normally happens just after the video starts playing.
    if (duration === 0) return;

    const percentPlayed = ((currentTime / duration) * 100) as number;

    if (pastProgressPercentage < 25 && 25 < percentPlayed) {
        pastProgressPercentage = percentPlayed;

        eventEmitters.forEach((eventEmitter) =>
            eventEmitter('25' as VideoEventKey),
        );
    }

    if (pastProgressPercentage < 50 && 50 < percentPlayed) {
        pastProgressPercentage = percentPlayed;

        eventEmitters.forEach((eventEmitter) =>
            eventEmitter('50' as VideoEventKey),
        );
    }

    if (pastProgressPercentage < 75 && 75 < percentPlayed) {
        pastProgressPercentage = percentPlayed;

        eventEmitters.forEach((eventEmitter) =>
            eventEmitter('75' as VideoEventKey),
        );
    }

    // we recursively set set timeout as a way of only having one interval at a time querying
    progressTrackerTimoutId = window.setTimeout(
        () => intervalProgressTracker({ eventEmitters, player }),
        3000,
    );
};

export const onPlayerStateChangeAnalytics = ({
    e,
    eventEmitters,
    player,
    eventState,
    setEventState,
}: {
    e: YoutubeStateChangeEventType;
    eventEmitters: ((event: VideoEventKey) => void)[];
    player: YoutubePlayerType;
    eventState: { [key: string]: boolean };
    setEventState: (newState: { [key: string]: boolean }) => void;
}): void => {
    switch (e.data) {
        case youtubePlayerState.PLAYING: {
            if (!eventState['play']) {
                eventEmitters.forEach((eventEmitter) => eventEmitter('play'));
                setEventState({ ...eventState, play: true });
            }

            // Need to remove previous setInterval if already exists
            if (progressTrackerTimoutId) {
                clearTimeout(progressTrackerTimoutId);
                progressTrackerTimoutId = undefined;
            }

            intervalProgressTracker({ eventEmitters, player });
            break;
        }
        case youtubePlayerState.PAUSED: {
            if (progressTrackerTimoutId) {
                clearTimeout(progressTrackerTimoutId);
                progressTrackerTimoutId = undefined;
            }
            break;
        }
        // ended
        case youtubePlayerState.ENDED: {
            if (!eventState['end']) {
                eventEmitters.forEach((eventEmitter) => eventEmitter('end'));
                setEventState({ ...eventState, end: true });
            }
            pastProgressPercentage = 0;

            progressTrackerTimoutId && clearTimeout(progressTrackerTimoutId);
            break;
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
};

// Note, this is a subset of the CAPI MediaAtom essentially.
export const YoutubeAtom = ({
    videoMeta,
    overlayImage,
    posterImage,
    adTargeting,
    height = 259,
    width = 460,
    title = 'YouTube video player',
    duration,
    origin,
    eventEmitters,
}: Props): JSX.Element => {
    const embedConfig =
        adTargeting && JSON.stringify(buildEmbedConfig(adTargeting));
    const originString = origin ? `&origin=${origin}` : '';
    const iframeSrc = `https://www.youtube.com/embed/${videoMeta.assetId}?embed_config=${embedConfig}&enablejsapi=1${originString}&widgetid=1&modestbranding=1`;

    const [hasUserLaunchedPlay, setHasUserLaunchedPlay] = useState<boolean>(
        false,
    );

    // use booleans make sure that only 1 event has been sent per video
    const [eventState, setEventState] = useState<{ [key: string]: boolean }>({
        play: false,
        end: false,
    });

    const player = useRef<YoutubePlayerType>();

    useEffect(() => {
        if (!player.current) {
            player.current = YouTubePlayer(
                `youtube-video-${videoMeta.assetId}`,
            );
        }
        const listener = player.current?.on(
            'stateChange',
            (e: YT.PlayerEvent & YoutubeStateChangeEventType) => {
                if (player.current) {
                    onPlayerStateChangeAnalytics({
                        e,
                        eventEmitters,
                        player: player.current,
                        eventState,
                        setEventState,
                    });
                }
            },
        );

        return () => listener && player.current?.off(listener);
    }, [player, eventEmitters, eventState, setEventState]);

    return (
        <MaintainAspectRatio height={height} width={width}>
            <iframe
                title={title}
                width={width}
                height={height}
                id={`youtube-video-${videoMeta.assetId}`}
                src={iframeSrc}
                // needed in order to allow `player.playVideo();` to be able to run
                // https://stackoverflow.com/a/53298579/7378674
                allow="autoplay"
                tabIndex={overlayImage || posterImage ? -1 : 0}
            />

            {(overlayImage || posterImage) && (
                <div
                    onClick={() => {
                        setHasUserLaunchedPlay(true);
                        player.current?.playVideo();
                    }}
                    onKeyDown={(e) => {
                        true;
                        const spaceKey = 32;
                        const enterKey = 13;
                        if (e.keyCode === spaceKey || e.keyCode === enterKey)
                            player.current?.playVideo();
                    }}
                    className={cx(
                        overlayStyles,
                        hasUserLaunchedPlay ? hideOverlayStyling : '',
                    )}
                    tabIndex={0}
                >
                    <img
                        className={css`
                            height: 100%;
                            width: 100%;
                        `}
                        src={overlayImage ? overlayImage.src : ''}
                        srcSet={
                            // if overlayImage exists we should favor that image instead of posterImage
                            // therefore srcSet should be empty if overlayImage exists
                            !overlayImage && posterImage
                                ? posterImage.srcSet
                                      .map((set) => `${set.url} ${set.width}w`)
                                      .join(',')
                                : ''
                        }
                        alt={
                            (overlayImage && overlayImage.alt) ||
                            (posterImage && posterImage.alt) ||
                            ''
                        }
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
