import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { YoutubeStateChangeEventType } from './types';
import {
    YoutubeAtom,
    onPlayerStateChangeAnalytics,
    youtubePlayerState,
    initSharedYTData,
    sharedYTData,
} from './YoutubeAtom';

const assetId = '-ZCvZmYlQD8';
describe('YoutubeAtom', () => {
    beforeAll(() => {
        sharedYTData[assetId] = initSharedYTData;
    });

    it('should render', () => {
        const atom = (
            <YoutubeAtom
                title="My Youtube video!"
                videoMeta={{
                    assetId,
                    mediaTitle: 'YoutubeAtom',
                }}
                eventEmitters={[]}
            />
        );
        const { getByTitle } = render(atom);

        expect(getByTitle('My Youtube video!')).toBeInTheDocument();
    });

    describe('onPlayerStateChangeAnalytics', () => {
        let eventEmitters;

        beforeEach(() => {
            jest.useFakeTimers();
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
                eventEmitters,
                player: {
                    getCurrentTime,
                    getDuration,
                    on: () => undefined,
                    off: () => undefined,
                    loadVideoById: () => undefined,
                    playVideo: () => undefined,
                },
                assetId,
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
                eventEmitters,
                player: {
                    getCurrentTime,
                    getDuration,
                    on: () => undefined,
                    off: () => undefined,
                    loadVideoById: () => undefined,
                    playVideo: () => undefined,
                },
                assetId,
            });

            expect(eventEmitters[0]).toHaveBeenCalledWith('end');
        });
    });
});
