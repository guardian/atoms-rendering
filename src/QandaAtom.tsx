import React from 'react';
import { css } from 'emotion';
import { neutral } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { QandaAtomType } from './types';

// CSS
const figureStyling = css`
    background: ${neutral[93]};
    border-image: repeating-linear-gradient(
            to bottom,
            #dcdcdc,
            #dcdcdc 1px,
            transparent 1px,
            transparent 4px
        )
        13;
    border-top: 13px solid black;
    border-left: 0;
    border-right: 0;
    border-bottom: 0;
    position: relative;
    padding: 0 5px 20px;
    margin: 16px 0 36px;
    details > summary {
        list-style: none;
    }
    details > summary::-webkit-details-marker {
        display: none;
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
        background-color: #dcdcdc;
        margin-left: -1.25rem;
    }

    a {
        color: #ab0613;
        text-decoration: none !important;
        border-bottom: 0.0625rem solid #bdbdbd;
        transition: border-color 0.15s ease-out;
    }

    a:hover {
        border-bottom: solid 0.0625rem #c70000;
    }

    details[open] .is-on {
        display: none;
    }
    details:not([open]) .is-off {
        display: none;
    }
`;

const detailStyling = css``;

const summaryStyling = css``;

const showHideStyling = css`
    background: #121212;
    color: #ffffff;
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

const iconStyling = css`
    fill: white;
    width: 20px;
    height: 20px;
    margin-right: 10px;
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
        background: #e00000;
        border-color: #e00000;
    }
`;

const iconSpacing = css`
    display: inline-flex;
    align-items: center;
    ${textSans.xsmall()};
`;

const thumbIcon = css`
    width: 16px;
    height: 16px;
`;

const dislikeThumb = css`
    transform: rotate(180deg);
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

// Components
const Figure = ({
    id,
    title,
    children,
}: {
    id: string;
    title: string;
    children: React.ReactNode;
}) => {
    return (
        <figure
            className={figureStyling}
            data-atom-id={id}
            data-atom-type="qanda"
        >
            <details
                data-snippet-id={id}
                data-snippet-type="qanda"
                className={detailStyling}
            >
                <Summary title={title}></Summary>
                {children}
            </details>
        </figure>
    );
};

const Summary = ({ title }: { title: string }) => (
    <summary className={summaryStyling}>
        <span
            className={css`
                color: #e00000;
                font-weight: 600;
                font-size: 18px;
                line-height: 22px;
                display: block;
                ${textSans.medium({
                    fontWeight: 'bold',
                    lineHeight: 'tight',
                })};
            `}
        >
            Q&amp;A
        </span>
        <h4
            className={css`
                ${headline.xxsmall({
                    fontWeight: 'medium',
                })};
                margin: 0;
                line-height: 22px;
            `}
        >
            {title}
        </h4>{' '}
        <span className={showHideStyling} aria-hidden="true">
            {' '}
            <span className={'is-on ' + iconSpacing}>
                <svg
                    className={iconStyling}
                    width="18px"
                    height="18px"
                    viewBox="0 0 18 18"
                >
                    <path d="M8.2 0h1.6l.4 7.8 7.8.4v1.6l-7.8.4-.4 7.8H8.2l-.4-7.8L0 9.8V8.2l7.8-.4.4-7.8z"></path>
                </svg>{' '}
                Show
            </span>{' '}
            <span className={'is-off ' + iconSpacing}>
                <svg
                    className={iconStyling}
                    width="32px"
                    height="32px"
                    viewBox="0 0 32 32"
                >
                    <rect x="5" y="15" width="22" height="3"></rect>
                </svg>{' '}
                Hide
            </span>{' '}
        </span>{' '}
    </summary>
);

const Body = ({ html }: { html: string }) => (
    <div
        className={css`
            ${textSans.medium({
                fontWeight: 'light',
                lineHeight: 'loose',
            })}
            p {
                margin-bottom: 0.5rem;
            }
        `}
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);

const Footer = () => (
    <footer className={footerStyling}>
        <div className={footerSnippet}>
            <div>Was this helpful?</div>
            <button className={buttonRound} value="like" aria-label="Yes">
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
            <button className={buttonRound} value="dislike" aria-label="No">
                <svg
                    className={thumbIcon + ' ' + dislikeThumb}
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
        <div className="feedback" aria-role="alert" aria-live="polite" hidden>
            Thank you for your feedback.
        </div>
    </footer>
);
export const QandaAtom = ({ id, title, html }: QandaAtomType): JSX.Element => (
    <Figure id={id} title={title}>
        <Body html={html} />
        <Footer></Footer>
    </Figure>
);
