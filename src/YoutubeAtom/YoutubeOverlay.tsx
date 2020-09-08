import React from 'react';
import { css } from 'emotion';
import { Pillar } from '@guardian/types/Format';
import { space } from '@guardian/src-foundations';

import { YoutubeMeta } from './YoutubeMeta';

const overlayStyles = (image: string) => css`
    background-image: url(${image});
    background-size: cover;
    background-position: 49% 49%;
    background-repeat: no-repeat;
    z-index: 0;
    text-align: center;
    height: 100%;
    width: 100%;
    position: absolute;
    max-height: 100vh;
    cursor: pointer;
`;

const BottomLeft = ({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) => (
    <div
        className={css`
            position: absolute;
            bottom: ${space[3]};
            left: ${space[3]};
        `}
    >
        {children}
    </div>
);

export const YoutubeOverlay = ({
    image,
    pillar,
    duration,
}: {
    image: string;
    pillar: Pillar;
    duration?: number;
}): JSX.Element => (
    <div className={overlayStyles(image)}>
        <BottomLeft>
            <YoutubeMeta mediaDuration={duration} pillar={pillar} />
        </BottomLeft>
    </div>
);
