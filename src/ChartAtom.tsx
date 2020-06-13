import React from 'react';
import { css } from 'emotion';
import { space } from '@guardian/src-foundations';
import { neutral, text } from '@guardian/src-foundations/palette';

import { ChartAtomType } from './types';

export const ChartAtom = ({ id, url }: ChartAtomType): JSX.Element => (
    <div
        data-atom-id={id}
        data-atom-type="chart"
        className={css`
            padding-bottom: ${space[1]}px;
            padding-left: ${space[2]}px;
            padding-right: ${space[2]}px;
            border-top: 1px solid ${text.primary};
            color: ${text.primary};
            background: ${neutral[97]};
        `}
    >
        <iframe src={url} frameBorder="0" height="450px"></iframe>
    </div>
);
