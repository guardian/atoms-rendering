import React, { useState } from 'react';
import { MaintainAspectRatio } from './common/MaintainAspectRatio';
import { YoutubeAtomPlayer } from './YoutubeAtomPlayer';
import { YoutubeAtomOverlay } from './YoutubeAtomOverlay';
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
    const [loadPlayer, setLoadPlayer] = useState<boolean>(false);

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
            />
            <YoutubeAtomOverlay
                overrideImage={overrideImage}
                posterImage={posterImage}
                height={height}
                width={width}
                alt={alt}
                role={role}
                duration={duration}
                pillar={pillar}
                loadPlayer={loadPlayer}
                setLoadPlayer={setLoadPlayer}
            />
        </MaintainAspectRatio>
    );
};
