import React from 'react';
import { css } from '@emotion/react';

import { Placeholder } from './common/Placeholder';

export const YoutubeAtomPlaceholder = (): JSX.Element => {
    return (
        <>
            <div
                css={css`
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: flex;
                `}
            >
                <Placeholder height="100%" shouldShimmer={false} />
            </div>
        </>
    );
};
