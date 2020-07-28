import React, { useState } from 'react';
import { QandaAtomType } from './types';
import { css, cx } from 'emotion';
import { neutral, news } from '@guardian/src-foundations/palette';
import { headline, textSans, body } from '@guardian/src-foundations/typography';
import { SvgPlus, SvgMinus } from '@guardian/src-icons';

// CSS
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
    border-left: 0;
    border-right: 0;
    border-bottom: 0;
    position: relative;
    summary {
        list-style: none;
        margin: 0 0 16px;
    }
    summary::-webkit-details-marker {
        display: none;
    }

    summary:focus {
        outline: none;
    }
`;

const bodyStyling = css`
    ${body.medium()}
    p {
        margin-bottom: 0.5rem;
    }
    @media (min-width: 46.25em) {
        ul {
            list-style: none;
            margin-bottom: 1rem;
        }
    }

    ul {
        list-style: none;
        margin: 0 0 0.75rem;
        padding: 0;
    }

    li {
        margin-bottom: 0.375rem;
        padding-left: 1.25rem;
    }

    li:before {
        display: inline-block;
        content: '';
        border-radius: 0.375rem;
        height: 0.75rem;
        width: 0.75rem;
        margin-right: 0.5rem;
        background-color: ${neutral[86]};
        margin-left: -1.25rem;
    }

    a {
        color: #ab0613;
        text-decoration: none !important;
        border-bottom: 0.0625rem solid #bdbdbd;
        transition: border-color 0.15s ease-out;
    }

    a:hover {
        border-bottom: solid 0.0625rem ${news[400]};
    }

    b {
        font-weight: bold;
    }
`;

const summaryStyling = css``;

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
        background: #e00000;
    }
`;

const buttonRound = css`
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

const imageStyling = css`
    float: left;
    margin-right: 16px;
    margin-bottom: 6px;
    width: 100px !important;
    height: 100px !important;
    object-fit: cover;
    border-radius: 50%;
    display: block;
    border: 0px;
`;

const plusStyling = css`
    margin-right: 12px;
    margin-bottom: 6px;
    width: 33px !important;
    fill: white;
    height: 28px !important;
`;

const minusStyling = css`
    margin-right: 14px;
    margin-bottom: 6px;
    width: 30px !important;
    fill: white;
    height: 25px !important;
    padding-left: 4px;
`;

const iconSpacing = css`
    display: inline-flex;
    align-items: center;
    ${textSans.small()};
`;

const thumbIcon = css`
    width: 16px;
    height: 16px;
`;

const footerStyling = css`
    font-size: 13px;
    line-height: 16px;
    display: flex;
    justify-content: flex-end;
`;

const footerSnippet = css`
    display: flex;
    align-items: center;
    ${textSans.xsmall()};
`;

const footerFeedback = css`
    ${textSans.xsmall()};
    height: 28px;
`;

const creditStyling = css`
    ${textSans.xsmall()};
    margin: 12px 0;
`;

const creditIconStyling = css`
    height: 12px;
    overflow: visible;
    width: 6px;
    fill: white;
`;

const creditSpanStyling = css`
    display: inline-flex;
    background: #bdbdbd;
    border-radius: 100%;
    width: 16px;
    height: 16px;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
`;

// Components
const Container = ({
    id,
    title,
    children,
    expandHandler,
}: {
    id: string;
    title: string;
    children: React.ReactNode;
    expandHandler: () => void;
}) => {
    return (
        <div
            className={containerStyling}
            data-atom-id={id}
            data-atom-type="qanda"
        >
            <details
                data-snippet-id={id}
                data-snippet-type="qanda"
                className={detailStyling}
            >
                <Summary title={title} expandHandler={expandHandler}></Summary>
                {children}
            </details>
        </div>
    );
};

const Summary = ({
    title,
    expandHandler,
}: {
    title: string;
    expandHandler: () => void;
}) => {
    const [hasBeenExpanded, setExpandStatus] = useState(false);
    const [expandEventSent, setExpandEventFired] = useState(false);
    return (
        <summary className={summaryStyling}>
            <span
                className={css`
                    color: #e00000;
                    display: block;
                    ${body.medium({
                        lineHeight: 'tight',
                        fontWeight: 'bold',
                    })};
                `}
            >
                Q&amp;A
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
            <span
                className={showHideStyling}
                onClick={() => {
                    if (!hasBeenExpanded) {
                        // Makes sure EXPAND event is only fired on initial expand
                        if (!expandEventSent) {
                            expandHandler();
                            setExpandEventFired(true);
                        }
                    }
                    setExpandStatus(!hasBeenExpanded);
                }}
                aria-hidden="true"
            >
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

const Body = ({
    html,
    image,
    credit,
}: {
    html: string;
    image?: string;
    credit?: string;
}) => (
    <div>
        {image && <img className={imageStyling} src={image} alt="" />}
        <div
            className={bodyStyling}
            dangerouslySetInnerHTML={{
                __html: html,
            }}
        />
        {credit && <Credit credit={credit} />}
    </div>
);

const Credit = ({ credit }: { credit: string }) => (
    <div className={creditStyling}>
        <span className={creditSpanStyling}>
            <svg
                className={creditIconStyling}
                width="6px"
                height="14px"
                viewBox="0 0 6 14"
            >
                <path d="M4.6 12l-.4 1.4c-.7.2-1.9.6-3 .6-.7 0-1.2-.2-1.2-.9 0-.2 0-.3.1-.5l2-6.7H.7l.4-1.5 4.2-.6h.2L3 12h1.6zM4.3 2.8c-.9 0-1.4-.5-1.4-1.3C2.9.5 3.7 0 4.6 0 5.4 0 6 .5 6 1.3c0 1-.8 1.5-1.7 1.5z"></path>
            </svg>
        </span>
        {' ' + credit}
    </div>
);

const Footer = ({
    likeHandler,
    dislikeHandler,
}: {
    likeHandler: () => void;
    dislikeHandler: () => void;
}) => {
    const [showFeedback, setFeedbackVisibility] = useState(false);
    return (
        <footer className={footerStyling}>
            <div hidden={showFeedback ? true : false}>
                <div className={footerSnippet}>
                    <div>Was this helpful?</div>
                    <button
                        className={buttonRound}
                        value="like"
                        aria-label="Yes"
                        data-testid="like"
                        onClick={() => {
                            likeHandler();
                            setFeedbackVisibility(true);
                        }}
                    >
                        <svg
                            className={thumbIcon}
                            width="40px"
                            height="40px"
                            viewBox="0 0 40 40"
                        >
                            <path
                                fill="#FFF"
                                d="M33.78 22.437l-4.228 13.98L27.93 37.5 5.062 34.14V15.503l7.8-1.517L24.354 2.5h1.624L28.9 5.426l-4.548 8.67h.107l10.477 1.31"
                            ></path>
                        </svg>
                    </button>
                    <button
                        className={buttonRound}
                        value="dislike"
                        aria-label="No"
                        data-testid="dislike"
                        onClick={() => {
                            dislikeHandler();
                            setFeedbackVisibility(true);
                        }}
                    >
                        <svg
                            className={
                                thumbIcon +
                                ' ' +
                                css`
                                    transform: rotate(180deg);
                                `
                            }
                            width="40px"
                            height="40px"
                            viewBox="0 0 40 40"
                        >
                            <path
                                fill="#FFF"
                                d="M33.78 22.437l-4.228 13.98L27.93 37.5 5.062 34.14V15.503l7.8-1.517L24.354 2.5h1.624L28.9 5.426l-4.548 8.67h.107l10.477 1.31"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div
                className={footerFeedback}
                aria-live="polite"
                hidden={showFeedback ? false : true}
            >
                Thank you for your feedback.
            </div>
        </footer>
    );
};
export const QandaAtom = ({
    id,
    title,
    image,
    html,
    credit,
    likeHandler,
    dislikeHandler,
    expandHandler,
}: QandaAtomType): JSX.Element => (
    <Container id={id} title={title} expandHandler={expandHandler}>
        <Body html={html} image={image} credit={credit} />
        <Footer
            likeHandler={likeHandler}
            dislikeHandler={dislikeHandler}
        ></Footer>
    </Container>
);
