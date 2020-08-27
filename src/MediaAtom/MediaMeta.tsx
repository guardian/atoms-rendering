import React from 'react';
import { css } from 'emotion';

import { textSans } from '@guardian/src-foundations/typography';

import { pillarPalette } from './pillarPalette';
import { Pillar } from '@guardian/types/Format';

const Audio = (
    <svg width="16" height="13" viewBox="0 0 16 13">
        <path d="M3 4H1L0 5v3l1 1h2l4 4h1V0H7L3 4zm11.7 2.5c0 2-.7 3.8-1.8 5.2l.4.4c1.6-1.3 2.6-3.3 2.6-5.6s-1-4.3-2.6-5.6l-.4.4c1.2 1.5 1.8 3.3 1.8 5.2m-3.7 0c0 1.1-.3 2.2-.9 3.1l.5.5c.8-1 1.4-2.2 1.4-3.6s-.6-2.6-1.5-3.5l-.5.5c.6.8 1 1.9 1 3" />
    </svg>
);

const Photo = (
    <svg width="18" height="13" viewBox="0 0 18 13">
        <path d="M18 3.5v8L16.5 13h-15L0 11.5v-8L1.5 2H5l2-2h4l2 2h3.5L18 3.5zM9 11c1.9 0 3.5-1.6 3.5-3.5S10.9 4 9 4 5.5 5.6 5.5 7.5 7.1 11 9 11z" />
    </svg>
);

const Video = (
    <svg width="36" height="23" viewBox="0 0 36 23">
        <path d="M3.2 0L0 3.3v16.4L3.3 23H22V0H3.2m30.4 1L25 9v5l8.6 8H36V1h-2.4" />
    </svg>
);

type MediaType = 'Video' | 'Audio' | 'Gallery';

type Props = {
    mediaType: MediaType;
    pillar: Pillar;
    mediaDuration?: number;
};

const iconWrapperStyles = (mediaType: MediaType, pillar: Pillar) => css`
    width: 24px;
    height: 23px;
    /* Below we force the colour to be bright if the pillar is news (because it looks better) */
    background-color: ${pillar === Pillar.News
        ? pillarPalette[pillar].bright
        : pillarPalette[pillar].main};
    border-radius: 50%;
    display: inline-block;

    > svg {
        width: 14px;
        height: auto;
        margin-left: auto;
        margin-right: auto;
        margin-top: 6px;
        display: block;
        transform: ${mediaType === 'Video' ? `translateY(0.0625rem)` : ``};
    }
`;

const durationStyles = (pillar: Pillar) => css`
    /* Below we force the colour to be bright if the pillar is news (because it looks better) */
    color: ${pillar === Pillar.News
        ? pillarPalette[pillar].bright
        : pillarPalette[pillar].main};
    ${textSans.xsmall({ fontWeight: `bold` })}
`;

const wrapperStyles = css`
    display: flex;
    align-items: center;

    padding: 0 5px 5px 5px;
`;

export function secondsToDuration(secs?: number): string {
    if (typeof secs === `undefined` || secs === 0) {
        return ``;
    }
    const seconds = Number(secs);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);

    const duration = [];
    if (h > 0) {
        duration.push(h);
    }
    if (m > 0 || h === 0) {
        // supports 0:59
        duration.push(m);
    }
    if (s > 0) {
        duration.push(s);
    }
    return duration.join(':');
}

const Icon = ({ mediaType }: { mediaType: MediaType }) => {
    switch (mediaType) {
        case 'Gallery':
            return Photo;
        case 'Video':
            return Video;
        case 'Audio':
            return Audio;
    }
};

const MediaIcon = ({
    mediaType,
    pillar,
}: {
    mediaType: MediaType;
    pillar: Pillar;
}) => (
    <span className={iconWrapperStyles(mediaType, pillar)}>
        <Icon mediaType={mediaType} />
    </span>
);

const MediaDuration = ({
    mediaDuration,
    pillar,
}: {
    mediaDuration: number;
    pillar: Pillar;
}) => (
    <p className={durationStyles(pillar)}>{secondsToDuration(mediaDuration)}</p>
);

export const MediaMeta = ({
    mediaType,
    mediaDuration,
    pillar,
}: Props): JSX.Element => (
    <div className={wrapperStyles}>
        <MediaIcon mediaType={mediaType} pillar={pillar} />
        &nbsp;
        {mediaDuration && (
            <MediaDuration mediaDuration={mediaDuration} pillar={pillar} />
        )}
    </div>
);
