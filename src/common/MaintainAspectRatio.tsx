import React from 'react';
import { css } from '@emotion/core';

export const MaintainAspectRatio = ({
    height,
    width,
    children,
}: {
    height: number;
    width: number;
    children: React.ReactNode;
}): JSX.Element => (
    /* https://css-tricks.com/aspect-ratio-boxes/ */
    <div
        css={css`
            /* position relative to contain the absolutely positioned iframe plus any Overlay image */
            position: relative;
            padding-bottom: ${(height / width) * 100}%;

            iframe {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
        `}
    >
        {children}
    </div>
);
