import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { YoutubeStateChangeEventType } from './types';
import { YoutubeAtom, onPlayerStateChangeAnalytics } from './YoutubeAtom';

describe('YoutubeAtom', () => {
    it('should render', () => {
        const atom = (
            <YoutubeAtom
                title="My Youtube video!"
                videoMeta={{
                    assetId: '-ZCvZmYlQD8',
                    mediaTitle: 'YoutubeAtom',
                }}
            />
        );
        const { getByTitle } = render(atom);

        expect(getByTitle('My Youtube video!')).toBeInTheDocument();
    });
    describe('onPlayerStateChangeAnalytics', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });
        it('should dispatch play event', () => {
            // hasUserLaunchedPlay is used to get "play" event to be launched
            // this is to ensure it is only displayed once
            const e = { data: 1 } as YoutubeStateChangeEventType;
            const hasUserLaunchedPlay = false;
            const setHasUserLaunchedPlay = jest.fn();
            const gaEventEmitter = jest.fn();
            const ophanEventEmitter = jest.fn();

            const getCurrentTime = () => 10;
            const getDuration = () => 100;
            onPlayerStateChangeAnalytics({
                e,
                hasUserLaunchedPlay,
                setHasUserLaunchedPlay,
                gaEventEmitter,
                ophanEventEmitter,
                getCurrentTime,
                getDuration,
            });
            expect(gaEventEmitter).toHaveBeenCalledWith('play');
            expect(ophanEventEmitter).toHaveBeenCalledWith('play');
        });
        it('should dispatch 25% watched event', () => {
            const e = { data: 1 } as YoutubeStateChangeEventType;
            const hasUserLaunchedPlay = true;
            const setHasUserLaunchedPlay = jest.fn();
            const gaEventEmitter = jest.fn();
            const ophanEventEmitter = jest.fn();

            const getCurrentTime = () => 25;
            const getDuration = () => 100;
            onPlayerStateChangeAnalytics({
                e,
                hasUserLaunchedPlay,
                setHasUserLaunchedPlay,
                gaEventEmitter,
                ophanEventEmitter,
                getCurrentTime,
                getDuration,
            });

            jest.advanceTimersByTime(2000);
            expect(gaEventEmitter).toHaveBeenCalledTimes(1);
            expect(gaEventEmitter).toHaveBeenCalledWith('25');
            expect(ophanEventEmitter).toHaveBeenCalledTimes(1);
            expect(ophanEventEmitter).toHaveBeenCalledWith('25');
        });
        it('should dispatch 50% watched event', () => {
            const e = { data: 1 } as YoutubeStateChangeEventType;
            const hasUserLaunchedPlay = true;
            const setHasUserLaunchedPlay = jest.fn();
            const gaEventEmitter = jest.fn();
            const ophanEventEmitter = jest.fn();

            const getCurrentTime = () => 50;
            const getDuration = () => 100;
            onPlayerStateChangeAnalytics({
                e,
                hasUserLaunchedPlay,
                setHasUserLaunchedPlay,
                gaEventEmitter,
                ophanEventEmitter,
                getCurrentTime,
                getDuration,
            });

            jest.advanceTimersByTime(2000);
            expect(gaEventEmitter).toHaveBeenCalledTimes(1);
            expect(gaEventEmitter).toHaveBeenCalledWith('50');
            expect(ophanEventEmitter).toHaveBeenCalledTimes(1);
            expect(ophanEventEmitter).toHaveBeenCalledWith('50');
        });
        it('should dispatch 75% watched event', () => {
            const e = { data: 1 } as YoutubeStateChangeEventType;
            const hasUserLaunchedPlay = true;
            const setHasUserLaunchedPlay = jest.fn();
            const gaEventEmitter = jest.fn();
            const ophanEventEmitter = jest.fn();

            const getCurrentTime = () => 75;
            const getDuration = () => 100;
            onPlayerStateChangeAnalytics({
                e,
                hasUserLaunchedPlay,
                setHasUserLaunchedPlay,
                gaEventEmitter,
                ophanEventEmitter,
                getCurrentTime,
                getDuration,
            });

            jest.advanceTimersByTime(2000);
            expect(gaEventEmitter).toHaveBeenCalledTimes(1);
            expect(gaEventEmitter).toHaveBeenCalledWith('75');
            expect(ophanEventEmitter).toHaveBeenCalledTimes(1);
            expect(ophanEventEmitter).toHaveBeenCalledWith('75');
        });
        it('should dispatch end event', () => {
            // { data: 0 } is used to say video has ended
            const e = { data: 0 } as YoutubeStateChangeEventType;
            const hasUserLaunchedPlay = true;
            const setHasUserLaunchedPlay = jest.fn();
            const gaEventEmitter = jest.fn();
            const ophanEventEmitter = jest.fn();

            const getCurrentTime = () => 100;
            const getDuration = () => 100;
            onPlayerStateChangeAnalytics({
                e,
                hasUserLaunchedPlay,
                setHasUserLaunchedPlay,
                gaEventEmitter,
                ophanEventEmitter,
                getCurrentTime,
                getDuration,
            });
            expect(gaEventEmitter).toHaveBeenCalledWith('end');
            expect(ophanEventEmitter).toHaveBeenCalledWith('end');
        });
    });
});
