import React from 'react';
import { css } from 'emotion';

import { AudioAtom } from './AudioAtom';
import { Pillar } from '@guardian/types/Format';

export default {
    title: 'AudioAtom',
    component: AudioAtom,
};

export const DefaultStory = (): JSX.Element => {
    return (
        <div
            className={css`
                width: 700px;
                padding: 15px;
            `}
        >
            <AudioAtom
                id="d6d509cf-ca10-407f-8913-e16a3712f415"
                trackUrl="https://audio.guim.co.uk/2020/05/05-61553-gnl.fw.200505.jf.ch7DW.mp3"
                kicker="Football Weekly Extra Extra"
                title="Q&A and Detective Wilson"
                pillar={Pillar.Sport}
            />
        </div>
    );
};
