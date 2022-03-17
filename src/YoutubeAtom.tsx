import React, { useCallback, useEffect, useState } from 'react';
import { MaintainAspectRatio } from './common/MaintainAspectRatio';
import { YoutubeAtomPlayer } from './YoutubeAtomPlayer';
import { YoutubeAtomOverlay } from './YoutubeAtomOverlay';
import { YoutubeAtomPlaceholder } from './YoutubeAtomPlaceholder';
import type {
    AdTargeting,
    ImageSource,
    RoleType,
    VideoEventKey,
    YoutubePlayerType,
} from './types';
import type { ArticleTheme } from '@guardian/libs';
import type { ConsentState } from '@guardian/consent-management-platform/dist/types';
import { useIsInView } from './lib/useIsInView';
import { from, neutral } from '@guardian/source-foundations';
import { css } from '@emotion/react';
import { SvgCross } from '@guardian/source-react-components';

type Props = {
    assetId: string;
    overrideImage?: ImageSource[];
    posterImage?: ImageSource[];
    adTargeting?: AdTargeting;
    consentState?: ConsentState;
    height?: number;
    width?: number;
    title?: string;
    alt: string;
    role: RoleType;
    duration?: number; // in seconds
    origin?: string;
    eventEmitters: ((event: VideoEventKey) => void)[];
    pillar: ArticleTheme;
    sticky?: boolean;
};

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

// This extended hover area allows users
// to click the close video button more easily
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

export const YoutubeAtom = ({
    assetId,
    overrideImage,
    posterImage,
    adTargeting,
    consentState,
    height = 259,
    width = 460,
    alt,
    role,
    title,
    duration,
    origin,
    eventEmitters,
    pillar,
    sticky,
}: Props): JSX.Element => {
    const [overlayClicked, setOverlayClicked] = useState<boolean>(false);
    const [playerReady, setPlayerReady] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isSticky, setIsSticky] = useState(false);
    const [stickEventAlreadySent, setStickEventAlreadySent] = useState(false);
    const [playerRef, setPlayerRef] = useState<YoutubePlayerType>();

    const [isIntersecting, setRef] = useIsInView({
        threshold: 0.5,
        repeat: true,
    });

    const handleCloseClick = () => {
        // unstick the video
        setIsSticky(false);

        // reset the sticky event sender
        setStickEventAlreadySent(false);

        // stop the video
        playerRef?.stopVideo();

        // emit a 'closed' event
        eventEmitters.forEach((eventEmitter) => eventEmitter('closed'));
    };

    useEffect(() => {
        // if the video is playing and not on screen stick it
        setIsSticky(!!sticky && isPlaying && !isIntersecting);
    }, [isIntersecting, isPlaying, sticky]);

    useEffect(() => {
        if (isSticky && !stickEventAlreadySent) {
            // emit a 'stick' event
            eventEmitters.forEach((eventEmitter) => eventEmitter('stick'));
            // set this flag so stick events aren't set
            // again until it's reset
            setStickEventAlreadySent(true);
        }
    }, [isSticky, stickEventAlreadySent]);

    const hasOverlay = !!(overrideImage || posterImage);

    /**
     * Show an overlay if:
     *
     * - It exists
     *
     * AND
     *
     * - It hasn't been clicked
     */
    const showOverlay = hasOverlay && !overlayClicked;

    /**
     * Show a placeholder if:
     *
     * - We don't have an overlay OR the user has clicked the overlay
     *
     * AND
     *
     * - The player is not ready
     */
    const showPlaceholder = (!hasOverlay || overlayClicked) && !playerReady;

    let loadPlayer;
    if (!hasOverlay) {
        // load the player if there is no overlay
        loadPlayer = true;
    } else if (overlayClicked) {
        // load the player if the overlay has been clicked
        loadPlayer = true;
    } else {
        loadPlayer = false;
    }

    const videoState = (trackingEvent: string) => {
        switch (trackingEvent) {
            case 'play':
            case 'resume':
                return setIsPlaying(true);
            case 'cued':
            case 'end':
            case 'paused':
                return setIsPlaying(false);
        }
    };

    /**
     * Create a stable callback as it will be a useEffect dependency in YoutubeAtomPlayer
     */
    const playerReadyCallback = useCallback((player) => {
        if (player.current) {
            setPlayerRef(player.current);
            setPlayerReady(true);
        }
    }, []);

    return (
        <div ref={setRef} css={isSticky && stickyContainerStyles(192)}>
            <div css={isSticky && stickyStyles}>
                <span css={hoverAreaStyles} />
                {isSticky && (
                    <button css={buttonStyles} onClick={handleCloseClick}>
                        <SvgCross size="medium" />
                    </button>
                )}
                <MaintainAspectRatio height={height} width={width}>
                    {loadPlayer && consentState && (
                        <YoutubeAtomPlayer
                            videoId={assetId}
                            overrideImage={overrideImage}
                            posterImage={posterImage}
                            adTargeting={adTargeting}
                            consentState={consentState}
                            height={height}
                            width={width}
                            title={title}
                            origin={origin}
                            eventEmitters={[videoState, ...eventEmitters]}
                            /**
                             * If there is an overlay we want to autoplay
                             * If there is not an overlay the user will use the YouTube player UI to play
                             */
                            autoPlay={hasOverlay}
                            onReady={playerReadyCallback}
                        />
                    )}
                    {showOverlay && (
                        <YoutubeAtomOverlay
                            videoId={assetId}
                            overrideImage={overrideImage}
                            posterImage={posterImage}
                            height={height}
                            width={width}
                            alt={alt}
                            role={role}
                            duration={duration}
                            pillar={pillar}
                            onClick={() => setOverlayClicked(true)}
                        />
                    )}
                    {showPlaceholder && (
                        <YoutubeAtomPlaceholder videoId={assetId} />
                    )}
                </MaintainAspectRatio>
            </div>
        </div>
    );
};
