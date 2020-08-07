import React, { useState } from 'react';
import { css } from 'emotion';
import { textSans, headline, body } from '@guardian/src-foundations/typography';
import { news, neutral } from '@guardian/src-foundations/palette';
import { SvgMinus, SvgPlus } from '@guardian/src-icons';

/// SUMMARY ELEMENT

const atomTitleStylinng = css`
    color: ${news[400]};
    display: block;
    ${body.medium({
        lineHeight: 'tight',
        fontWeight: 'bold',
    })};
`;

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
    :hover {
        background: ${news[400]};
    }
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

export const Summary = ({
    sectionTitle,
    title,
    expandCallback,
}: {
    sectionTitle: string;
    title: string;
    expandCallback: () => void;
}): JSX.Element => {
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
            <span className={atomTitleStylinng}>{sectionTitle}</span>
            <h4 className={titleStyling}>{title}</h4>
            <span className={showHideStyling}>
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
