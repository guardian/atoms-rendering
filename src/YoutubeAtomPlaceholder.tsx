import React from 'react';
import { css } from '@emotion/react';

export const YoutubeAtomPlaceholder = (): JSX.Element => {
    return (
        <div
            data-name="youtube-placeholder"
            data-testid="youtube-placeholder"
            css={css`
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                flex-grow: 1;
                background-color: black;
            `}
        ></div>
    );
};
