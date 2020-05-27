import React from 'react';
import { css } from 'emotion';

import { headline, textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { background, text } from '@guardian/src-foundations/palette';

import { ExplainerAtomType } from './types';

const Container = ({
    id,
    children,
}: {
    id: string;
    children: React.ReactNode;
}) => {
    return (
        <figure
            data-atom-id={id}
            data-atom-type="explainer"
            className={css`
                padding-bottom: ${space[1]}px;
                padding-left: ${space[2]}px;
                padding-right: ${space[2]}px;
                border-top: 1px solid ${text.primary};
                background-color: ${background.secondary};
                color: ${text.primary};
            `}
        >
            {children}
        </figure>
    );
};

const Title = ({ title }: { title: string }) => (
    <h3
        className={css`
            ${headline.xxsmall({ fontWeight: 'bold' })}
            margin-top: ${space[2]}px;
        `}
    >
        {title}
    </h3>
);

const Body = ({ html }: { html: string }) => (
    <div
        className={css`
            ${textSans.small({ fontWeight: 'light', lineHeight: 'tight' })}
        `}
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);

export const ExplainerAtom = ({
    id,
    title,
    html,
}: ExplainerAtomType): JSX.Element => (
    <Container id={id}>
        <Title title={title} />
        <Body html={html} />
    </Container>
);
