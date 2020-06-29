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
        <>
            {`<!DOCTYPE html>`}
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width,minimum-scale=1,initial-scale=1"
                    />
                    <style dangerouslySetInnerHTML={{ __html: css }} />
                </head>
                <body>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </body>
                {/* JS need to load on body render */}
                <script dangerouslySetInnerHTML={{ __html: js }} />
                <script src="https://interactive.guim.co.uk/libs/iframe-messenger/iframeMessenger.js"></script>
                <script>iframeMessenger.enableAutoResize();</script>
            </html>
        </>,
    );
