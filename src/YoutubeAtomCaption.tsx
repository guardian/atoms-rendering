import { css } from '@emotion/react';
import { space, textSans, neutral } from '@guardian/source-foundations';
import { SvgVideo } from '@guardian/source-react-components';
import React, { useState } from 'react';

const buttonStyle = css`
    position: absolute;
    top: 6px;
    right: 6px;
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
        fill: ${neutral[100]};
    }
`;

const figCaptionStyle = css`
    position: absolute;
    z-index: 1;
    display: flex;
    flex-grow: 1;
    min-height: 44px;
    padding: 6px 40px 0px 12px;
    background: rgba(18, 18, 18, 0.8);
    color: ${neutral[100]};
    ${textSans.xxsmall()};
    word-wrap: break-all;
    top: 0;
    left: 0;
    right: 0;
`;

const iconStyle = css`
    fill: ${neutral[100]};
    margin-right: ${space[1]}px;
`;
const textStyle = css`
    margin-top: 1px;
`;

const captionStyle = css`
    a {
        color: ${neutral[100]};
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
    strong {
        font-weight: bold;
    }
`;
const creditStyle = css`
    ::before {
        content: ' ';
        white-space: pre;
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
            {captionClicked && (
                <figcaption css={figCaptionStyle}>
                    <div css={iconStyle}>
                        <SvgVideo size={'xsmall'} />
                    </div>
                    <div css={textStyle}>
                        {caption && (
                            <span css={captionStyle} key="caption">
                                {caption}
                            </span>
                        )}
                        {credit && <span css={creditStyle}>{credit}</span>}
                    </div>
                </figcaption>
            )}
        </>
    );
};
