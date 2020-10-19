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

export const OverlayStory = (): JSX.Element => {
    return (
        <YoutubeAtom
            overlayImage={
                'https://i.guim.co.uk/img/media/4b3808707ec341629932a9d443ff5a812cf4df14/0_309_1800_1081/master/1800.jpg?width=700&quality=85&auto=format&fit=max&s=afebec1662ceabf6a65889ba386d8b7d'
            }
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
