import React, { useState, useEffect, useRef } from 'react';
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
}: InteractiveAtomType): JSX.Element => {
    const [height, setHeight] = useState(0);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const setIframeHight = (e: MessageEvent) => {
            // check that event comes from current iframe
            if (
                iframeRef.current &&
                iframeRef.current.contentWindow === e.source
            ) {
                const { value, type } = JSON.parse(e.data);
                // check message is regarding embed type
                if (type === 'set-height') {
                    setHeight(value || 0);
                }
            }
        };
        window.addEventListener('message', setIframeHight);
        return () => window.removeEventListener('message', setIframeHight);
    }, []);
    const markup = unifyPageContent({ js: js, css: css, html: html });

    return (
        <figure
            className={figureStyles}
            data-atom-id={id}
            data-atom-type="interactive"
        >
            <iframe
                ref={iframeRef}
                className={cx(fullWidthStyles, iframeStyles)}
                srcDoc={markup}
                frameBorder="0"
                height={height}
            />
        </figure>
    );
};
