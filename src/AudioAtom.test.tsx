import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';

import { Pillar } from '@guardian/types';

import { AudioAtom } from './AudioAtom';

const title = 'Q&A and Detective Wilson';
describe('AudioAtom', () => {
    it('should render', () => {
        const playStub = jest.fn();
        const pauseStub = jest.fn();
        window.HTMLMediaElement.prototype.play = playStub;
        window.HTMLMediaElement.prototype.pause = pauseStub;
        const { getByText } = render(
            <AudioAtom
                id="d6d509cf-ca10-407f-8913-e16a3712f415"
                trackUrl="https://audio.guim.co.uk/2020/05/05-61553-gnl.fw.200505.jf.ch7DW.mp3"
                kicker="Football Weekly Extra Extra"
                title={title}
                pillar={Pillar.Sport}
            />,
        );
        expect(getByText(title)).toBeInTheDocument();
    });
    it('should have play/pause function called', () => {
        const playStub = jest.fn();
        const pauseStub = jest.fn();
        window.HTMLMediaElement.prototype.play = playStub;
        window.HTMLMediaElement.prototype.pause = pauseStub;

        const { rerender } = render(
            <AudioAtom
                id="d6d509cf-ca10-407f-8913-e16a3712f415"
                trackUrl="https://audio.guim.co.uk/2020/05/05-61553-gnl.fw.200505.jf.ch7DW.mp3"
                kicker="Football Weekly Extra Extra"
                title={title}
                pillar={Pillar.Sport}
            />,
        );

        const playButton = screen.getByTestId('play-button');
        fireEvent.click(playButton);
        rerender(
            <AudioAtom
                id="d6d509cf-ca10-407f-8913-e16a3712f415"
                trackUrl="https://audio.guim.co.uk/2020/05/05-61553-gnl.fw.200505.jf.ch7DW.mp3"
                kicker="Football Weekly Extra Extra"
                title={title}
                pillar={Pillar.Sport}
            />,
        );
        expect(playStub).toHaveBeenCalled();

        const pauseButton = screen.getByTestId('pause-button');
        fireEvent.click(pauseButton);
        rerender(
            <AudioAtom
                id="d6d509cf-ca10-407f-8913-e16a3712f415"
                trackUrl="https://audio.guim.co.uk/2020/05/05-61553-gnl.fw.200505.jf.ch7DW.mp3"
                kicker="Football Weekly Extra Extra"
                title={title}
                pillar={Pillar.Sport}
            />,
        );
        expect(pauseStub).toHaveBeenCalled();
    });
});
