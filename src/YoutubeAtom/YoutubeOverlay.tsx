import React, { useState } from 'react';
import { css } from 'emotion';
import { Pillar } from '@guardian/types/Format';
import { space } from '@guardian/src-foundations';

import { YoutubeMeta } from './YoutubeMeta';

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

const buttonStyling = css`
    background: #ff4e36;
    border-radius: 100%;
    position: absolute;
    bottom: ${space[4]}px;
    left: ${space[4]}px;
    height: 60px;
    width: 60px;
`;

const svgStyle = css`
    left: 35%;
    position: absolute;
    height: 100%;
    width: 1.5rem;
`;

const BottomLeft = ({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) => (
    <div>
        <div className={buttonStyling}>
            <svg
                className={svgStyle}
                width="46"
                height="39"
                viewBox="0 0 46 39"
                fill="#ffff"
            >
                <path d="M46 20.58v-2.02L1.64 0 0 1.3v36.55L1.64 39 46 20.58z"></path>
            </svg>
            {children}
        </div>
    </div>
);

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
    console.log(`Overlay ${hideOverlay}`);
    const YoutubeCode =
        'function onYouTubeIframeAPIReady(){' +
        'let player = new YT.Player(`' +
        id +
        '`);this.addEventListener(`click`, clickFunction());function clickFunction(){if(player){player.playVideo()};};};';
    return (
        <div
            className={
                overlayStyles(image) +
                ' ' +
                (hideOverlay ? hideOverlayStyling : '')
            }
            onClick={() => {
                setHideOverlay(true);
                console.log(`Clicke Overlay: ${hideOverlay}`);
            }}
        >
            <script src="https://www.youtube.com/iframe_api" />
            <BottomLeft>
                <YoutubeMeta mediaDuration={duration} pillar={pillar} />
            </BottomLeft>
            <script>{YoutubeCode}</script>
        </div>
    );
};
