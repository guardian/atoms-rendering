import React from 'react';
import { css } from '@emotion/react';

import { headline, textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { neutral, text } from '@guardian/src-foundations/palette';

import { ExplainerAtomType } from './types';

const Container = ({
    id,
    children,
}: {
    id: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            data-atom-id={id}
            data-atom-type="explainer"
            css={css`
                padding-bottom: ${space[1]}px;
                padding-left: ${space[2]}px;
                padding-right: ${space[2]}px;
                border-top: 1px solid ${text.primary};
                color: ${text.primary};
                background: ${neutral[97]};

                p {
                    margin-top: ${space[3]}px;
                    margin-bottom: ${space[3]}px;
                }
                i {
                    font-style: italic;
                }
            `}
        >
            {children}
        </div>
    );
};

const Title = ({ title }: { title: string }) => (
    <h3
        css={css`
            ${headline.xxsmall({ fontWeight: 'bold' })}
            margin-top: ${space[2]}px;
        `}
    >
        {title}
    </h3>
);

const Body = ({ html }: { html: string }) => (
    <div
        css={css`
            ${textSans.small({
                fontWeight: 'light',
                lineHeight: 'tight',
            })}
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
