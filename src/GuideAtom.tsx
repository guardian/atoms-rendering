import React from 'react';

import { GuideAtomType } from './types';
import { css } from 'emotion';
import { body, textSans } from '@guardian/src-foundations/typography';
import { news, neutral } from '@guardian/src-foundations/palette';
import { SvgInfo } from '@guardian/src-icons';
import { Footer, Summary } from './SharedElements';

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

    ol {
        list-style: decimal;
        list-style-position: inside;
        margin-bottom: 1rem;
    }

    ul {
        list-style: none;
        margin: 0 0 0.75rem;
        padding: 0;
        margin-bottom: 1rem;
    }

    ul li {
        margin-bottom: 0.375rem;
        padding-left: 1.25rem;
    }

    ul li:before {
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

// .forceHeightAndWidth needed at the moment to override global image sizing
// which forces images to 100%
const imageStyling = css`
    .forceHeightAndWidth & {
        width: 100px;
        height: 100px;
    }
    float: left;
    margin-right: 16px;
    margin-bottom: 6px;
    object-fit: cover;
    border-radius: 50%;
    display: block;
    border: 0px;
`;

const creditStyling = css`
    ${textSans.xsmall()};
    margin: 12px 0;
    display: flex;
    align-items: center;
    svg {
        width: 30px;
        fill: ${neutral[60]};
    }
`;

// ELEMENTS

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
}) => (
    <div className={containerStyling} data-atom-id={id} data-atom-type="guide">
        <details
            className={detailStyling}
            data-atom-id={id}
            data-atom-type="guide"
        >
            <Summary
                sectionTitle={'Quick Guide'}
                title={title}
                expandHandler={expandHandler}
            ></Summary>
            {children}
        </details>
    </div>
);

const Body = ({
    html,
    image,
    credit,
}: {
    html: string;
    image?: string;
    credit?: string;
}) => {
    return (
        <div>
            {image && (
                <span className={'forceHeightAndWidth'}>
                    <img className={imageStyling} src={image} alt="" />
                </span>
            )}
            <div
                className={bodyStyling}
                dangerouslySetInnerHTML={{
                    __html: html,
                }}
            />
            {credit && <Credit credit={credit} />}
        </div>
    );
};

const Credit = ({ credit }: { credit: string }) => (
    <div className={creditStyling}>
        <SvgInfo />
        {credit}
    </div>
);

export const GuideAtom = ({
    id,
    title,
    image,
    html,
    credit,
    likeHandler,
    dislikeHandler,
    expandHandler,
}: GuideAtomType): JSX.Element => (
    <Container id={id} title={title} expandHandler={expandHandler}>
        <Body html={html} image={image} credit={credit} />
        <Footer
            dislikeHandler={dislikeHandler}
            likeHandler={likeHandler}
        ></Footer>
    </Container>
);
