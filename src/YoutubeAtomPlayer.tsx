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
    assetId: string;
    overrideImage?: ImageSource[];
    posterImage?: ImageSource[];
    adTargeting?: AdTargeting;
    consentState?: ConsentState;
    height: number;
    width: number;
    title?: string;
    origin?: string;
    eventEmitters: ((event: VideoEventKey) => void)[];
    loadPlayer: boolean;
};

declare global {
    interface Window {
        onYouTubeIframeAPIReady: unknown;
    }
}

type YoutubeCallback = (e: YT.PlayerEvent & YT.OnStateChangeEvent) => void;

/**
 * youtube-player doesn't have a type definition
 * based on https://github.com/gajus/youtube-player
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

const createOnStateChangeListener = (
    eventEmitters: Props['eventEmitters'],
): YT.PlayerEventHandler<YT.OnStateChangeEvent> => (event) => {
    const loggerFrom = 'YoutubeAtomPlayer onStateChange';
    log('dotcom', {
        from: loggerFrom,
        event,
    });

    // event.target is the actual underlying YT player
    const player = event.target;
    let hasSentPlayEvent = false;
    let hasSent25Event = false;
    let hasSent50Event = false;
    let hasSent75Event = false;

    if (event.data === YT.PlayerState.PLAYING) {
        if (!hasSentPlayEvent) {
            log('dotcom', {
                from: loggerFrom,
                msg: 'start play',
                event,
            });
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
                log('dotcom', {
                    from: loggerFrom,
                    msg: 'played 25%',
                    event,
                });
                eventEmitters.forEach((eventEmitter) => eventEmitter('25'));
                hasSent25Event = true;
            }

            if (!hasSent50Event && 50 < percentPlayed) {
                log('dotcom', {
                    from: loggerFrom,
                    msg: 'played 50%',
                    event,
                });
                eventEmitters.forEach((eventEmitter) => eventEmitter('50'));
                hasSent50Event = true;
            }

            if (!hasSent75Event && 75 < percentPlayed) {
                log('dotcom', {
                    from: loggerFrom,
                    msg: 'played 75%',
                    event,
                });
                eventEmitters.forEach((eventEmitter) => eventEmitter('75'));
                hasSent75Event = true;
            }

            const currentPlayerState = player && player.getPlayerState();

            if (currentPlayerState !== YT.PlayerState.ENDED) {
                // Set a timeout to check progress again in the future
                window.setTimeout(() => checkProgress(), 3000);
            }
        };
    }

    if (event.data === YT.PlayerState.ENDED) {
        log('dotcom', {
            from: loggerFrom,
            msg: 'ended',
            event,
        });
        eventEmitters.forEach((eventEmitter) => eventEmitter('end'));
    }
};

export const YoutubeAtomPlayer = ({
    assetId,
    overrideImage,
    posterImage,
    adTargeting,
    consentState,
    height,
    width,
    title,
    origin,
    eventEmitters,
    loadPlayer,
}: Props): JSX.Element => {
    const player = useRef<YoutubePlayerType>();

    useEffect(() => {
        if (consentState && loadPlayer) {
            if (!player.current) {
                log('dotcom', {
                    from: 'YoutubeAtomPlayer useEffect loadPlayer',
                    msg: 'Initialising player',
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
                 * It's API allows us to queue up calls to YT that will fire when the underling player is ready
                 */
                player.current = YouTubePlayer(`youtube-video-${assetId}`, {
                    height: width,
                    width: height,
                    videoId: assetId,
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
                        msg: 'Playing video',
                        event,
                    });
                    /**
                     * When the player is ready start playing
                     * event.target is the actual underlying YT player
                     */
                    event.target.playVideo();
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
        }
    }, [consentState, eventEmitters, loadPlayer]);

    // we need to render a div to give the YouTube iframe somewhere to hook into the dom
    return (
        <div
            title={title}
            id={`youtube-video-${assetId}`}
            tabIndex={overrideImage || posterImage ? -1 : 0}
            data-atom-id={`youtube-video-${assetId}`}
            data-atom-type="youtube"
        ></div>
    );
};
