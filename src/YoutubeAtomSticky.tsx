import React, { useEffect, useState } from 'react';
import type { VideoEventKey } from './types';
import { log } from '@guardian/libs';
import { useIsInView } from './lib/useIsInView';
import { from, neutral } from '@guardian/source-foundations';
import { css } from '@emotion/react';
import { SvgCross } from '@guardian/source-react-components';

const buttonStyles = css`
    position: absolute;
    left: -36px;
    top: 0;
    z-index: 22;
    background-color: ${neutral[7]};
    height: 32px;
    width: 32px;
    border-radius: 50%;
    border: 0;
    padding: 0;
    cursor: pointer;
    display: none;
    justify-content: center;
    align-items: center;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.15);
    }

    svg {
        fill: ${neutral[100]};
    }
`;

/**
 * This extended hover area allows users to click the close video button more easily
 */
const hoverAreaStyles = css`
    position: absolute;
    top: -4px;
    bottom: 0;
    left: -${32 * 1.15}px;
    width: ${32 * 1.15}px;

    &:hover button {
        display: flex;
    }
`;

const stickyStyles = css`
    @keyframes fade-in-up {
        from {
            transform: translateY(100%);
            opacity: 0;
        }

        to {
            transform: translateY(0%);
            opacity: 1;
        }
    }

    position: fixed;
    bottom: 20px;
    width: 216px;
    z-index: 21;
    animation: fade-in-up 1s ease both;

    &:hover button {
        display: flex;
    }

    ${from.tablet} {
        width: 300px;
    }

    figcaption {
        display: none;
    }
`;

const stickyContainerStyles = (height: number) => css`
    height: ${height}px;
    position: relative;
    display: flex;
    justify-content: flex-end;

    ${from.tablet} {
        height: ${height * 2}px;
    }
`;

type Props = {
    assetId: string;
    eventEmitters: ((event: VideoEventKey) => void)[];
    shouldStick: boolean;
    onStopVideo: () => void;
    isPlaying: boolean;
    children: JSX.Element;
};

export const YoutubeAtomSticky = ({
    assetId,
    eventEmitters,
    shouldStick,
    onStopVideo,
    isPlaying,
    children,
}: Props): JSX.Element => {
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const [stickEventSent, setStickEventSent] = useState<boolean>(false);

    const [isIntersecting, setRef] = useIsInView({
        threshold: 0.5,
        repeat: true,
        debounce: true,
    });

    /**
     * Click handler for the sticky video close button
     */
    const handleCloseClick = () => {
        // unstick the video
        setIsSticky(false);
        // reset the sticky event sender
        setStickEventSent(false);
        // stop the video
        onStopVideo();
        // emit a 'close' event
        log('dotcom', {
            from: `YoutubeAtom handleCloseClick`,
            videoId: assetId,
            msg: 'Close',
        });
        eventEmitters.forEach((eventEmitter) => eventEmitter('close'));
    };

    /**
     * keydown event handler
     *
     * closes sticky video when Escape key is pressed
     */
    const handleKeydown = (e: { key: string }) => {
        if (e.key === 'Escape') {
            handleCloseClick();
        }
    };

    /**
     * useEffect to create keydown listener
     */
    useEffect(() => {
        console.log('here');
        document.addEventListener('keydown', handleKeydown);

        return () => document.removeEventListener('keydown', handleKeydown);
    }, []);

    /**
     * useEffect for the sticky state
     */
    useEffect(() => {
        if (shouldStick) setIsSticky(isPlaying && !isIntersecting);
    }, [isIntersecting, isPlaying, shouldStick]);

    /**
     * useEffect for the stick events
     */
    useEffect(() => {
        if (isSticky && !stickEventSent) {
            setStickEventSent(true);

            log('dotcom', {
                from: 'YoutubeAtom stick useEffect',
                videoId: assetId,
                msg: 'Stick',
            });
            eventEmitters.forEach((eventEmitter) => eventEmitter('stick'));
        }
    }, [isSticky, stickEventSent, assetId, eventEmitters]);

    return (
        <div ref={setRef} css={isSticky && stickyContainerStyles(192)}>
            <div css={isSticky && stickyStyles}>
                {children}
                {isSticky && (
                    <>
                        <span css={hoverAreaStyles} />
                        <button css={buttonStyles} onClick={handleCloseClick}>
                            <SvgCross size="medium" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
