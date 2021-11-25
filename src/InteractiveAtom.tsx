import React from 'react';
import { css } from '@emotion/react';

import { unifyPageContent } from './lib/unifyPageContent';
import { ArticleDisplay, ArticleFormat } from '@guardian/libs';

const containerStyles = css`
    margin: 0;
`;

const fullWidthStyles = css`
    width: 100%;
`;
const fullHeightStyles = css`
    height: 100%;
`;

type InteractiveAtomType = {
    id: string;
    elementUrl?: string;
    elementHtml?: string;
    elementJs?: string;
    elementCss?: string;
    isMainMedia?: boolean;
    format: ArticleFormat;
};

export const InteractiveAtom = ({
    id,
    elementHtml,
    elementJs,
    elementCss,
    isMainMedia,
    format,
}: InteractiveAtomType): JSX.Element => (
    <div
        css={[containerStyles, isMainMedia && fullHeightStyles]}
        data-atom-id={id}
        data-atom-type="interactive"
    >
        <iframe
            css={[
                fullWidthStyles,
                isMainMedia &&
                    format.display === ArticleDisplay.Immersive &&
                    fullHeightStyles,
            ]}
            srcDoc={unifyPageContent({ elementJs, elementCss, elementHtml })}
            frameBorder="0"
        />
    </div>
);
