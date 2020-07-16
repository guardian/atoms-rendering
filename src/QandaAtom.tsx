import React from 'react';
import { css } from 'emotion';
import { neutral, text } from '@guardian/src-foundations/palette';
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
`;

const summaryStyling = css``;

const showHideStyling = css`
    background: #121212;
    color: #ffffff;
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
`;

const iconStyling = css`
    fill: white;
    width: 20px;
    height: 20px;
    margin-right: 10px;
`;

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
                className=""
            >
                <Summary title={title}></Summary>
                {children}
            </details>
        </figure>
    );
};

/* export const QandaAtom = ({ id }: QandaAtomType): JSX.Element => (
    //<div data-atom-id={id}>QandaAtom</div>

); */

const Summary = ({ title }: { title: string }) => (
    <summary className={summaryStyling}>
        <span
            className={css`
                color: #e00000;
                font-weight: 600;
                font-size: 18px;
                line-height: 22px;
                display: block;
                ${headline.xxsmall({
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
            <span className="is-on">
                <svg
                    className="icon icon--plus "
                    width="18px"
                    height="18px"
                    viewBox="0 0 18 18"
                >
                    <path d="M8.2 0h1.6l.4 7.8 7.8.4v1.6l-7.8.4-.4 7.8H8.2l-.4-7.8L0 9.8V8.2l7.8-.4.4-7.8z"></path>
                </svg>{' '}
                Show
            </span>{' '}
            <span className="is-off">
                <svg
                    className="icon icon--minus "
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
        className={'atom--snippet__body '}
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);

const Footer = () => (
    <footer className="atom--snippet__footer">
        <div className="atom--snippet__feedback">
            <div>Was this helpful?</div>
            <button
                className="atom__button atom__button--round"
                value="like"
                aria-label="Yes"
            >
                <svg
                    className="icon icon--thumb "
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
                className="atom__button atom__button--round"
                value="dislike"
                aria-label="No"
            >
                <svg
                    className="icon icon--thumb "
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
        <div
            className="atom--snippet__ack"
            aria-role="alert"
            aria-live="polite"
        >
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
