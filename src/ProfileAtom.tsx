import React from 'react';

import { ProfileAtomType } from './types';
import { css, cx } from 'emotion';
import { body, textSans } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { SvgInfo } from '@guardian/src-icons';
import { Footer } from './components/Footer';
import { Summary } from './components/Summary';
import { GetPillarColour } from './lib/PillarColours';

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

    /* Without this bold elements are overridden */
    b {
        font-weight: 700;
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

const Container = ({
    id,
    title,
    children,
    pillar,
    expandForStorybook,
    expandCallback,
}: {
    id: string;
    title: string;
    pillar: string;
    expandForStorybook?: boolean;
    children: React.ReactNode;
    expandCallback: () => void;
}) => (
    <div className={containerStyling} data-atom-id={id} data-atom-type="Profile">
        <details
            className={detailStyling}
            data-atom-id={id}
            data-snippet-type="Profile"
            open={expandForStorybook}
        >
            <Summary
                sectionTitle={'Profile'}
                pillar={pillar}
                title={title}
                expandCallback={expandCallback}
            />
            {children}
        </details>
    </div>
);

const Body = ({
    html,
    image,
    credit,
    pillar,
}: {
    html: string;
    image?: string;
    credit?: string;
    pillar: string;
}) => {
    const linkStyling = css`
        a {
            color: ${GetPillarColour(pillar, 300)};
            text-decoration: none;
            border-bottom: 0.0625rem solid ${neutral[86]};
            transition: border-color 0.15s ease-out;
        }

        a:hover {
            border-bottom: solid 0.0625rem ${GetPillarColour(pillar, 400)};
        }
    `;
    return (
        <div>
            {image && (
                <span className={'forceHeightAndWidth'}>
                    <img className={imageStyling} src={image} alt="" />
                </span>
            )}
            <div
                className={cx(bodyStyling, linkStyling)}
                dangerouslySetInnerHTML={{
                    __html: html,
                }}
            />
            {credit && (
                <div className={creditStyling}>
                    <SvgInfo />
                    {credit}
                </div>
            )}
        </div>
    );
};

export const ProfileAtom = ({
    id,
    title,
    image,
    html,
    credit,
    pillar,
    expandForStorybook,
    likeHandler,
    dislikeHandler,
    expandCallback,
}: ProfileAtomType): JSX.Element => {
    return (
        <Container
            id={id}
            title={title}
            pillar={pillar}
            expandForStorybook={expandForStorybook}
            expandCallback={expandCallback}
        >
            <Body html={html} image={image} credit={credit} pillar={pillar} />
            <Footer
                pillar={pillar}
                dislikeHandler={dislikeHandler}
                likeHandler={likeHandler}
            ></Footer>
        </Container>
    );
};
