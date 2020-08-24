import React from 'react';
import { css } from 'emotion';
import { space } from '@guardian/src-foundations';
import { text } from '@guardian/src-foundations/palette';

import { ChartAtomType } from './types';

export const ChartAtom = ({ id, url }: ChartAtomType): JSX.Element => (
    <div
        data-atom-id={id}
        data-atom-type="chart"
        className={css`
            padding-bottom: ${space[1]}px;
            padding-left: ${space[2]}px;
            padding-right: ${space[2]}px;
            color: ${text.primary};
        `}
    >
        <iframe src={url} frameBorder="0" width="100%" height="540px"></iframe>
    </div>
);
