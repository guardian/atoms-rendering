import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { YoutubeStateChangeEventType } from './types';
import {
    YoutubeAtom,
    onPlayerStateChangeAnalytics,
    youtubePlayerState,
} from './YoutubeAtom';

describe('YoutubeAtom', () => {
    it('should render', () => {
        const atom = (
            <YoutubeAtom
                title="My Youtube video!"
                videoMeta={{
                    assetId: '-ZCvZmYlQD8',
                    mediaTitle: 'YoutubeAtom',
                }}
                eventEmitters={[]}
            />
        );
        const { getByTitle } = render(atom);

        expect(getByTitle('My Youtube video!')).toBeInTheDocument();
    });

    describe('onPlayerStateChangeAnalytics', () => {
        let setHasUserLaunchedPlay;
        let eventEmitters;

        beforeEach(() => {
            jest.useFakeTimers();
            setHasUserLaunchedPlay = jest.fn();
            eventEmitters = [jest.fn()];
        });

        it('should dispatch play (start) event', () => {
            const e = {
                data: youtubePlayerState.PLAYING,
            } as YoutubeStateChangeEventType;

            const getCurrentTime = () => 15;
            const getDuration = () => 100;
            onPlayerStateChangeAnalytics({
                e,
                setHasUserLaunchedPlay,
                eventEmitters,
                player: {
                    getCurrentTime,
                    getDuration,
                    on: () => undefined,
                    off: () => undefined,
                    loadVideoById: () => undefined,
                    playVideo: () => undefined,
                },
            });

            jest.advanceTimersByTime(1000);
            expect(eventEmitters[0]).toHaveBeenCalledTimes(1);
            expect(eventEmitters[0]).toHaveBeenCalledWith('play');
        });

        it('should dispatch end event', () => {
            const e = {
                data: youtubePlayerState.ENDED,
            } as YoutubeStateChangeEventType;

            const getCurrentTime = () => 100;
            const getDuration = () => 100;
            onPlayerStateChangeAnalytics({
                e,
                setHasUserLaunchedPlay,
                eventEmitters,
                player: {
                    getCurrentTime,
                    getDuration,
                    on: () => undefined,
                    off: () => undefined,
                    loadVideoById: () => undefined,
                    playVideo: () => undefined,
                },
            });

            expect(eventEmitters[0]).toHaveBeenCalledWith('end');
        });
    });
});
