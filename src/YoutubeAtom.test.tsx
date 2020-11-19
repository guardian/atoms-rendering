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
        it('should dispatch 25% watched event', () => {
            const e = { data: 1 } as YoutubeStateChangeEventType;

            const getCurrentTime = () => 25;
            const getDuration = () => 100;
            onPlayerStateChangeAnalytics({
                e,
                setHasUserLaunchedPlay,
                eventEmitters,
                // @ts-ignore
                player: {
                    getCurrentTime,
                    getDuration,
                },
            });

            jest.advanceTimersByTime(2000);
            expect(eventEmitters[0]).toHaveBeenCalledTimes(1);
            expect(eventEmitters[0]).toHaveBeenCalledWith('25');
        });
        it('should dispatch 50% watched event', () => {
            const e = { data: 1 } as YoutubeStateChangeEventType;

            const getCurrentTime = () => 50;
            const getDuration = () => 100;
            onPlayerStateChangeAnalytics({
                e,
                setHasUserLaunchedPlay,
                eventEmitters,
                // @ts-ignore
                player: {
                    getCurrentTime,
                    getDuration,
                },
            });

            jest.advanceTimersByTime(2000);
            expect(eventEmitters[0]).toHaveBeenCalledTimes(1);
            expect(eventEmitters[0]).toHaveBeenCalledWith('50');
        });
        it('should dispatch 75% watched event', () => {
            const e = { data: 1 } as YoutubeStateChangeEventType;

            const getCurrentTime = () => 75;
            const getDuration = () => 100;
            onPlayerStateChangeAnalytics({
                e,
                setHasUserLaunchedPlay,
                eventEmitters,
                // @ts-ignore
                player: {
                    getCurrentTime,
                    getDuration,
                },
            });

            jest.advanceTimersByTime(2000);
            expect(eventEmitters[0]).toHaveBeenCalledTimes(1);
            expect(eventEmitters[0]).toHaveBeenCalledWith('75');
        });
        it('should dispatch end event', () => {
            // { data: 0 } is used to say video has ended
            const e = { data: 0 } as YoutubeStateChangeEventType;

            const getCurrentTime = () => 100;
            const getDuration = () => 100;
            onPlayerStateChangeAnalytics({
                e,
                setHasUserLaunchedPlay,
                eventEmitters,
                // @ts-ignore
                player: {
                    getCurrentTime,
                    getDuration,
                },
            });
            expect(eventEmitters[0]).toHaveBeenCalledWith('end');
        });
    });
});
