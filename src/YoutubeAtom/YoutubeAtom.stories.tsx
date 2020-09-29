import React from 'react';

import { YoutubeAtom } from './YoutubeAtom';
import { Pillar, Display, Design } from '@guardian/types/Format';

export default {
    title: 'YoutubeAtom',
    component: YoutubeAtom,
};

export const DefaultStory = (): JSX.Element => {
    return (
        <YoutubeAtom
            format={{
                pillar: Pillar.News,
                design: Design.Article,
                display: Display.Standard,
            }}
            videoMeta={{
                assetId: '-ZCvZmYlQD8',
                mediaTitle:
                    "Rayshard Brooks says US justice system treats people 'like animals' in interview before his death",
            }}
        />
    );
};
