import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { textSans, headline, body } from '@guardian/src-foundations/typography';
import { news, neutral } from '@guardian/src-foundations/palette';
import { SvgMinus, SvgPlus } from '@guardian/src-icons';

/*
    Elements that are used on multiple atoms (such as the feedback buttons) 
    can be imported from here
*/

/// SUMMARY ELEMENT

const showHideStyling = css`
    background: ${neutral[7]};
    color: ${neutral[100]};
    height: 2rem;
    font-size: 13px;
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
    expandHandler,
}: {
    sectionTitle: string;
    title: string;
    expandHandler: () => void;
}): JSX.Element => {
    const [hasBeenExpanded, setHasBeenExpanded] = useState(false);
    const [expandEventSent, setExpandEventFired] = useState(false);
    return (
        <summary
            onClick={() => {
                if (!expandEventSent) {
                    expandHandler();
                    setExpandEventFired(true);
                }
                setHasBeenExpanded(!hasBeenExpanded);
            }}
        >
            <span
                className={css`
                    color: ${news[400]};
                    display: block;
                    ${body.medium({
                        lineHeight: 'tight',
                        fontWeight: 'bold',
                    })};
                `}
            >
                {sectionTitle}
            </span>
            <h4
                className={css`
                    ${headline.xxxsmall({
                        fontWeight: 'medium',
                    })};
                    margin: 0;
                    line-height: 22px;
                `}
            >
                {title}
            </h4>
            <span className={showHideStyling}>
                {!hasBeenExpanded && (
                    <span className={iconSpacing}>
                        <span className={plusStyling}>
                            <SvgPlus />
                        </span>
                        Show
                    </span>
                )}
                {hasBeenExpanded && (
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

///

/// LIKE/DISLIKE FEEDBACK FOOTER
const footerStyling = css`
    font-size: 13px;
    line-height: 16px;
    display: flex;
    justify-content: flex-end;
`;

const buttonStyling = css`
    display: inline-flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    background: black;
    color: white;
    border-style: hidden;
    border-radius: 100%;
    margin: 0 0 0 5px;
    padding: 0;
    width: 28px;
    height: 28px;
    :hover {
        background: ${news[400]};
        border-color: ${news[400]};
    }

    :focus {
        border: none;
    }
`;

// Currently no thumb icon in src-icons so a path is needed
const ThumbImage = () => {
    return (
        <svg
            className={css`
                width: 16px;
                height: 16px;
            `}
            viewBox="0 0 40 40"
        >
            <path
                fill="#FFF"
                d="M33.78 22.437l-4.228 13.98L27.93 37.5 5.062 34.14V15.503l7.8-1.517L24.354 2.5h1.624L28.9 5.426l-4.548 8.67h.107l10.477 1.31"
            ></path>
        </svg>
    );
};

export const Footer = ({
    likeHandler,
    dislikeHandler,
}: {
    likeHandler: () => void;
    dislikeHandler: () => void;
}): JSX.Element => {
    const [showFeedback, setShowFeedback] = useState(false);
    return (
        <footer className={footerStyling}>
            <div hidden={showFeedback}>
                <div
                    className={css`
                        display: flex;
                        align-items: center;
                        ${textSans.xsmall()};
                    `}
                >
                    <div>Was this helpful?</div>
                    <button
                        data-testid="like"
                        className={buttonStyling}
                        onClick={() => {
                            likeHandler();
                            setShowFeedback(true);
                        }}
                    >
                        <ThumbImage />
                    </button>
                    <button
                        className={cx(
                            buttonStyling,
                            css`
                                transform: rotate(180deg);
                                -webkit-transform: rotate(180deg);
                                -moz-transform: rotate(180deg);
                                -o-transform: rotate(180deg);
                            `,
                        )}
                        data-testid="dislike"
                        onClick={() => {
                            dislikeHandler();
                            setShowFeedback(true);
                        }}
                    >
                        <ThumbImage />
                    </button>
                </div>
            </div>
            <div
                className={css`
                    ${textSans.xsmall()};
                    height: 28px;
                `}
                data-testid="feedback"
                hidden={!showFeedback}
            >
                Thank you for your feedback.
            </div>
        </footer>
    );
};

///
