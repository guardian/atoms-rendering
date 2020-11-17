import React, { useEffect, useState, useCallback } from 'react';

import { MaintainAspectRatio } from './common/MaintainAspectRatio';
import { YoutubeOverlay } from './YoutubeOverlay';

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

type YoutubeStateChangeEvent = { data: -1 | 0 | 1 | 2 | 3 | 5 };

let progressTracker: NodeJS.Timeout | null;

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

    const [hasUserClickedPlay, setHasUserClickedPlay] = useState<boolean>(
        false,
    );
    const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
    const [player, setPlayer] = useState<YT.Player | null>(null);

    const onPlayerStateChange = (e: YoutubeStateChangeEvent) => {
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
                if (!hasUserClickedPlay) {
                    gaEventEmitter && gaEventEmitter('play');
                    ophanEventEmitter && ophanEventEmitter('play');
                }
                setHasUserClickedPlay(true);

                progressTracker = setInterval(() => {
                    if (!player) {
                        // player is not yet defined
                        // eslint-disable-next-line no-console
                        console.error(`Youtube player object not available`);
                        return;
                    }

                    if (!gaEventEmitter)
                        // eslint-disable-next-line no-console
                        console.error(`GA function is not available`);
                    if (!ophanEventEmitter)
                        // eslint-disable-next-line no-console
                        console.error(`Ophan function is not available`);

                    const currentTime = player.getCurrentTime();
                    const duration = player.getDuration();
                    const percentPlayed = Math.round(
                        (currentTime / duration) * 100,
                    );

                    switch (percentPlayed) {
                        case 25: {
                            gaEventEmitter && gaEventEmitter('25');
                            ophanEventEmitter && ophanEventEmitter('25');
                            break;
                        }
                        case 50: {
                            gaEventEmitter && gaEventEmitter('50');
                            ophanEventEmitter && ophanEventEmitter('50');
                            break;
                        }
                        case 75: {
                            gaEventEmitter && gaEventEmitter('75');
                            ophanEventEmitter && ophanEventEmitter('75');
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
            // Issue with setting events on Youtube object
            // https://stackoverflow.com/a/17078152

            // ts-ignore is used because onStateChange has different listener to what is actually sent
            // @ts-ignore
            player.addEventListener('onStateChange', onPlayerStateChange);
        }
    }, [player]);

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
                <YoutubeOverlay
                    image={overlayImage}
                    duration={duration}
                    hideOverlay={hasUserClickedPlay}
                    onClickOverlay={onClickOverlay}
                    onKeyDownOverlay={onKeyDownOverlay}
                />
            )}
        </MaintainAspectRatio>
    );
};
