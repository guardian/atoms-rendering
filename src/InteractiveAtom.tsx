import React from 'react';
import { css } from 'emotion';

import { unifyPageContent } from './lib/unifyPageContent';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InteractiveAtomType } from './types';

const figureStyles = css`
    margin: 0;
`;

const fullWidthStyles = css`
    width: 100%;
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
            className={fullWidthStyles}
            srcDoc={unifyPageContent({ js, css, html })}
            frameBorder="0"
        />
    </figure>
);
