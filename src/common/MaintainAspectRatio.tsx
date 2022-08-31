import React from 'react';
import { css } from '@emotion/react';

export const MaintainAspectRatio = ({
    height,
    width,
    children,
}: {
    height: number;
    width: number;
    children: React.ReactNode;
}): JSX.Element => (
    <div
        css={css`
            /* position relative to contain the absolutely positioned iframe plus any Overlay image */
            position: relative;
            aspect-ratio: ${width / height};

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
