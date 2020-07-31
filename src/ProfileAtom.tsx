import React from 'react';

import { ProfileAtomType } from './types';

const Body = ({ html }: { html: string }) => (
    <div
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);

export const ProfileAtom = ({
    id,
    label,
    title,
    img,
    html,
    credit,
}: ProfileAtomType): JSX.Element => (
    <figure data-atom-id={id} data-atom-type="profile">
        <details data-snippet-id={id} data-snippet-type="profile">
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
