import React from 'react';
import { css } from '@emotion/react';

import { Placeholder } from './common/Placeholder';

type Props = {
    height: number;
    width: number;
};

export const YoutubeAtomPlaceholder = ({
    height,
    width,
}: Props): JSX.Element => {
    return (
        <>
            <div
                css={css`
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                `}
            >
                <Placeholder
                    height={height}
                    width={width}
                    shouldShimmer={true}
                />
            </div>
        </>
    );
};
