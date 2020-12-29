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
                alt=""
                role="inline"
                eventEmitters={[
                    (e) => console.log(`analytics event ${e} called`),
                ]}
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
                alt="Microscopic image of COVID"
                role="inline"
                eventEmitters={[
                    (e) => console.log(`analytics event ${e} called`),
                ]}
                duration={252}
                overlayImage={[
                    {
                        srcSet: [
                            {
                                width: 500,
                                src:
                                    'https://i.guim.co.uk/img/media/4b3808707ec341629932a9d443ff5a812cf4df14/0_309_1800_1081/master/1800.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=aff4b8255693eb449f13070df88e9cac',
                            },
                        ],
                    },
                ]}
            />
        </div>
    );
};

export const WithPosterImage = (): JSX.Element => {
    return (
        <div
            className={css`
                width: 800px;
                margin: 25px;
            `}
        >
            <YoutubeAtom
                videoMeta={{
                    assetId: 'N9Cgy-ke5-s',
                    mediaTitle:
                        'Broken promises and alternative facts: how Donald Trump failed Ohio – video ',
                }}
                alt=""
                role="inline"
                eventEmitters={[
                    (e) => console.log(`analytics event ${e} called`),
                ]}
                duration={252}
                posterImage={[
                    {
                        srcSet: [
                            {
                                src:
                                    'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/1000.jpg',
                                width: 1000,
                            },
                            {
                                src:
                                    'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/500.jpg',
                                width: 500,
                            },
                            {
                                src:
                                    'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/140.jpg',
                                width: 140,
                            },
                            {
                                src:
                                    'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/1920.jpg',
                                width: 1920,
                            },
                        ],
                    },
                ]}
            />
        </div>
    );
};

export const WithOverlayAndPosterImage = (): JSX.Element => {
    return (
        <div
            className={css`
                width: 800px;
                margin: 25px;
            `}
        >
            <YoutubeAtom
                videoMeta={{
                    assetId: 'N9Cgy-ke5-s',
                    mediaTitle:
                        'Broken promises and alternative facts: how Donald Trump failed Ohio – video ',
                }}
                alt=""
                role="inline"
                eventEmitters={[
                    (e) => console.log(`analytics event ${e} called`),
                ]}
                duration={252}
                overlayImage={[
                    {
                        srcSet: [
                            {
                                src:
                                    'https://i.guim.co.uk/img/media/4b3808707ec341629932a9d443ff5a812cf4df14/0_309_1800_1081/master/1800.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=aff4b8255693eb449f13070df88e9cac',
                                width: 1000,
                            },
                        ],
                    },
                ]}
                posterImage={[
                    {
                        srcSet: [
                            {
                                src:
                                    'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/1000.jpg',
                                width: 1000,
                            },
                            {
                                src:
                                    'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/500.jpg',
                                width: 500,
                            },
                            {
                                src:
                                    'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/140.jpg',
                                width: 140,
                            },
                            {
                                src:
                                    'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/1920.jpg',
                                width: 1920,
                            },
                        ],
                    },
                ]}
            />
        </div>
    );
};
