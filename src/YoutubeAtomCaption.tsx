import { css } from '@emotion/react';
import { space, textSans } from '@guardian/source-foundations';
import React, { useState } from 'react';

const captionLink = css`
    a {
        color: white;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
    strong {
        font-weight: bold;
    }
`;

const videoRatio = (23 / 36) * 100;

const iconStyle = css`
    fill: white;
    margin-right: ${space[1]}px;
    display: inline-block;
    position: relative;
    width: 1.1em;
    vertical-align: baseline;
    ::before {
        content: ' ';
        display: block;
        padding-top: ${videoRatio}%;
    }
    svg {
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        width: 100%;
        position: absolute;
        height: 100%;
    }
`;

const captionStyle = css`
    color: white;
    ${textSans.xxsmall()};
    padding: 6px 40px 0px 12px;
    word-wrap: break-all;
    left: 0;
    right: 0;
    top: 0;
    background: rgba(18, 18, 18, 0.8);
    flex-grow: 1;
    min-height: 42px;
    position: absolute;
    z-index: 1;
`;
const buttonStyle = css`
    position: absolute;
    top: 6px;
    right: 5px;
    width: 32px;
    height: 32px;
    z-index: 2;
    /* We're using rgba here for the opactiy */
    background-color: rgba(18, 18, 18, 0.6);
    border-radius: 50%;
    border: none;
    cursor: pointer;
    svg {
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        position: absolute;
        fill: white;
    }
`;
type Props = {
    caption?: string;
    credit?: string;
};

export const YoutubeAtomCaption = ({ caption, credit }: Props): JSX.Element => {
    const [captionClicked, setCaptionClicked] = useState<boolean>(false);

    return (
        <>
            <button
                onClick={() =>
                    captionClicked
                        ? setCaptionClicked(false)
                        : setCaptionClicked(true)
                }
                css={buttonStyle}
            >
                <svg width="6" height="14" fill="white" viewBox="0 0 6 14">
                    <path d="M4.6 12l-.4 1.4c-.7.2-1.9.6-3 .6-.7 0-1.2-.2-1.2-.9 0-.2 0-.3.1-.5l2-6.7H.7l.4-1.5 4.2-.6h.2L3 12h1.6zm-.3-9.2c-.9 0-1.4-.5-1.4-1.3C2.9.5 3.7 0 4.6 0 5.4 0 6 .5 6 1.3c0 1-.8 1.5-1.7 1.5z" />
                </svg>
            </button>
            {true && (
                // {captionClicked && (
                <figcaption css={captionStyle}>
                    <div css={iconStyle}>
                        <svg width="36" height="23" viewBox="0 0 36 23">
                            <path d="M3.2 0l-3.2 3.3v16.4l3.3 3.3h18.7v-23h-18.8m30.4 1l-8.6 8v5l8.6 8h2.4v-21h-2.4" />
                        </svg>
                    </div>
                    {caption && (
                        <span css={captionLink} key="caption">
                            {caption}
                        </span>
                    )}

                    {` ${credit}`}
                </figcaption>
            )}
        </>
    );
};
