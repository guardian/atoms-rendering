import React from 'react';
import { css } from 'emotion';

import { VideoAtom } from './VideoAtom';

export default {
    title: 'VideoAtom',
    component: VideoAtom,
    parameters: {
        // Allow a bit of time for the video to appear
        chromatic: { delay: 2000 },
    },
};

export const DefaultStory = (): JSX.Element => {
    return (
        <div
            className={css`
                width: 800px;
                margin: 25px;
            `}
        >
            <VideoAtom
                poster="https://media.guim.co.uk/29638c3179baea589b10fbd4dbbc223ea77027ae/0_0_3589_2018/master/3589.jpg"
                sources={[
                    {
                        src:
                            'https://uploads.guim.co.uk/2020%2F23%2F04%2Ffor+testing+purposes+only--ef8e62ab-bc06-4892-8da1-65a7e5bacb77-1.mp4',
                        type: 'video/mp4',
                    },
                ]}
            />
        </div>
    );
};

export const LargeStory = (): JSX.Element => {
    return (
        <div
            className={css`
                width: 800px;
                margin: 25px;
            `}
        >
            <VideoAtom
                poster="https://media.guim.co.uk/29638c3179baea589b10fbd4dbbc223ea77027ae/0_0_3589_2018/master/3589.jpg"
                sources={[
                    {
                        src:
                            'https://uploads.guim.co.uk/2020%2F23%2F04%2Ffor+testing+purposes+only--ef8e62ab-bc06-4892-8da1-65a7e5bacb77-1.mp4',
                        type: 'video/mp4',
                    },
                ]}
                height={500}
                width={880}
            />
        </div>
    );
};

export const NoPosterStory = (): JSX.Element => {
    return (
        <div
            className={css`
                width: 800px;
                margin: 25px;
            `}
        >
            <VideoAtom
                sources={[
                    {
                        src:
                            'https://uploads.guim.co.uk/2020%2F23%2F04%2Ffor+testing+purposes+only--ef8e62ab-bc06-4892-8da1-65a7e5bacb77-1.mp4',
                        type: 'video/mp4',
                    },
                ]}
            />
        </div>
    );
};
