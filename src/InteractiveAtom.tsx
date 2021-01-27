import React from 'react';
import { css } from '@emotion/core';

import { unifyPageContent } from './lib/unifyPageContent';
import { InteractiveAtomType } from './types';

const containerStyles = css`
    margin: 0;
`;

const fullWidthStyles = css`
    width: 100%;
`;

export const InteractiveAtom = ({
    id,
    html,
    js,
    atomCss,
}: InteractiveAtomType): JSX.Element => (
    <div css={containerStyles} data-atom-id={id} data-atom-type="interactive">
        <iframe
            css={fullWidthStyles}
            srcDoc={unifyPageContent({ js, css: atomCss, html })}
            frameBorder="0"
        />
    </div>
);
