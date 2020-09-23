import React, { useState, useEffect, useRef } from 'react';
import { css } from 'emotion';

import { headline, textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { neutral, text } from '@guardian/src-foundations/palette';
import { Pillar } from '@guardian/types/Format';

import { pillarPalette } from './lib/pillarPalette';
import { AudioAtomType } from './types';

const wrapperStyles = css`
    border-image: repeating-linear-gradient(
            to bottom,
            #dcdcdc,
            #dcdcdc 1px,
            transparent 1px,
            transparent 4px
        )
        13;
`;

const figureStyle = css`
    width: 100%;
`;

const kickerStyle = (pillar: Pillar) => css`
    color: ${pillarPalette[pillar].main};
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    font-family: 'Guardian Egyptian Web', Georgia, serif;
`;

const titleStyle = css`
    color: black;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    font-family: 'Guardian Egyptian Web', Georgia, serif;
`;

const audioBodyStyle = css`
    display: flex;
    overflow: hidden;
`;

const audioElementStyle = css`
    height: 0;
    vertical-align: baseline;
    width: 300px;
`;

const audioControlsStyle = css`
    box-sizing: content-box;
    padding-top: 10px;
    padding-right: 10px;
    width: 50px;
    height: 50px;
`;

const buttonStyle = css`
    border: 0;
    background-color: transparent;
`;

const svgPlayStyle = css`
    fill: currentColor;
    overflow: hidden;
    width: 50px;
    height: auto;
`;

const svgPauseStyle = css`
    fill: currentColor;
    overflow: hidden;
    width: 50px;
    height: auto;
`;

const timingStyle = css`
    align-items: center;
    display: flex;
    flex: 1;
`;

const timePlayedStyle = css`
    min-width: 65px;
    padding-right: 10px;
    padding-top: 6px;
    display: block;
`;

const progressBarStyle = css`
    flex: 1;
    display: block;
`;

const progressBarInputStyle = css`
    width: 100%;
`;

const timeDurationStyle = css`
    min-width: 65px;
    padding-top: 6px;
    padding-left: 10px;
    display: block;
`;

const format = (t: number) => t.toFixed(0).padStart(2, '0');

const formatTime = (t: number) => {
    const second = Math.floor(t % 60);
    const minute = Math.floor((t % 3600) / 60);
    const hour = Math.floor(t / 3600);
    return `${format(hour)}:${format(minute)}:${format(second)}`;
};

const PauseButton = ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick} className={buttonStyle}>
        <svg
            className={svgPauseStyle}
            width="30px"
            height="30px"
            viewBox="0 0 30 30"
        >
            <g fill="none" fillRule="evenodd">
                <circle fill="#C70000" cx="15" cy="15" r="15"></circle>
                <path
                    d="M9.429 7.286h3.429v15.429h-3.43zm7.286 0h3.429v15.429h-3.43z"
                    fill="#FFFFFF"
                ></path>
            </g>
        </svg>
    </button>
);

const PlayButton = ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick} className={buttonStyle}>
        <svg
            className={svgPlayStyle}
            width="30px"
            height="30px"
            viewBox="0 0 30 30"
        >
            <g fill="none" fillRule="evenodd">
                <circle fill="#C70000" cx="15" cy="15" r="15"></circle>
                <path
                    fill="#FFFFFF"
                    d="M10.113 8.571l-.47.366V20.01l.472.347 13.456-5.593v-.598z"
                ></path>
            </g>
        </svg>
    </button>
);

export const AudioAtom = ({
    id,
    trackUrl,
    kicker,
    title,
    pillar,
}: AudioAtomType): JSX.Element => {
    const audioEl = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    // update current time
    const [currentTime, setCurrentTime] = useState<number>();
    useEffect(() => {
        const updateCurrentTime = () =>
            setCurrentTime(audioEl.current ? audioEl.current.currentTime : 0);

        audioEl.current &&
            audioEl.current.addEventListener('timeupdate', updateCurrentTime);

        return () =>
            audioEl.current &&
            audioEl.current.removeEventListener(
                'timeupdate',
                updateCurrentTime,
            );
    }, [audioEl, setCurrentTime]);

    // update duration time
    const [durationTime, setDurationTime] = useState<number>();
    useEffect(() => {
        const updateDurationTime = () =>
            setDurationTime(audioEl.current ? audioEl.current.duration : 0);
        audioEl.current &&
            audioEl.current.addEventListener('loadeddata', updateDurationTime);
        return () =>
            audioEl.current &&
            audioEl.current.removeEventListener(
                'loadeddata',
                updateDurationTime,
            );
    }, [audioEl, setDurationTime]);

    useEffect(() => {
        if (isPlaying) {
            audioEl.current && audioEl.current.play();
        } else {
            audioEl.current && audioEl.current.pause();
        }
    }, [isPlaying, audioEl]);

    return (
        <figure
            className={figureStyle}
            data-atom-id={id}
            data-atom-type="audio"
        >
            <div className={wrapperStyles}>
                <span className={kickerStyle(pillar)}>{kicker}</span>
                <h4 className={titleStyle}>{title}</h4>
                <div className={audioBodyStyle}>
                    <audio
                        className={audioElementStyle}
                        src={trackUrl}
                        ref={audioEl}
                        // TODO:
                        // data-duration="849"
                        // preload="none"
                        // data-media-id="_no_ids"
                        // data-title="Football Weekly Extra Extra"
                        // data-component="inarticle audio"
                    >
                        <p>
                            Sorry your browser does not support audio - but you
                            can download here and listen
                            https://audio.guim.co.uk/2020/05/05-61553-gnl.fw.200505.jf.ch7DW.mp3
                        </p>
                    </audio>
                    <div className={audioControlsStyle}>
                        {isPlaying ? (
                            <PauseButton onClick={() => setIsPlaying(false)} />
                        ) : (
                            <PlayButton onClick={() => setIsPlaying(true)} />
                        )}
                    </div>
                    <div className={timingStyle}>
                        <div className={timePlayedStyle}>
                            <span>
                                {currentTime
                                    ? formatTime(currentTime)
                                    : '00:00:00'}
                            </span>
                        </div>
                        <div className={progressBarStyle}>
                            <input
                                className={progressBarInputStyle}
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value="0"
                            />
                        </div>
                        <div className={timeDurationStyle}>
                            <span>
                                {durationTime
                                    ? formatTime(durationTime)
                                    : '00:00:00'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </figure>
    );
};
