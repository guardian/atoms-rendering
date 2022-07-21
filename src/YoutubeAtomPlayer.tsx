import React, { useEffect, useRef } from 'react';
import { YouTubePlayer } from './YouTubePlayer';

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
    stopVideo: boolean;
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
    stopVideo,
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
                        onReady: createOnReadyListener(
                            videoId,
                            onReady,
                            autoPlay,
                        ),
                        onStateChange: createOnStateChangeListener(
                            videoId,
                            uniqueId,
                            progressEvents.current,
                            eventEmitters,
                        ),
                    },
                });

                /**
                 * Stop the current video when another video is played on the same page
                 */
                const handleStopVideo = (
                    event: CustomEventInit<CustomPlayEventDetail>,
                ) => {
                    if (event instanceof CustomEvent) {
                        if (event.detail.uniqueId !== uniqueId) {
                            const playerStatePromise =
                                player.current?.getPlayerState();
                            playerStatePromise?.then((state) => {
                                if (state && state === YT.PlayerState.PLAYING) {
                                    player.current?.stopVideo();
                                }
                            });
                        }
                    }
                };

                /**
                 * add listener for custom play event
                 */
                document.addEventListener(customPlayEventName, handleStopVideo);

                customListeners.current[customPlayEventName] = handleStopVideo;
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
     * Player stop useEffect
     */
    useEffect(() => {
        /**
         * if the 'stopVideo' prop is true this should stop the video
         *
         * 'stopVideo' is controlled by the close sticky video button
         */
        if (stopVideo) {
            player.current?.stopVideo();
        }
    }, [stopVideo]);

    /**
     * Unregister listeners useEffect
     */
    useEffect(() => {
        /**
         * Unregister listeners on component unmount
         *
         * A useEffect with an empty dependency array will
         * call its cleanup on unmount and not after every
         * useEffect update.
         */
        return () => {
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
