import React, { useState, useEffect } from 'react';
import { css, cx } from 'emotion';

import { space } from '@guardian/src-foundations';
import { text } from '@guardian/src-foundations/palette';

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
    url,
}: InteractiveAtomType): JSX.Element => {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const setIframeHight = (e: MessageEvent) => {
            // security check that this comes from Guardian context
            if (e.origin.startsWith('https://api.nextgen.guardianapps.co.uk')) {
                // check message is regarding embed type
                if (e.data.type === 'embed-size') {
                    setHeight(e.data.height || 0);
                }
            }
        };

        // TODO: make sure message originates from locally rendered iframe
        window.addEventListener('message', setIframeHight);
        return () => window.removeEventListener('message', setIframeHight);
    }, []);

    return (
        <figure
            className={figureStyles}
            data-atom-id={id}
            data-atom-type="interactive"
        >
            <iframe
                className={cx(fullWidthStyles, iframeStyles)}
                src={url}
                frameBorder="0"
                height={height}
            />
        </figure>
    );
};
