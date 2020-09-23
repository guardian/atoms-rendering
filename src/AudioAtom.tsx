import React, { useState, useEffect, useRef } from 'react';
import { css } from 'emotion';

import { headline, textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { neutral, text } from '@guardian/src-foundations/palette';

import { AudioAtomType } from './types';

const figureStyle = css`
    width: 100%;
`;

const kickerStyle = css`
    color: #0084c6;
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
}`;

const buttonStyle = css`
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    border: 0;
    margin: 0;
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
    display: block;
`;

const progressBarStyle = css`
    display: block;
`;

const timeDurationStyle = css`
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
            <g fill="none" fill-rule="evenodd">
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
            <g fill="none" fill-rule="evenodd">
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
}: AudioAtomType): JSX.Element => {
    const audioEl = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        if (isPlaying) {
            audioEl.current && audioEl.current.play();
        } else {
            audioEl.current && audioEl.current.pause();
        }
    }, [isPlaying, audioEl]);

    return (
        <div
            className={css`
                width: 700px;
                border: red 1px solid;
            `}
        >
            <figure
                className={figureStyle}
                data-atom-id={id}
                data-atom-type="audio"
            >
                <div>
                    <span className={kickerStyle}>{kicker}</span>
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
                                Sorry your browser does not support audio - but
                                you can download here and listen
                                https://audio.guim.co.uk/2020/05/05-61553-gnl.fw.200505.jf.ch7DW.mp3
                            </p>
                        </audio>
                        <div className={audioControlsStyle}>
                            {isPlaying ? (
                                <PauseButton
                                    onClick={() => setIsPlaying(false)}
                                />
                            ) : (
                                <PlayButton
                                    onClick={() => setIsPlaying(true)}
                                />
                            )}
                        </div>
                        <div className={timingStyle}>
                            <div className={timePlayedStyle}>
                                <span>
                                    {audioEl.current
                                        ? formatTime(
                                              audioEl.current.currentTime,
                                          )
                                        : '00:00:00'}
                                </span>
                            </div>
                            <div className={progressBarStyle}>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value="0"
                                />
                            </div>
                            <div className={timeDurationStyle}>
                                <span>
                                    {audioEl.current
                                        ? formatTime(audioEl.current.duration)
                                        : '00:00:00'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </figure>
        </div>
    );
};
