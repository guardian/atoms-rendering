import React, { useEffect, useRef } from 'react';
import YouTubePlayer from 'youtube-player';

import type { AdTargeting, ImageSource, VideoEventKey } from './types';
import type { ConsentState } from '@guardian/consent-management-platform/dist/types';
import {
    AdsConfig,
    buildAdsConfigWithConsent,
    disabledAds,
} from '@guardian/commercial-core';
import { log } from '@guardian/libs';

type Props = {
    videoId: string;
    overrideImage?: ImageSource[];
    posterImage?: ImageSource[];
    adTargeting?: AdTargeting;
    consentState: ConsentState;
    height: number;
    width: number;
    title?: string;
    origin?: string;
    eventEmitters: ((event: VideoEventKey) => void)[];
    autoPlay: boolean;
    onReady: () => void;
    atomId?: string;
};

declare global {
    interface Window {
        onYouTubeIframeAPIReady: unknown;
    }
}

type YoutubeCallback = (e: YT.PlayerEvent & YT.OnStateChangeEvent) => void;

/**
 * youtube-player doesn't have a type definition
 * Based on https://github.com/gajus/youtube-player
 */
type YoutubePlayerType = {
    on: (state: string, callback: YoutubeCallback) => YoutubeCallback;
    off: (callback: YoutubeCallback) => void;
    loadVideoById: (videoId: string) => void;
    playVideo: () => void;
    getCurrentTime: () => number;
    getDuration: () => number;
    getPlayerState: () => number;
};

type ProgressEvents = {
    hasSentPlayEvent: boolean;
    hasSent25Event: boolean;
    hasSent50Event: boolean;
    hasSent75Event: boolean;
    hasSentEndEvent: boolean;
};

/**
 * ProgressEvents are a ref, see below
 */
const createOnStateChangeListener = (
    videoId: string,
    progressEvents: ProgressEvents,
    eventEmitters: Props['eventEmitters'],
): YT.PlayerEventHandler<YT.OnStateChangeEvent> => (event) => {
    const loggerFrom = 'YoutubeAtomPlayer onStateChange';
    log('dotcom', {
        from: loggerFrom,
        videoId,
        event,
    });

    /**
     * event.target is the actual underlying YT player
     */
    const player = event.target;

    if (event.data === YT.PlayerState.PLAYING) {
        if (!progressEvents.hasSentPlayEvent) {
            log('dotcom', {
                from: loggerFrom,
                videoId,
                msg: 'start play',
                event,
            });
            eventEmitters.forEach((eventEmitter) => eventEmitter('play'));
            progressEvents.hasSentPlayEvent = true;

            /**
             * Set a timeout to check progress again in the future
             */
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

            if (!progressEvents.hasSent25Event && 25 < percentPlayed) {
                log('dotcom', {
                    from: loggerFrom,
                    videoId,
                    msg: 'played 25%',
                    event,
                });
                eventEmitters.forEach((eventEmitter) => eventEmitter('25'));
                progressEvents.hasSent25Event = true;
            }

            if (!progressEvents.hasSent50Event && 50 < percentPlayed) {
                log('dotcom', {
                    from: loggerFrom,
                    videoId,
                    msg: 'played 50%',
                    event,
                });
                eventEmitters.forEach((eventEmitter) => eventEmitter('50'));
                progressEvents.hasSent50Event = true;
            }

            if (!progressEvents.hasSent75Event && 75 < percentPlayed) {
                log('dotcom', {
                    from: loggerFrom,
                    videoId,
                    msg: 'played 75%',
                    event,
                });
                eventEmitters.forEach((eventEmitter) => eventEmitter('75'));
                progressEvents.hasSent75Event = true;
            }

            const currentPlayerState = player && player.getPlayerState();

            if (currentPlayerState !== YT.PlayerState.ENDED) {
                /**
                 * Set a timeout to check progress again in the future
                 */
                setTimeout(() => checkProgress(), 3000);
            }
        };
    }

    if (
        event.data === YT.PlayerState.ENDED &&
        !progressEvents.hasSentEndEvent
    ) {
        log('dotcom', {
            from: loggerFrom,
            videoId,
            msg: 'ended',
            event,
        });
        eventEmitters.forEach((eventEmitter) => eventEmitter('end'));
        progressEvents.hasSentEndEvent = true;
    }
};

export const YoutubeAtomPlayer = ({
    videoId,
    overrideImage,
    posterImage,
    adTargeting,
    consentState,
    height,
    width,
    title,
    origin,
    eventEmitters,
    autoPlay,
    onReady,
    atomId,
}: Props): JSX.Element => {
    /**
     * useRef for player and progressEvents
     * Provides mutable persistent state for the player across renders
     * Does not cause re-renders on update
     */
    const player = useRef<YoutubePlayerType>();
    const progressEvents = useRef<ProgressEvents>({
        hasSentPlayEvent: false,
        hasSent25Event: false,
        hasSent50Event: false,
        hasSent75Event: false,
        hasSentEndEvent: false,
    });

    useEffect(
        () => {
            if (!player.current) {
                log('dotcom', {
                    from: 'YoutubeAtomPlayer initialise',
                    videoId,
                });

                const adsConfig: AdsConfig =
                    !adTargeting || adTargeting.disableAds
                        ? disabledAds
                        : buildAdsConfigWithConsent(
                            false,
                            adTargeting.adUnit,
                            adTargeting.customParams,
                            consentState,
                        );

                /**
                 * We use the wrapper library youtube-player: https://github.com/gajus/youtube-player
                 * It will load the iframe embed
                 * It's API allows us to queue up calls to YT that will fire when the underlying player is ready
                 */
                player.current = YouTubePlayer(`youtube-video-${videoId}`, {
                    height: width,
                    width: height,
                    videoId,
                    playerVars: {
                        modestbranding: 1,
                        origin,
                        playsinline: 1,
                        rel: 0,
                    },
                    embedConfig: {
                        relatedChannels: [],
                        adsConfig,
                    },
                });

                /**
                 * Register an onStateChange listener
                 */
                const stateChangeListener = createOnStateChangeListener(
                    videoId,
                    progressEvents.current,
                    eventEmitters,
                );

                player.current &&
                    player.current.on('stateChange', stateChangeListener);

                /**
                 * Register an onReady listener
                 */
                const readyListener = (event: YT.PlayerEvent) => {
                    log('dotcom', {
                        from: 'YoutubeAtomPlayer onReady',
                        videoId,
                        msg: 'Ready',
                        event,
                    });
                    /**
                     * Callback to notify that the player is ready
                     */
                    onReady();
                    /**
                     * Autoplay is determined by the parent
                     * Typically true when there is a preceding overlay
                     */
                    if (autoPlay) {
                        log('dotcom', {
                            from: 'YoutubeAtomPlayer onReady',
                            videoId,
                            msg: 'Playing video',
                            event,
                        });
                        /**
                         * event.target is the actual underlying YT player
                         */
                        event.target.playVideo();
                    }
                };

                player.current && player.current.on('ready', readyListener);

                return () => {
                    stateChangeListener &&
                        player.current &&
                        player.current.off(stateChangeListener);

                    readyListener &&
                        player.current &&
                        player.current.off(readyListener);
                };
            }
        },
        /**
         * useEffect dependencies are mostly static but added to array for correctness
         */
        [
            adTargeting,
            autoPlay,
            consentState,
            eventEmitters,
            height,
            onReady,
            origin,
            videoId,
            width,
        ],
    );

    /**
     * An element for the YouTube iFrame to hook into the dom
     */
    return (
        <div
            title={title}
            id={`youtube-video-${videoId}`}
            tabIndex={overrideImage || posterImage ? -1 : 0}
            data-atom-id={atomId}
            data-testid={`youtube-video-${videoId}`}
            data-atom-type="media"
        ></div>
    );
};
