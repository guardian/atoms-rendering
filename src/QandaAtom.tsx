import React from 'react';

import { QandaAtomType } from './types';

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
            className="element element-atom"
            data-atom-id={id}
            data-atom-type="qanda"
        >
            <details
                data-snippet-id={id}
                data-snippet-type="qanda"
                className="atom atom--snippet atom--snippet--qanda"
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
    <summary className="atom--snippet__header">
        <span className="atom--snippet__label">Q&amp;A</span>
        <h4 className="atom--snippet__headline">{title}</h4>{' '}
        <span
            className="atom__button atom__button--large atom__button--rounded atom--snippet__handle"
            aria-hidden="true"
        >
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
