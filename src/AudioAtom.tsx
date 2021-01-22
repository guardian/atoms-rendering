import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { css } from 'emotion';

import { textSans, headline } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';
import { focusHalo } from '@guardian/src-foundations/accessibility';
import { Pillar, Theme } from '@guardian/types';

import { pillarPalette } from './lib/pillarPalette';
import { AudioAtomType } from './types';

const wrapperStyles = css`
    width: 100%;
    border-image: repeating-linear-gradient(
            to bottom,
            ${palette.neutral[86]},
            ${palette.neutral[86]} 1px,
            transparent 1px,
            transparent 4px
        )
        13;
    border-top: 13px solid black;
    background-color: ${palette.neutral[97]};
    position: relative;
    padding-left: 5px;
    padding-right: 5px;
    padding-bottom: 1px;
    margin: 16px 0 36px;
`;

const kickerStyle = (pillar: Theme) => css`
    color: ${pillarPalette[pillar][400]};
    ${headline.xxxsmall({ fontWeight: 'bold' })};
`;

const titleStyle = css`
    ${headline.xxxsmall()};
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
    padding: 5px;
    width: 50px;
    height: 50px;
`;

const buttonStyle = css`
    padding: 0;
    border: 0;
    outline: 0;
    cursor: pointer;
    background-color: transparent;
    :focus {
        ${focusHalo}
    }
    height: 50px;
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
    min-width: 75px;
    padding-top: 6px;
    display: block;
`;

const progressBarStyle = css`
    flex: 1;
    display: block;
`;

const progressBarInputStyle = (pillar: Theme) => css`
    width: 100%;
    appearance: none;
    background-image: linear-gradient(
        to right,
        ${pillarPalette[pillar][400]} 0%,
        ${palette.neutral[60]} 0%
    );
    height: 6px;
    outline: 0;
    cursor: pointer;
    margin-left: 0;
    margin-right: 0;
    :focus {
        ${focusHalo}
    }
    // Use the pillar to style the colour of the range thumb
    &::-webkit-slider-thumb {
        background: ${pillarPalette[pillar][400]};
        -webkit-appearance: none;
        width: 14px;
        height: 14px;
        border-radius: 50px;
    }
    &::-moz-range-thumb {
        background: ${pillarPalette[pillar][400]};
        width: 14px;
        height: 14px;
        border: none;
        border-radius: 50px;
    }
    &::-ms-thumb {
        background: ${pillarPalette[pillar][400]};
        width: 14px;
        height: 14px;
        border: none;
        border-radius: 50px;
    }
`;

const timeDurationStyle = css`
    min-width: 65px;
    padding-top: 6px;
    padding-left: 10px;
    display: block;
`;

const timeStyles = css`
    ${textSans.small()}
`;

const format = (t: number) => t.toFixed(0).padStart(2, '0');

const formatTime = (t: number) => {
    const second = Math.floor(t % 60);
    const minute = Math.floor((t % 3600) / 60);
    const hour = Math.floor(t / 3600);
    return `${format(hour)}:${format(minute)}:${format(second)}`;
};

const PauseSVG = ({ pillar }: { pillar: Theme }) => (
    <svg
        className={svgPauseStyle}
        width="30px"
        height="30px"
        viewBox="0 0 30 30"
    >
        <g fill="none" fillRule="evenodd">
            <circle
                fill={pillarPalette[pillar][400]}
                cx="15"
                cy="15"
                r="15"
            ></circle>
            <path
                d="M9.429 7.286h3.429v15.429h-3.43zm7.286 0h3.429v15.429h-3.43z"
                fill={palette.neutral[100]}
            ></path>
        </g>
    </svg>
);

const PlaySVG = ({ pillar }: { pillar: Theme }) => (
    <svg
        className={svgPlayStyle}
        width="30px"
        height="30px"
        viewBox="0 0 30 30"
    >
        <g fill="none" fillRule="evenodd">
            <circle
                fill={pillarPalette[pillar][400]}
                cx="15"
                cy="15"
                r="15"
            ></circle>
            <path
                fill={palette.neutral[100]}
                d="M10.113 8.571l-.47.366V20.01l.472.347 13.456-5.593v-.598z"
            ></path>
        </g>
    </svg>
);

const buildUrl = (basicUrl: string, shouldUseAcast?: boolean) => {
    return shouldUseAcast
        ? basicUrl.replace('https://', 'https://flex.acast.com/')
        : basicUrl;
};

export const AudioAtom = ({
    id,
    trackUrl,
    kicker,
    title,
    pillar,
    shouldUseAcast,
}: AudioAtomType): JSX.Element => {
    const audioEl = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    // update current time and progress bar position
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [percentPlayed, setPercentPlayed] = useState<number>(0);
    // url
    const [urlToUse, setUrlToUse] = useState<string>(
        buildUrl(trackUrl, shouldUseAcast),
    );

    useEffect(() => {
        const updateCurrentTimeAndPosition = () => {
            const currentTime: number | null =
                audioEl.current && audioEl.current.currentTime;
            const duration: number | null =
                audioEl.current && audioEl.current.duration;
            setPercentPlayed(
                currentTime && duration ? (currentTime / duration) * 100 : 0,
            );
            setCurrentTime(currentTime || 0);
        };

        audioEl.current &&
            audioEl.current.addEventListener(
                'timeupdate',
                updateCurrentTimeAndPosition,
            );

        return () =>
            audioEl.current
                ? audioEl.current.removeEventListener(
                      'timeupdate',
                      updateCurrentTimeAndPosition,
                  )
                : undefined;
    }, [audioEl, setCurrentTime, shouldUseAcast]);

    // update duration time
    const [durationTime, setDurationTime] = useState<number>(0);
    useEffect(() => {
        const updateDurationTime = () =>
            setDurationTime(audioEl.current ? audioEl.current.duration : 0);

        audioEl.current &&
            audioEl.current.addEventListener('loadeddata', updateDurationTime);
        return () =>
            audioEl.current
                ? audioEl.current.removeEventListener(
                      'loadeddata',
                      updateDurationTime,
                  )
                : undefined;
    }, [audioEl, setDurationTime]);

    const updateAudioCurrentTime = (e: MouseEvent<HTMLInputElement>) => {
        if (audioEl.current) {
            const percentagePositionClick =
                (e.nativeEvent.offsetX / e.currentTarget.offsetWidth) * 100;
            // set the currentTime of the audio based on percentagePositionClick
            audioEl.current.currentTime =
                (audioEl.current.duration / 100) * percentagePositionClick;
        }
    };

    // ***************************
    // *     Accessibility       *
    // ***************************
    const progressBarEl = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const rightArrowKeyCode = 39;
        const leftArrowKeyCode = 37;
        const keyListener = (e: KeyboardEvent) => {
            if (
                e.keyCode === rightArrowKeyCode &&
                document.activeElement === progressBarEl.current
            ) {
                if (audioEl.current) audioEl.current.currentTime += 15;
            }

            if (
                e.keyCode === leftArrowKeyCode &&
                document.activeElement === progressBarEl.current
            ) {
                if (audioEl.current) audioEl.current.currentTime -= 15;
            }
        };

        document.addEventListener('keydown', keyListener);
        return () => document.removeEventListener('keydown', keyListener);
    }, [audioEl, progressBarEl]);

    // If Acast is enabled, replace the default url with an ad enabled one
    useEffect(() => {
        setUrlToUse(buildUrl(trackUrl, shouldUseAcast));
    }, [shouldUseAcast]);

    const playAudio = () => {
        setIsPlaying(true);
        audioEl.current && audioEl.current.play();
    };

    const pauseAudio = () => {
        setIsPlaying(false);
        audioEl.current && audioEl.current.pause();
    };

    return (
        <div className={wrapperStyles} data-atom-id={id} data-atom-type="audio">
            <div
                className={css`
                    padding-left: 5px;
                `}
            >
                <span className={kickerStyle(pillar)}>{kicker}</span>
                <h4 className={titleStyle}>{title}</h4>
            </div>
            <div className={audioBodyStyle}>
                <audio
                    className={audioElementStyle}
                    src={urlToUse}
                    ref={audioEl}
                    data-duration={durationTime}
                    data-media-id={id || '_no_ids'}
                    data-title={titleStyle}
                >
                    <p>
                        Sorry your browser does not support audio - but you can
                        download here and listen
                        https://audio.guim.co.uk/2020/05/05-61553-gnl.fw.200505.jf.ch7DW.mp3
                    </p>
                </audio>
                <div className={audioControlsStyle}>
                    <button
                        data-testid={isPlaying ? 'pause-button' : 'play-button'}
                        onClick={() => (isPlaying ? pauseAudio() : playAudio())}
                        className={buttonStyle}
                    >
                        {isPlaying ? (
                            <PauseSVG pillar={pillar} />
                        ) : (
                            <PlaySVG pillar={pillar} />
                        )}
                    </button>
                </div>
                <div className={timingStyle}>
                    <div className={timePlayedStyle}>
                        <span className={timeStyles}>
                            {formatTime(currentTime)}
                        </span>
                    </div>
                    <div className={progressBarStyle}>
                        <input
                            className={progressBarInputStyle(pillar)}
                            ref={progressBarEl}
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={percentPlayed}
                            onClick={updateAudioCurrentTime}
                            readOnly={true}
                        />
                    </div>
                    <div className={timeDurationStyle}>
                        <span className={timeStyles}>
                            {formatTime(durationTime)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
