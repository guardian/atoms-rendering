import React from 'react';
import { css, cx } from 'emotion';
import { neutral } from '@guardian/src-foundations/palette';
import { GetPillarColour } from '../lib/PillarColours';
import { body, textSans } from '@guardian/src-foundations/typography';
import { SvgInfo } from '@guardian/src-icons';

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

    i {
        font-style: italic;
    }
`;

export const Body = ({
    html,
    image,
    credit,
    pillar,
}: {
    html: string;
    image?: string;
    credit?: string;
    pillar: string;
}): JSX.Element => {
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
