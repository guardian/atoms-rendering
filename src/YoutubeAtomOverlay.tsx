import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { pillarPalette } from './lib/pillarPalette';

import {
    focusHalo,
    space,
    textSans,
    neutral,
} from '@guardian/source-foundations';
import { SvgPlay } from '@guardian/source-react-components';

import { Placeholder } from './common/Placeholder';
import { formatTime } from './lib/formatTime';
import { Picture } from './Picture';
import { ImageSource, RoleType } from './types';
import { ArticleTheme } from '@guardian/libs';

type Props = {
    overrideImage?: ImageSource[];
    posterImage?: ImageSource[];
    height: number;
    width: number;
    alt: string;
    role: RoleType;
    duration?: number; // in seconds
    pillar: ArticleTheme;
    loadPlayer: boolean;
    setLoadPlayer: (flag: boolean) => void;
    hasUserLaunchedPlay: boolean;
    setHasUserLaunchedPlay: (flag: boolean) => void;
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

// Overlay CSS
const hideOverlayStyling = css`
    visibility: hidden;
    opacity: 0;
    transition: opacity 1s linear, visibility 1s;
    transition-delay: 500ms;
    transition-duration: 500ms;
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
    loadPlayer,
    setLoadPlayer,
    hasUserLaunchedPlay,
    setHasUserLaunchedPlay,
}: Props): JSX.Element => {
    const hasOverlay = overrideImage || posterImage;

    const [interactionStarted, setInteractionStarted] = useState<boolean>(
        false,
    );

    useEffect(() => {
        let loadPlayerValue;
        if (!hasOverlay) {
            // Always load the iframe if there is no overlay
            loadPlayerValue = true;
        } else if (hasUserLaunchedPlay) {
            // The overlay has been clicked so we should load the iframe
            loadPlayerValue = true;
        } else {
            // Load early when either the mouse over or touch start event is fired
            loadPlayerValue = interactionStarted;
        }
        console.log({
            from: 'YoutubeAtomOverlay useEffect setLoadPlayer',
            loadPlayer: loadPlayerValue,
        });
        setLoadPlayer(loadPlayerValue);
    }, [hasUserLaunchedPlay, interactionStarted, setLoadPlayer]);

    /**
     * Show the overlay if:
     * - It exists
     *
     * and
     *
     * - It hasn't been clicked upon
     */
    const showOverlay = hasOverlay && !hasUserLaunchedPlay;

    /**
     * Show a placeholder if:
     *
     * - We don't have a player yet (probably because we don't have consent)
     *
     * and
     *
     * - There's no overlay to replace it with or the reader clicked to play but we're
     * still waiting on consent
     *
     */
    const showPlaceholder = !loadPlayer && (!hasOverlay || hasUserLaunchedPlay);

    console.log({
        from: 'YoutubeAtomOverlay render',
        showOverlay,
        showPlaceholder,
        loadPlayer,
        interactionStarted,
        hasUserLaunchedPlay,
    });

    return (
        <>
            {showPlaceholder && (
                <div
                    css={css`
                        width: ${width}px;
                        height: ${height}px;
                        position: absolute;
                        top: 0;
                        left: 0;
                    `}
                >
                    <Placeholder
                        height={height}
                        width={width}
                        shouldShimmer={true}
                    />
                </div>
            )}

            {showOverlay && (
                <div
                    data-cy="youtube-overlay"
                    data-testid="youtube-overlay"
                    onClick={() => {
                        setHasUserLaunchedPlay(true);
                    }}
                    onKeyDown={(e) => {
                        if (e.code === 'Space' || e.code === 'Enter') {
                            setHasUserLaunchedPlay(true);
                        }
                    }}
                    onMouseEnter={() => setInteractionStarted(true)}
                    onTouchStart={() => setInteractionStarted(true)}
                    css={[
                        overlayStyles,
                        hasUserLaunchedPlay ? hideOverlayStyling : '',
                        css`
                            img {
                                height: 100%;
                                width: 100%;
                            }
                        `,
                    ]}
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
            )}
        </>
    );
};
