import React, { useEffect, useState, useCallback } from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { Pillar } from '@guardian/types/Format';
import { space } from '@guardian/src-foundations';

import { YoutubeMeta } from './YoutubeMeta';

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
`;

const hideOverlayStyling = css`
    visibility: hidden;
    opacity: 0;
    transition: opacity 1s linear, visibility 1s;
    transition-delay: 500ms;
    transition-duration: 500ms;
`;

const svgStyle = css`
    left: 35%;
    top: 1%;
    position: absolute;
    height: 100%;
    width: 1.5rem;
`;

const playButtonStyling = css`
    background-color: ${palette['news'][500]};
    border-radius: 100%;
    position: absolute;
    bottom: ${space[4]}px;
    left: ${space[4]}px;
    height: 60px;
    width: 60px;
    transform: scale(1);
    transition-duration: 300ms;

    :hover {
        transform: scale(1.15);
        transition-duration: 300ms;
    }
`;

const overlayInfoWrapperStyles = css`
    display: flex;
    flex-direction: row;
`;

const videoDurationStyles = css`
    color: ${palette['news'][500]};
`;

export const YoutubeOverlay = ({
    image,
    pillar,
    duration,
    id,
}: {
    image: string;
    pillar: Pillar;
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

    return (
        <div
            // cannot use cx because it would cause new key to be generated on `hideOverlay` toggle causing css refresh
            className={`${overlayStyles(image)} ${
                hideOverlay ? hideOverlayStyling : ''
            }`}
            onClick={onClickOverlay}
        >
            <div className={overlayInfoWrapperStyles}>
                <div className={playButtonStyling}>
                    <svg
                        className={svgStyle}
                        width="46"
                        height="39"
                        viewBox="0 0 46 39"
                        fill={palette['neutral'][100]}
                    >
                        <path d="M46 20.58v-2.02L1.64 0 0 1.3v36.55L1.64 39 46 20.58z"></path>
                    </svg>
                </div>
                <div className={videoDurationStyles}>4:14</div>
            </div>
            <YoutubeMeta mediaDuration={duration} pillar={pillar} />
        </div>
    );
};
