import React from 'react';
import { css } from '@emotion/react';
import { pillarPalette } from './lib/pillarPalette';

import {
    focusHalo,
    space,
    textSans,
    neutral,
} from '@guardian/source-foundations';
import { SvgPlay } from '@guardian/source-react-components';

import { formatTime } from './lib/formatTime';
import { Picture } from './Picture';
import { ImageSource, RoleType } from './types';
import type { ArticleTheme } from '@guardian/libs';

type Props = {
    overrideImage?: ImageSource[];
    posterImage?: ImageSource[];
    height: number;
    width: number;
    alt: string;
    role: RoleType;
    duration?: number; // in seconds
    pillar: ArticleTheme;
    onClick: () => void;
};

const overlayStyles = css`
    background-size: cover;
    background-position: 49% 49%;
    background-repeat: no-repeat;
    text-align: center;
    height: 100%;
    width: 100%;
    position: absolute;
    max-height: 100vh;
    cursor: pointer;

    /* hard code "overlay-play-button" to be able to give play button animation on focus/hover of overlay */
    :focus {
        ${focusHalo}
        .overlay-play-button {
            transform: scale(1.15);
            transition-duration: 300ms;
        }
    }
    :hover {
        .overlay-play-button {
            transform: scale(1.15);
            transition-duration: 300ms;
        }
    }
`;

const playButtonStyling = (pillar: ArticleTheme) => css`
    background-color: ${pillarPalette[pillar][500]};
    border-radius: 100%;
    height: 60px;
    width: 60px;
    transform: scale(1);
    transition-duration: 300ms;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        fill: ${neutral[100]};
        width: 45px;
        height: 40px;
    }
`;

const overlayInfoWrapperStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    bottom: ${space[4]}px;
    left: ${space[4]}px;
`;

const videoDurationStyles = (pillar: ArticleTheme) => css`
    ${textSans.medium({ fontWeight: 'bold' })};
    padding-left: ${space[3]}px;
    color: ${pillarPalette[pillar][500]};
`;

export const YoutubeAtomOverlay = ({
    overrideImage,
    posterImage,
    height,
    width,
    alt,
    role,
    duration,
    pillar,
    onClick,
}: Props): JSX.Element => {
    return (
        <>
            <div
                data-cy="youtube-overlay"
                data-testid="youtube-overlay"
                onClick={() => {
                    onClick();
                }}
                onKeyDown={(e) => {
                    if (e.code === 'Space' || e.code === 'Enter') {
                        onClick();
                    }
                }}
                css={overlayStyles}
                tabIndex={0}
            >
                <Picture
                    imageSources={overrideImage || posterImage || []}
                    role={role}
                    alt={alt}
                    height={`${height}`}
                    width={`${width}`}
                />
                <div css={overlayInfoWrapperStyles}>
                    <div
                        className="overlay-play-button"
                        css={css`
                            ${playButtonStyling(pillar)}
                        `}
                    >
                        <SvgPlay />
                    </div>
                    {duration && (
                        <div css={videoDurationStyles(pillar)}>
                            {formatTime(duration)}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
