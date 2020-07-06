import React from 'react';
import { renderToString } from 'react-dom/server';

export const unifyPageContent = ({
    css,
    js,
    html,
}: {
    css?: string;
    js: string;
    html?: string;
}) =>
    renderToString(
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,minimum-scale=1,initial-scale=1"
                />
                {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
            </head>
            <body>
                {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
            </body>
            {/* JS need to load on body render */}
            <script dangerouslySetInnerHTML={{ __html: js }} />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                            function resize() {
                                window.frameElement.height = document.body.offsetHeight;
                            }
                            window.addEventListener('resize', resize);
                            resize();
                        `,
                }}
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                            var fonts = [].slice.apply(window.parent.document.styleSheets)
                                .filter(function (sheet) { return sheet.ownerNode.className.indexOf("webfont") > - 1; })
                                .map(function (sheet) { return sheet.ownerNode.textContent; })
                                .join(' ');
                            var css = document.createElement('style');
                            css.textContent = fonts;
                            document.head.appendChild(css);
                        `,
                }}
            />
        </html>,
    );
