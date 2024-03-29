import type { Participations } from '@guardian/ab-core';
import type { ConsentState } from '@guardian/consent-management-platform/dist/types';
import type { ArticleTheme } from '@guardian/libs';
import { useCallback, useState } from 'react';
import { MaintainAspectRatio } from './common/MaintainAspectRatio';
import type {
    AdTargeting,
    ImageSource,
    RoleType,
    VideoEventKey,
} from './types';
import { YoutubeAtomOverlay } from './YoutubeAtomOverlay';
import { YoutubeAtomPlaceholder } from './YoutubeAtomPlaceholder';
import { YoutubeAtomPlayer } from './YoutubeAtomPlayer';
import { YoutubeAtomSticky } from './YoutubeAtomSticky';

type Props = {
    elementId: string;
    videoId: string;
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
    eventEmitters: Array<(event: VideoEventKey) => void>;
    pillar: ArticleTheme;
    shouldStick?: boolean;
    isMainMedia?: boolean;
    imaEnabled: boolean;
    abTestParticipations: Participations;
};

export const YoutubeAtom = ({
    elementId,
    videoId,
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
    imaEnabled,
    abTestParticipations,
}: Props): JSX.Element => {
    const [overlayClicked, setOverlayClicked] = useState<boolean>(false);
    const [playerReady, setPlayerReady] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isClosed, setIsClosed] = useState<boolean>(false);
    const [pauseVideo, setPauseVideo] = useState<boolean>(false);

    const uniqueId = `${videoId}-${elementId}`;
    const enableIma =
        imaEnabled &&
        !!adTargeting &&
        !adTargeting.disableAds &&
        !!consentState &&
        consentState.canTarget;

    /**
     * Update the isActive state based on video events
     *
     * @param {VideoEventKey} videoEvent the video event which triggers the callback
     */
    const playerState = (videoEvent: VideoEventKey) => {
        switch (videoEvent) {
            case 'play':
            case 'resume':
                setPauseVideo(false);
                setIsClosed(false);
                setIsActive(true);
                break;
            case 'end':
            case 'cued':
                setIsActive(false);
                break;
        }
    };

    /**
     * Combine the videoState and tracking event emitters
     */
    const compositeEventEmitters = [playerState, ...eventEmitters];

    const hasOverlay = !!(overrideImage ?? posterImage);

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
    const showPlaceholder = (!hasOverlay ?? overlayClicked) && !playerReady;

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
            uniqueId={uniqueId}
            videoId={videoId}
            shouldStick={shouldStick}
            isActive={isActive}
            eventEmitters={eventEmitters}
            setPauseVideo={() => setPauseVideo(true)}
            isMainMedia={isMainMedia}
            isClosed={isClosed}
            setIsClosed={setIsClosed}
        >
            <MaintainAspectRatio height={height} width={width}>
                {loadPlayer && consentState && (
                    <YoutubeAtomPlayer
                        videoId={videoId}
                        uniqueId={uniqueId}
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
                        enableIma={enableIma}
                        pauseVideo={pauseVideo}
                        deactivateVideo={() => {
                            setIsActive(false);
                        }}
                        abTestParticipations={abTestParticipations}
                    />
                )}
                {showOverlay && (
                    <YoutubeAtomOverlay
                        uniqueId={uniqueId}
                        overrideImage={overrideImage}
                        posterImage={posterImage}
                        height={height}
                        width={width}
                        alt={alt}
                        role={role}
                        duration={duration}
                        pillar={pillar}
                        title={title}
                        onClick={() => setOverlayClicked(true)}
                    />
                )}
                {showPlaceholder && (
                    <YoutubeAtomPlaceholder uniqueId={uniqueId} />
                )}
            </MaintainAspectRatio>
        </YoutubeAtomSticky>
    );
};
