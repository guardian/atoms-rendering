import React from 'react';
import { css } from 'emotion';
import { neutral } from '@guardian/src-foundations/palette';
import { Summary } from './Summary';

const containerStyling = css`
    display: block;
    position: relative;
    margin-bottom: 0.75rem;
    margin-top: 1rem;
`;

const detailStyling = css`
    margin: 16px 0 36px;
    background: ${neutral[93]};
    padding: 0 5px 6px;
    border-image: repeating-linear-gradient(
            to bottom,
            ${neutral[86]},
            ${neutral[86]} 1px,
            transparent 1px,
            transparent 4px
        )
        13;
    border-top: 13px solid black;
    position: relative;
    summary {
        list-style: none;
        margin: 0 0 16px;
    }

    /* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#Customizing_the_disclosure_widget */
    summary::-webkit-details-marker {
        display: none;
    }

    summary:focus {
        outline: none;
    }
`;

export const Container = ({
    id,
    title,
    children,
    pillar,
    expandForStorybook,
    atomType,
    atomTypeTitle,
    expandCallback,
}: {
    id: string;
    title: string;
    pillar: string;
    expandForStorybook?: boolean;
    atomType: string;
    atomTypeTitle: string;
    children: React.ReactNode;
    expandCallback: () => void;
}): JSX.Element => (
    <div
        className={containerStyling}
        data-atom-id={id}
        data-atom-type={atomType}
    >
        <details
            className={detailStyling}
            data-atom-id={id}
            data-snippet-type={atomType}
            open={expandForStorybook}
        >
            <Summary
                sectionTitle={atomTypeTitle}
                pillar={pillar}
                title={title}
                expandCallback={expandCallback}
            />
            {children}
        </details>
    </div>
);