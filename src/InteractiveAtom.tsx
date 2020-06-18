import React from 'react';
import { css } from 'emotion';

import { space } from '@guardian/src-foundations';
import { text } from '@guardian/src-foundations/palette';

import { InteractiveAtomType } from './types';

const fullWidthStyles = css`
    width: 100%;
`;

export const InteractiveAtom = ({
    id,
    url,
}: InteractiveAtomType): JSX.Element => (
    <div
        data-atom-id={id}
        data-atom-type="interactive"
        className={css`
            padding-bottom: ${space[1]}px;
            padding-left: ${space[2]}px;
            padding-right: ${space[2]}px;
            color: ${text.primary};
        `}
    >
        <iframe className={fullWidthStyles} src={url} frameBorder="0"></iframe>
    </div>
);
