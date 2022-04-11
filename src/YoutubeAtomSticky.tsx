import React, { useEffect, useState } from 'react';
import type { VideoEventKey } from './types';
import { log } from '@guardian/libs';
import { useIsInView } from './lib/useIsInView';
import { from, neutral, space } from '@guardian/source-foundations';
import { css } from '@emotion/react';
import { SvgCross } from '@guardian/source-react-components';
import { submitComponentEvent } from './lib/ophan';

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
const hoverAreaStyles = (fullOverlay: boolean) => {
    const hoverAreaWidth = 37;

    return css`
        position: absolute;
        top: -4px;
        bottom: 0;
        left: -${hoverAreaWidth}px;
        width: ${hoverAreaWidth}px;

        &:hover button {
            display: flex;
        }

        @media only screen {
            width: ${fullOverlay
                ? `calc(100% + ${hoverAreaWidth}px)`
                : `${hoverAreaWidth}px`};
        }
    `;
};

const stickyStyles = (fullOverlay: boolean) => css`
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

    @media only screen {
        button {
            display: ${fullOverlay ? 'none' : 'flex'};
        }
    }
`;

const stickyContainerStyles = (isMainMedia?: boolean) => {
    return css`
        height: 192px;
        position: relative;
        display: flex;
        justify-content: flex-end;
        padding-right: ${isMainMedia ? `${space[5]}px` : 0};

        ${from.phablet} {
            height: 349px;
        }
    `;
};

type Props = {
    videoId: string;
    eventEmitters: ((event: VideoEventKey) => void)[];
    shouldStick?: boolean;
    onStopVideo: () => void;
    isPlaying: boolean;
    isMainMedia?: boolean;
    uniqueId?: string;
    children: JSX.Element;
};

export const YoutubeAtomSticky = ({
    videoId,
    eventEmitters,
    shouldStick,
    onStopVideo,
    isPlaying,
    isMainMedia,
    children,
}: Props): JSX.Element => {
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const [stickEventSent, setStickEventSent] = useState<boolean>(false);
    const [fullWidthOverlay, setFullWidthOverlay] = useState(true);

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

        setFullWidthOverlay(true);

        // log a 'close' event
        log('dotcom', {
            from: `YoutubeAtom handleCloseClick`,
            videoId,
            msg: 'Close',
        });

        // submit a 'close' event to Ophan
        submitComponentEvent({
            component: {
                componentType: 'STICKY_VIDEO',
                id: videoId,
            },
            action: 'CLOSE',
        });
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
        window.addEventListener('keydown', handleKeydown);

        return () => window.removeEventListener('keydown', handleKeydown);
    }, []);

    /**
     * useEffect to add a full width overlay when sticky
     *
     * This is used to show the close button on touchscreen devices
     */
    useEffect(() => {
        if (isSticky) {
            setFullWidthOverlay(true);
        }
    }, [isSticky]);

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
                videoId,
                msg: 'Stick',
            });

            submitComponentEvent({
                component: {
                    componentType: 'STICKY_VIDEO',
                    id: videoId,
                },
                action: 'STICK',
            });
        }
    }, [isSticky, stickEventSent, videoId, eventEmitters]);

    return (
        <div ref={setRef} css={isSticky && stickyContainerStyles(isMainMedia)}>
            <div css={isSticky && stickyStyles(fullWidthOverlay)}>
                {children}
                {isSticky && (
                    <>
                        <span
                            css={hoverAreaStyles(fullWidthOverlay)}
                            onClick={() => setFullWidthOverlay(false)}
                        />
                        <button css={buttonStyles} onClick={handleCloseClick}>
                            <SvgCross size="medium" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
