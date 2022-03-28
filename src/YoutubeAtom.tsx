import React, { useCallback, useState } from 'react';
import { MaintainAspectRatio } from './common/MaintainAspectRatio';
import { YoutubeAtomPlayer } from './YoutubeAtomPlayer';
import { YoutubeAtomOverlay } from './YoutubeAtomOverlay';
import { YoutubeAtomPlaceholder } from './YoutubeAtomPlaceholder';
import { YoutubeAtomSticky } from './YoutubeAtomSticky';
import type {
    AdTargeting,
    ImageSource,
    RoleType,
    VideoEventKey,
} from './types';
import type { ArticleTheme } from '@guardian/libs';
import type { ConsentState } from '@guardian/consent-management-platform/dist/types';

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
    shouldStick?: boolean;
    isMainMedia?: boolean;
};

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
    origin,
    eventEmitters,
    pillar,
    shouldStick,
    isMainMedia,
}: Props): JSX.Element => {
    const [overlayClicked, setOverlayClicked] = useState<boolean>(false);
    const [playerReady, setPlayerReady] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [stopVideo, setStopVideo] = useState<boolean>(false);

    /**
     * Update the isPlaying state based on video events
     *
     * @param {VideoEventKey} videoEvent the video event which triggers the callback
     */
    const playerState = (videoEvent: VideoEventKey) => {
        switch (videoEvent) {
            case 'play':
                setStopVideo(false);
                setIsPlaying(true);
                break;
            case 'end':
            case 'cued':
                setIsPlaying(false);
                break;
        }
    };

    /**
     * Combine the videoState and tracking event emitters
     */
    const compositeEventEmitters = [playerState, ...eventEmitters];

    const hasOverlay = !!(overrideImage || posterImage);

    /**
     * Show an overlay if:
     *
     * - It exists
     *
     * AND
     *
     * - It hasn't been clicked
     */
    const showOverlay = hasOverlay && !overlayClicked;

    /**
     * Show a placeholder if:
     *
     * - We don't have an overlay OR the user has clicked the overlay
     *
     * AND
     *
     * - The player is not ready
     */
    const showPlaceholder = (!hasOverlay || overlayClicked) && !playerReady;

    let loadPlayer;
    if (!hasOverlay) {
        // load the player if there is no overlay
        loadPlayer = true;
    } else if (overlayClicked) {
        // load the player if the overlay has been clicked
        loadPlayer = true;
    } else {
        loadPlayer = false;
    }

    /**
     * Create a stable callback as it will be a useEffect dependency in YoutubeAtomPlayer
     */
    const playerReadyCallback = useCallback(() => setPlayerReady(true), []);

    return (
        <YoutubeAtomSticky
            assetId={assetId}
            shouldStick={shouldStick}
            isPlaying={isPlaying}
            eventEmitters={eventEmitters}
            onStopVideo={() => setStopVideo(true)}
            isMainMedia={isMainMedia}
        >
            <MaintainAspectRatio height={height} width={width}>
                {loadPlayer && consentState && (
                    <YoutubeAtomPlayer
                        videoId={assetId}
                        overrideImage={overrideImage}
                        posterImage={posterImage}
                        adTargeting={adTargeting}
                        consentState={consentState}
                        height={height}
                        width={width}
                        title={title}
                        origin={origin}
                        eventEmitters={compositeEventEmitters}
                        /**
                         * If there is an overlay we want to autoplay
                         * If there is not an overlay the user will use the YouTube player UI to play
                         */
                        autoPlay={hasOverlay}
                        onReady={playerReadyCallback}
                        stopVideo={stopVideo}
                    />
                )}
                {showOverlay && (
                    <YoutubeAtomOverlay
                        videoId={assetId}
                        overrideImage={overrideImage}
                        posterImage={posterImage}
                        height={height}
                        width={width}
                        alt={alt}
                        role={role}
                        duration={duration}
                        pillar={pillar}
                        onClick={() => setOverlayClicked(true)}
                    />
                )}
                {showPlaceholder && (
                    <YoutubeAtomPlaceholder videoId={assetId} />
                )}
            </MaintainAspectRatio>
        </YoutubeAtomSticky>
    );
};
