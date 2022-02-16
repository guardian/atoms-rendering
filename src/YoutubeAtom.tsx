import React, { useState } from 'react';
import { MaintainAspectRatio } from './common/MaintainAspectRatio';
import { YoutubeAtomPlayer } from './YoutubeAtomPlayer';
import { YoutubeAtomOverlay } from './YoutubeAtomOverlay';
import { YoutubeAtomPlaceholder } from './YoutubeAtomPlaceholder';
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
}: Props): JSX.Element => {
    const [overlayClicked, setOverlayClicked] = useState<boolean>(false);
    const [playerReady, setPlayerReady] = useState<boolean>(false);

    const hasOverlay = overrideImage || posterImage;

    /**
     * Show the overlay if:
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
     * - We haven't triggered the player to load yet
     *
     * AND
     *
     * - There's no overlay to replace it
     *
     * OR
     *
     * - The user clicked the overlay but we're waiting on the player to be ready
     *
     */
    // const showPlaceholder = !hasOverlay || (overlayClicked && !playerReady);
    const showPlaceholder = !hasOverlay && !playerReady;

    /**
     * Show a placeholder if:
     *
     * - We haven't triggered the player to load yet
     *
     * and
     *
     * - There's no overlay to replace it with or the reader clicked to play but we're
     * still waiting on the player to be ready
     *
     */

    let loadPlayer;
    if (!hasOverlay) {
        // start the player if there is no overlay
        loadPlayer = true;
    } else if (overlayClicked) {
        // start the player if the overlay has been clicked
        loadPlayer = true;
    } else {
        loadPlayer = false;
    }

    return (
        <MaintainAspectRatio height={height} width={width}>
            <YoutubeAtomPlayer
                assetId={assetId}
                overrideImage={overrideImage}
                posterImage={posterImage}
                adTargeting={adTargeting}
                consentState={consentState}
                height={height}
                width={width}
                title={title}
                origin={origin}
                eventEmitters={eventEmitters}
                loadPlayer={loadPlayer}
                setPlayerReady={setPlayerReady}
            />
            {showOverlay && (
                <YoutubeAtomOverlay
                    overrideImage={overrideImage}
                    posterImage={posterImage}
                    height={height}
                    width={width}
                    alt={alt}
                    role={role}
                    duration={duration}
                    pillar={pillar}
                    overlayClicked={overlayClicked}
                    setOverlayClicked={setOverlayClicked}
                />
            )}
            {showPlaceholder && <YoutubeAtomPlaceholder />}
        </MaintainAspectRatio>
    );
};
