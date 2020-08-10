import React, { useState } from 'react';
import { css } from 'emotion';
import { textSans, headline, body } from '@guardian/src-foundations/typography';
import {
    news,
    neutral,
    opinion,
    culture,
    sport,
    lifestyle,
    labs,
} from '@guardian/src-foundations/palette/';
import { SvgMinus, SvgPlus } from '@guardian/src-icons';

/// SUMMARY ELEMENT
let linkColourStyleHover = '';
let titleColour = '';

const titleStyling = css`
    ${headline.xxxsmall({
        fontWeight: 'medium',
    })};
    margin: 0;
    line-height: 22px;
`;

const showHideStyling = css`
    background: ${neutral[7]};
    color: ${neutral[100]};
    height: 2rem;
    position: absolute;
    bottom: 0;
    transform: translate(0, 50%);
    padding: 0 15px 0 7px;
    border-radius: 100em;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    border: 0;
    margin: 0;
`;

const plusStyling = css`
    margin-right: 12px;
    margin-bottom: 6px;
    width: 33px;
    fill: white;
    height: 28px;
`;

const minusStyling = css`
    margin-right: 14px;
    margin-bottom: 6px;
    width: 30px;
    fill: white;
    height: 25px;
    padding-left: 4px;
`;

const iconSpacing = css`
    display: inline-flex;
    align-items: center;
    ${textSans.small()};
`;

function SetHighlightColour(pillar: string) {
    switch (pillar) {
        case 'opinion':
            linkColourStyleHover = opinion[400];
            titleColour = opinion[400];
            break;
        case 'sport':
            linkColourStyleHover = sport[400];
            titleColour = sport[400];
            break;
        case 'culture':
            linkColourStyleHover = culture[400];
            titleColour = culture[400];
            break;
        case 'lifestyle':
            linkColourStyleHover = lifestyle[400];
            titleColour = lifestyle[400];
            break;
        case 'labs':
            linkColourStyleHover = labs[400];
            titleColour = labs[400];
            break;
        case 'news':
            linkColourStyleHover = news[400];
            titleColour = news[400];
            break;
    }
}

export const Summary = ({
    sectionTitle,
    title,
    pillar,
    expandCallback,
}: {
    pillar: string;
    sectionTitle: string;
    title: string;
    expandCallback: () => void;
}): JSX.Element => {
    SetHighlightColour(pillar);
    const atomTitleStyling = css`
        display: block;
        ${body.medium({
            lineHeight: 'tight',
            fontWeight: 'bold',
        })};
        color: ${titleColour};
    `;
    const [hasBeenExpanded, setHasBeenExpanded] = useState(false);
    const [expandEventSent, setExpandEventFired] = useState(false);
    return (
        <summary
            onClick={() => {
                if (!expandEventSent) {
                    expandCallback();
                    setExpandEventFired(true);
                }
                setHasBeenExpanded(!hasBeenExpanded);
            }}
        >
            <span className={atomTitleStyling}>{sectionTitle}</span>
            <h4 className={titleStyling}>{title}</h4>
            <span
                className={
                    showHideStyling +
                    ' ' +
                    css`
                        :hover {
                            background: ${linkColourStyleHover};
                        }
                    `
                }
            >
                {!hasBeenExpanded ? (
                    <span className={iconSpacing}>
                        <span className={plusStyling}>
                            <SvgPlus />
                        </span>
                        Show
                    </span>
                ) : (
                    <span className={iconSpacing}>
                        <span className={minusStyling}>
                            <SvgMinus />
                        </span>
                        Hide
                    </span>
                )}
            </span>
        </summary>
    );
};
