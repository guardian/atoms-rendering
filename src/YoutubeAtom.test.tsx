import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { YoutubeAtom } from './YoutubeAtom';

describe('YoutubeAtom', () => {
    it('should render', async () => {
        const atom = (
            <YoutubeAtom
                title="My Youtube video!"
                assetId="-ZCvZmYlQD8"
                alt=""
                role="inline"
                eventEmitters={[]}
                pillar={0}
            />
        );
        const { findByTitle } = render(atom);

        const iframe = await findByTitle('My Youtube video!');
        expect(iframe).toBeInTheDocument();
    });

    it('should render an iframe with ad targeting', async () => {
        const atom = (
            <YoutubeAtom
                title="My Youtube video!"
                assetId="-ZCvZmYlQD8"
                alt=""
                role="inline"
                eventEmitters={[]}
                pillar={0}
                adTargetingBuilder={() =>
                    Promise.resolve({
                        adTagParameters: {
                            iu: 'someAdUnit',
                            cust_params: 'something',
                        },
                    })
                }
            />
        );
        const { findByTitle } = render(atom);

        const iframe = (await findByTitle(
            'My Youtube video!',
        )) as HTMLIFrameElement;
        expect(
            iframe.src.includes(
                '{%22adsConfig%22:{%22adTagParameters%22:{%22iu%22:%22someAdUnit%22,%22cust_params%22:%22something%22}}}',
            ),
        ).toBe(true);
        expect(iframe).toBeInTheDocument();
    });
});
