import React from 'react';
import { css, cx } from 'emotion';

import { space } from '@guardian/src-foundations';
import { text } from '@guardian/src-foundations/palette';

import { InteractiveAtomType } from './types';

const fullWidthStyles = css`
    width: 100%;
`;

const iframeStyles = css`
    padding-bottom: ${space[1]}px;
    padding-left: ${space[2]}px;
    padding-right: ${space[2]}px;
    color: ${text.primary};
`;

export const InteractiveAtom = ({
    id,
    url,
}: InteractiveAtomType): JSX.Element => (
    <figure data-atom-id={id} data-atom-type="interactive">
        <iframe
            className={cx(fullWidthStyles, iframeStyles)}
            src={url}
            frameBorder="0"
        />
    </figure>
);
