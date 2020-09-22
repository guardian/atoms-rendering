import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { AudioAtom } from './AudioAtom';

describe('AudioAtom', () => {
    it('should render', () => {
        const { getByText } = render(
            <AudioAtom
                id="d6d509cf-ca10-407f-8913-e16a3712f415"
                trackUrl="https://audio.guim.co.uk/2020/05/05-61553-gnl.fw.200505.jf.ch7DW.mp3"
                kicker="Football Weekly Extra Extra"
                title="Q&A and Detective Wilson"
            />,
        );

        // TODO:
        // expect(getByText('AudioAtom')).toBeInTheDocument();
    });
});
