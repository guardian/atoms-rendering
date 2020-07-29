import React, { useState } from 'react';
import { QandaAtomType } from './types';
import { css, cx } from 'emotion';
import { neutral, news } from '@guardian/src-foundations/palette';
import { headline, textSans, body } from '@guardian/src-foundations/typography';
import { SvgPlus, SvgMinus, SvgInfo } from '@guardian/src-icons';

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
        color: ${news[300]};
        text-decoration: none;
        border-bottom: 0.0625rem solid ${neutral[86]};
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
        background: ${news[400]};
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

// The important is here to override the default image style which defaults to 100% width
const imageStyling = css`
    width: 100px !important;
    height: 100px !important;
    float: left;
    margin-right: 16px;
    margin-bottom: 6px;
    object-fit: cover;
    border-radius: 50%;
    display: block;
    border: 0px;
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

const thumbIcon = css`
    width: 16px;
    height: 16px;
`;

const thumbDown = cx(
    thumbIcon,
    css`
        transform: rotate(180deg);
    `,
);

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
    display: flex;
    align-items: center;
    svg {
        width: 30px;
        fill: #999999;
    }
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
            className={summaryStyling}
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
                    setHasBeenExpanded(!hasBeenExpanded);
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
        <SvgInfo />
        {credit}
    </div>
);

const Footer = ({
    likeHandler,
    dislikeHandler,
}: {
    likeHandler: () => void;
    dislikeHandler: () => void;
}) => {
    const [showFeedback, setShowFeedback] = useState(false);
    return (
        <footer className={footerStyling}>
            <div hidden={showFeedback}>
                <div className={footerSnippet}>
                    <div>Was this helpful?</div>
                    <button
                        className={buttonRound}
                        value="like"
                        aria-label="Yes"
                        data-testid="like"
                        onClick={() => {
                            likeHandler();
                            setShowFeedback(true);
                        }}
                    >
                        <svg className={thumbIcon} viewBox="0 0 40 40">
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
                            setShowFeedback(true);
                        }}
                    >
                        <svg className={thumbDown} viewBox="0 0 40 40">
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
                hidden={!showFeedback}
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
