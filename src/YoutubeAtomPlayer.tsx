import React, { useCallback, useEffect, useRef, useState } from 'react';
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
    imaAdTagUrl?: string;
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
    (
        videoId: string,
        onReadyCallback: () => void,
        setPlayerReady: () => void,
        instantiateImaManager?: (player: YT.Player) => void,
    ) =>
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
         * Callback to set value of playerReady ref
         */
        setPlayerReady();

        /**
         * instantiate IMA manager if IMA enabled
         */
        if (instantiateImaManager) {
            try {
                instantiateImaManager(event.target);
            } catch (e) {
                log('commercial', 'error instatiating IMA manager:', e);
            }
        }
    };

const createMakeAdsRequestCallback =
    (adTagUrl: string) => (adsRequest: { adTagUrl: string }) => {
        adsRequest.adTagUrl = adTagUrl;
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
    imaAdTagUrl,
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
    const enableIma = !!imaAdTagUrl;

    const [playerReady, setPlayerReady] = useState<boolean>(false);
    const playerReadyCallback = useCallback(() => setPlayerReady(true), []);

    /**
     * A map ref with a key of eventname and a value of eventHandler
     */
    const customListeners = useRef<
        Record<string, (event: CustomEventInit<CustomPlayEventDetail>) => void>
    >({});
    const id = `youtube-video-${uniqueId}`;
    const adId = `youtube-ad-container-${uniqueId}`;

    let instantiateImaManager: (player: YT.Player) => void;
    if (enableIma && imaAdTagUrl) {
        instantiateImaManager = (player) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore IMA is an experimental feature and ImaManager is not yet officially part of the YT type
            if (typeof window.YT.ImaManager !== 'undefined') {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore see above
                new window.YT.ImaManager(
                    player,
                    id,
                    adId,
                    createMakeAdsRequestCallback(imaAdTagUrl),
                );
            }
        };
    }

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
                    !adTargeting || adTargeting.disableAds || enableIma
                        ? disabledAds
                        : buildAdsConfigWithConsent(
                              false,
                              adTargeting.adUnit,
                              adTargeting.customParams,
                              consentState,
                          );

                const embedConfig = {
                    relatedChannels: [],
                    adsConfig,
                    // TODO will using null preserve default values for following two options?
                    enableIma: !!enableIma,
                    disableRelatedVideos: !!enableIma,
                };

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
                    embedConfig,
                    events: {
                        onReady: createOnReadyListener(
                            videoId,
                            onReady,
                            playerReadyCallback,
                            instantiateImaManager,
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
                            playerStatePromise?.then((playerState) => {
                                if (
                                    playerState &&
                                    playerState === YT.PlayerState.PLAYING
                                ) {
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
            enableIma,
        ],
    );

    useEffect(() => {
        if (playerReady && autoPlay) {
            /**
             * Autoplay is determined by the parent
             * Typically true when there is a preceding overlay
             */
            log('dotcom', {
                from: 'YoutubeAtomPlayer onReady',
                videoId,
                msg: 'Playing video',
            });
            player.current?.playVideo();
        }
    }, [playerReady, autoPlay]);

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
        <div>
            <div
                id={id}
                data-atom-id={id}
                data-testid={id}
                data-atom-type="youtube"
                title={title}
            ></div>
            {enableIma && <div id={adId}></div>}
        </div>
    );
};
