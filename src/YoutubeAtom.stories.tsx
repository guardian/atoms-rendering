import React from 'react';
import { css } from 'emotion';

import { YoutubeAtom } from './YoutubeAtom';

export default {
    title: 'YoutubeAtom',
    component: YoutubeAtom,
};

export const DefaultStory = (): JSX.Element => {
    return (
        <div
            className={css`
                width: 800px;
                margin: 25px;
            `}
        >
            <YoutubeAtom
                videoMeta={{
                    assetId: '-ZCvZmYlQD8',
                    mediaTitle:
                        "Rayshard Brooks says US justice system treats people 'like animals' in interview before his death",
                }}
                eventEmitters={[]}
                duration={252}
            />
        </div>
    );
};

export const WithOverlayImage = (): JSX.Element => {
    return (
        <div
            className={css`
                width: 800px;
                margin: 25px;
            `}
        >
            <YoutubeAtom
                videoMeta={{
                    assetId: '3jpXAMwRSu4',
                    mediaTitle:
                        "Rayshard Brooks says US justice system treats people 'like animals' in interview before his death",
                }}
                eventEmitters={[]}
                duration={252}
                overlayImage={{
                    src:
                        'https://i.guim.co.uk/img/media/4b3808707ec341629932a9d443ff5a812cf4df14/0_309_1800_1081/master/1800.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=aff4b8255693eb449f13070df88e9cac',
                    alt: 'Microscopic image of COVID',
                }}
            />
        </div>
    );
};
