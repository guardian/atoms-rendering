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
                adTargeting={{
                    disableAds: false,
                    adUnit: 'someAdUnit',
                    customParams: {
                        param1: 'param1',
                        param2: 'param2',
                    },
                }}
                consentState={{
                    aus: {
                        personalisedAdvertising: true,
                    },
                }}
            />
        );
        const { findByTitle } = render(atom);

        const iframe = (await findByTitle(
            'My Youtube video!',
        )) as HTMLIFrameElement;

        expect(iframe).toBeInTheDocument();
        const expectedPartialEmbedStrings = [
            // assert cust_params value is double uriComponent encoded e.g. % => %25
            // as per existing Frontend behaviour
            '%22cust_params%22%3A%22param1%253Dparam1%2526param2%253Dparam2',
            // encoded consent state
            '%22restrictedDataProcessor%22%3Afalse',
        ];
        expectedPartialEmbedStrings.forEach((expectedPartialEmbedString) =>
            expect(iframe.src.includes(expectedPartialEmbedString)).toBe(true),
        );
    });
});
