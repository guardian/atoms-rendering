import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { PlayerListenerName, YouTubePlayer } from './YouTubePlayer';

import type { AdTargeting, VideoEventKey } from './types';
import type { ConsentState } from '@guardian/consent-management-platform/dist/types';
import {
    AdsConfig,
    buildAdsConfigWithConsent,
    disabledAds,
} from '@guardian/commercial-core';
import { log } from '@guardian/libs';

type Props = {
    uniqueId: string;
    videoId: string;
    adTargeting?: AdTargeting;
    consentState: ConsentState;
    height: number;
    width: number;
    title?: string;
    origin?: string;
    eventEmitters: ((event: VideoEventKey) => void)[];
    autoPlay: boolean;
    onReady: () => void;
    pauseVideo: boolean;
};

type CustomPlayEventDetail = { videoId: string };
const customPlayEventName = 'video:play';

type ProgressEvents = {
    hasSentPlayEvent: boolean;
    hasSent25Event: boolean;
    hasSent50Event: boolean;
    hasSent75Event: boolean;
    hasSentEndEvent: boolean;
};

/**
 *  E.g.
 *  name: onReady, onStateChange, etc...
 *  listener: YT.PlayerEventHandler<PlayerEvent>, YT.PlayerEventHandler<OnStateChangeEvent>
 */
type PlayerListener<T extends PlayerListenerName> = {
    name: T;
    listener: NonNullable<YT.Events[T]>;
};

type PlayerListeners = Array<PlayerListener<PlayerListenerName>>;

/**
 * Given a YT.PlayerEventHandler, (e.g. PlayerEventHandler<OnStateChangeEvent>)
 * return its event type (e.g. OnStateChangeEvent)
 */
type ExtractEventType<T> = T extends YT.PlayerEventHandler<infer X> ? X : never;

/**
 * ProgressEvents are a ref, see below
 */
const createOnStateChangeListener =
    (
        videoId: string,
        uniqueId: string,
        progressEvents: ProgressEvents,
        eventEmitters: Props['eventEmitters'],
    ): YT.PlayerEventHandler<YT.OnStateChangeEvent> =>
    (event) => {
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
            /**
             * Emit video play event so other components
             * get aware when a video is played
             */
            document.dispatchEvent(
                new CustomEvent(customPlayEventName, {
                    detail: { uniqueId },
                }),
            );

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
            } else {
                log('dotcom', {
                    from: loggerFrom,
                    videoId,
                    msg: 'resume',
                    event,
                });
                eventEmitters.forEach((eventEmitter) => eventEmitter('resume'));
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

        if (event.data === YT.PlayerState.PAUSED) {
            log('dotcom', {
                from: loggerFrom,
                videoId,
                msg: 'pause',
                event,
            });
            eventEmitters.forEach((eventEmitter) => eventEmitter('pause'));
        }

        if (event.data === YT.PlayerState.CUED) {
            log('dotcom', {
                from: loggerFrom,
                videoId,
                msg: 'cued',
                event,
            });
            eventEmitters.forEach((eventEmitter) => eventEmitter('cued'));
            progressEvents.hasSentPlayEvent = false;
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
            progressEvents.hasSentPlayEvent = false;
        }
    };

/**
 * returns an onReady listener
 */
const createOnReadyListener =
    (videoId: string, onReadyCallback: () => void, autoPlay: boolean) =>
    (event: YT.PlayerEvent) => {
        log('dotcom', {
            from: 'YoutubeAtomPlayer onReady',
            videoId,
            msg: 'Ready',
            event,
        });
        /**
         * Callback to notify YoutubeAtom that the player is ready
         */
        onReadyCallback();
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

export const YoutubeAtomPlayer = ({
    uniqueId,
    videoId,
    adTargeting,
    consentState,
    height,
    width,
    title,
    origin,
    eventEmitters,
    autoPlay,
    onReady,
    pauseVideo,
}: Props): JSX.Element => {
    /**
     * useRef for player and progressEvents
     * Provides mutable persistent state for the player across renders
     * Does not cause re-renders on update
     */
    const player = useRef<YouTubePlayer>();
    const progressEvents = useRef<ProgressEvents>({
        hasSentPlayEvent: false,
        hasSent25Event: false,
        hasSent50Event: false,
        hasSent75Event: false,
        hasSentEndEvent: false,
    });

    const playerListeners = useRef<PlayerListeners>([]);

    /**
     * A map ref with a key of eventname and a value of eventHandler
     */
    const customListeners = useRef<
        Record<string, (event: CustomEventInit<CustomPlayEventDetail>) => void>
    >({});
    const id = `youtube-video-${uniqueId}`;

    /**
     * Initialise player useEffect
     */
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

                const onReadyListener = createOnReadyListener(
                    videoId,
                    onReady,
                    autoPlay,
                );

                const onStateChangeListener = createOnStateChangeListener(
                    videoId,
                    uniqueId,
                    progressEvents.current,
                    eventEmitters,
                );

                player.current = new YouTubePlayer(id, {
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
                    events: {
                        onReady: onReadyListener,
                        onStateChange: onStateChangeListener,
                    },
                });

                /**
                 * Pause the current video when another video is played
                 */
                const handleCustomPlayEvent = (
                    event: CustomEventInit<CustomPlayEventDetail>,
                ) => {
                    if (event instanceof CustomEvent) {
                        if (event.detail.uniqueId !== uniqueId) {
                            const playerStatePromise =
                                player.current?.getPlayerState();
                            playerStatePromise?.then((playerState) => {
                                if (
                                    playerState &&
                                    playerState === YT.PlayerState.PLAYING
                                ) {
                                    player.current?.pauseVideo();
                                }
                            });
                        }
                    }
                };

                /**
                 * add listener for custom play event
                 */
                document.addEventListener(
                    customPlayEventName,
                    handleCustomPlayEvent,
                );

                customListeners.current[customPlayEventName] =
                    handleCustomPlayEvent;

                playerListeners.current.push(
                    { name: 'onReady', listener: onReadyListener },
                    { name: 'onStateChange', listener: onStateChangeListener },
                );
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
     * Player pause useEffect
     */
    useEffect(() => {
        /**
         * if the 'pauseVideo' prop is true this should pause the video
         *
         * 'pauseVideo' is controlled by the close sticky video button
         */
        if (pauseVideo) {
            player.current?.pauseVideo();
        }
    }, [pauseVideo]);

    /**
     * Unregister listeners useLayoutEffect
     */
    useLayoutEffect(() => {
        /**
         * Unregister listeners before component unmount
         *
         * An empty dependency array will call its cleanup on unmount.
         *
         * Use useLayoutEffect to ensure the cleanup function is run
         * before the component is removed from the DOM. Usually clean up
         * functions will run after the render and commit phase.
         *
         * If we attempt to unregister listeners after the component is
         * removed from the DOM the YouTube API logs a warning to the console.
         */
        return () => {
            playerListeners.current.forEach((playerListener) => {
                type T = ExtractEventType<typeof playerListener.name>;
                player.current?.removeEventListener<T>(
                    playerListener.name,
                    playerListener.listener,
                );
            });

            Object.entries(customListeners.current).forEach(
                ([eventName, eventHandler]) => {
                    document.removeEventListener(eventName, eventHandler);
                },
            );
        };
    }, []);

    /**
     * An element for the YouTube iFrame to hook into the dom
     */
    return (
        <div
            id={id}
            data-atom-id={id}
            data-testid={id}
            data-atom-type="youtube"
            title={title}
        ></div>
    );
};
