import React from 'react';
import { css } from '@emotion/react';

import { unifyPageContent } from './lib/unifyPageContent';

const containerStyles = css`
    margin: 0;
`;

const fullWidthStyles = css`
    width: 100%;
`;

type InteractiveAtomType = {
    id: string;
    elementUrl?: string;
    elementHtml?: string;
    elementJs: string;
    elementCss?: string;
    shouldIframe?: boolean;
};

export const InteractiveAtom = ({
    id,
    elementHtml,
    elementJs,
    elementCss,
    shouldIframe = true,
}: InteractiveAtomType): JSX.Element => {
    // Typically, interactive atoms are iframed, but for interactive pages they
    // are inlined.
    if (shouldIframe) {
        return (
            <div
                css={containerStyles}
                data-atom-id={id}
                data-atom-type="interactive"
            >
                <iframe
                    css={fullWidthStyles}
                    srcDoc={unifyPageContent({
                        elementJs,
                        elementCss,
                        elementHtml,
                    })}
                    frameBorder="0"
                />
            </div>
        );
    }

    return (
        <div
            css={containerStyles}
            data-atom-id={id}
            data-atom-type="interactive"
        >
            {elementCss && (
                <style dangerouslySetInnerHTML={{ __html: elementCss }} />
            )}
            {elementHtml && (
                <div dangerouslySetInnerHTML={{ __html: elementHtml }} />
            )}
            <script dangerouslySetInnerHTML={{ __html: elementJs }} />
        </div>
    );
};
