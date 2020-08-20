import React from 'react';

import { MediaAtom } from './MediaAtom';
import { Pillar, Display, Design } from '@guardian/types/Format';

export default {
    title: 'MediaAtom',
    component: MediaAtom,
};

export const DefaultStory = (): JSX.Element => {
    return (
        <MediaAtom
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
