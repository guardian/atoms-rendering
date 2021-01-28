import React from 'react';
import { css } from '@emotion/core';
import { space } from '@guardian/src-foundations';

import { ChartAtomType } from './types';

export const ChartAtom = ({ id, html }: ChartAtomType): JSX.Element => {
    return (
        <div
            data-atom-id={id}
            data-testid="chart"
            data-atom-type="chart"
            data-snippet-type="chart"
            css={css`
                padding-bottom: ${space[1]}px;
            `}
        >
            <iframe
                className="atom__iframe"
                name={id}
                srcDoc={html}
                width="100%"
                frameBorder="0"
            ></iframe>
        </div>
    );
};
