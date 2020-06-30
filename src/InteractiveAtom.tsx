import React from 'react';
import { css, cx } from 'emotion';

import { space } from '@guardian/src-foundations';
import { text } from '@guardian/src-foundations/palette';

import { unifyPageContent } from './lib/unifyPageContent';
import { InteractiveAtomType } from './types';

const figureStyles = css`
    margin: 0;
`;

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
    html,
    js,
    css,
}: InteractiveAtomType): JSX.Element => (
    <figure
        className={figureStyles}
        data-atom-id={id}
        data-atom-type="interactive"
    >
        <iframe
            className={cx(fullWidthStyles, iframeStyles)}
            srcDoc={unifyPageContent({ js, css, html })}
            frameBorder="0"
            // height={height}
        />
    </figure>
);
