import React from 'react';
import { css } from 'emotion';

import { textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';

import { pillarPalette } from '../lib/pillarPalette';
import { Pillar } from '@guardian/types/Format';
import { SvgVideo } from '@guardian/src-icons';

type Props = {
    pillar: Pillar;
    mediaDuration?: number;
};

const iconWrapperStyles = (pillar: Pillar) => css`
    width: 24px;
    height: 23px;
    /* Below we force the colour to be bright if the pillar is news (because it looks better) */
    background-color: ${pillar === Pillar.News
        ? pillarPalette[pillar][500]
        : pillarPalette[pillar][400]};
    border-radius: 50%;
    display: inline-block;

    > svg {
        width: 14px;
        height: auto;
        margin-left: auto;
        margin-right: auto;
        margin-top: 6px;
        display: block;
        transform: translateY(0.0625rem);
    }
`;

const durationStyles = (pillar: Pillar) => css`
    /* Below we force the colour to be bright if the pillar is news (because it looks better) */
    color: ${pillar === Pillar.News
        ? pillarPalette[pillar][500]
        : pillarPalette[pillar][400]};
    ${textSans.xsmall({ fontWeight: `bold` })}
`;

const wrapperStyles = css`
    display: flex;
    align-items: center;

    padding: 0 5px 5px 5px;
`;

const secondsToDuration = (secs?: number): string => {
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
};

const Icon = ({ pillar }: { pillar: Pillar }) => (
    <span className={iconWrapperStyles(pillar)}>
        <SvgVideo />
    </span>
);

const svgStyle = css`
    left: 35%;
    top: 1%;
    position: absolute;
    height: 100%;
    width: 1.5rem;
`;

const buttonStyling = css`
    background: #ff4e36;
    border-radius: 100%;
    position: absolute;
    bottom: ${space[4]}px;
    left: ${space[4]}px;
    height: 60px;
    width: 60px;
`;

const buttonHover = css`
    :hover {
        transform: scale(1.2);
        -webkit-transform: scale() (1.2);
    }
`;

const Duration = ({
    mediaDuration,
    pillar,
}: {
    mediaDuration: number;
    pillar: Pillar;
}) => (
    <p className={durationStyles(pillar)}>{secondsToDuration(mediaDuration)}</p>
);

export const YoutubeMeta = ({ mediaDuration, pillar }: Props): JSX.Element => (
    <div className={wrapperStyles}>
        &nbsp;
        {mediaDuration && (
            <Duration mediaDuration={mediaDuration} pillar={pillar} />
        )}
    </div>
);
