import React from 'react';

import { GuideAtomType } from './types';

const Body = ({ html }: { html: string }) => (
    <div
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);

export const GuideAtom = ({
    id,
    label,
    title,
    img,
    html,
    credit,
}: GuideAtomType): JSX.Element => (
    <figure data-atom-id={id} data-atom-type="guide">
        <details data-snippet-id={id} data-snippet-type="guide">
            <summary>
                <span>{label}</span>
                <h4>{title}</h4>
            </summary>
            <div>
                <Body html={html} />
            </div>
            <footer></footer>
        </details>
    </figure>
);
