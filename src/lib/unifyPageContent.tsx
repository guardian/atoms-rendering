import React from 'react';
import { renderToString } from 'react-dom/server';

export const unifyPageContent = ({
    css,
    js,
    html,
}: {
    css: string;
    js: string;
    html: string;
}) =>
    renderToString(
        <html>
            <head>
                <style dangerouslySetInnerHTML={{ __html: css }} />
            </head>
            <body>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </body>
            <script dangerouslySetInnerHTML={{ __html: js }} />
            <script src="https://interactive.guim.co.uk/libs/iframe-messenger/iframeMessenger.js"></script>
            <script>iframeMessenger.enableAutoResize();</script>
        </html>,
    );
