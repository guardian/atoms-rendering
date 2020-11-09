import React, { useEffect, useState, useCallback } from 'react';
import { css } from 'emotion';

import { palette, space } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { SvgPlay } from '@guardian/src-icons';

import { formatTime } from './lib/formatTime';

declare let window: any;

const overlayStyles = (image: string) => css`
    background-image: url(${image});
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
    :focus,
    :hover {
        .overlay-play-button {
            transform: scale(1.15);
            transition-duration: 300ms;
        }
    }
`;

const hideOverlayStyling = css`
    visibility: hidden;
    opacity: 0;
    transition: opacity 1s linear, visibility 1s;
    transition-delay: 500ms;
    transition-duration: 500ms;
`;

const playButtonStyling = css`
    background-color: ${palette['news'][500]};
    border-radius: 100%;
    height: 60px;
    width: 60px;
    transform: scale(1);
    transition-duration: 300ms;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        fill: ${palette['neutral'][100]};
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

const videoDurationStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })};
    padding-left: ${space[3]}px;
    color: ${palette['news'][500]};
`;

export const YoutubeOverlay = ({
    image,
    duration,
    id,
}: {
    image: string;
    duration?: number;
    id: string;
}): JSX.Element => {
    const [hideOverlay, setHideOverlay] = useState(false);
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [player, setPlayer] = useState<YT.Player | null>(null);

    const loadVideo = () => {
        setPlayer(
            new window.YT.Player(`${id}`, {
                events: {
                    onReady: () => setIsPlayerReady(true),
                },
                playerVars: {
                    mute: 1,
                    autoplay: 1,
                },
            }),
        );
    };

    useEffect(() => {
        // if window is undefined it is because this logic is running on the server side
        if (typeof window === 'undefined') return;

        if (window.YT) {
            loadVideo();
        } else {
            // If not, load the script asynchronously
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

            // onYouTubeIframeAPIReady will load the video after the script is loaded
            window.onYouTubeIframeAPIReady = loadVideo;

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag &&
                firstScriptTag.parentNode &&
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    }, []);

    const onClickOverlay = useCallback(() => {
        if (isPlayerReady && player) {
            try {
                player.playVideo();
                setHideOverlay(true);
            } catch (e) {
                console.error(`Unable to play video due to: ${e}`);
            }
        }
    }, [player, isPlayerReady]);

    const onKeyDownOverlay = useCallback(
        (e) => {
            const spaceKey = 32;
            const enterKey = 13;
            if (
                (e.keyCode === spaceKey || e.keyCode === enterKey) &&
                isPlayerReady &&
                player
            ) {
                try {
                    player.playVideo();
                    setHideOverlay(true);
                } catch (e) {
                    console.error(`Unable to play video due to: ${e}`);
                }
            }
        },
        [player, isPlayerReady],
    );

    return (
        <div
            // cannot use cx because it would cause new key to be generated on `hideOverlay` toggle causing css refresh
            className={`${overlayStyles(image)} ${
                hideOverlay ? hideOverlayStyling : ''
            }`}
            onClick={onClickOverlay}
            onKeyDown={onKeyDownOverlay}
            tabIndex={0}
        >
            <div className={overlayInfoWrapperStyles}>
                <div className={`${playButtonStyling} overlay-play-button`}>
                    <SvgPlay />
                </div>
                {duration && (
                    <div className={videoDurationStyles}>
                        {formatTime(duration)}
                    </div>
                )}
            </div>
        </div>
    );
};