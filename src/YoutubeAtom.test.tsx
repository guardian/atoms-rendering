import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { YoutubeAtom } from './YoutubeAtom';

const disabledAdsEmbedConfig =
    'embed_config=%7B%22adsConfig%22%3A%7B%22disableAds%22%3Atrue%7D%7D';

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

    it.each([
        {
            msg:
                'should render an iframe with ads disabled when passed no ad targeting',
            adTargeting: undefined,
            consentState: undefined,
            expectedPartialEmbedStrings: [disabledAdsEmbedConfig],
        },
        {
            msg:
                'should render an iframe with ads disabled when passed ad targeting with disabledAds flag true',
            adTargeting: {
                disableAds: true,
                adUnit: 'someAdUnit',
                customParams: {
                    param1: 'param1',
                    param2: 'param2',
                },
            },
            consentState: undefined,
            expectedPartialEmbedStrings: [disabledAdsEmbedConfig],
        },
        {
            msg:
                'should render an iframe with ads disabled when passed ad targeting but no consent state',
            adTargeting: {
                disableAds: false,
                adUnit: 'someAdUnit',
                customParams: {
                    param1: 'param1',
                    param2: 'param2',
                },
            },
            consentState: undefined,
            expectedPartialEmbedStrings: [disabledAdsEmbedConfig],
        },
        {
            msg:
                'should render an iframe with ad targeting when passed ad targeting and consent state',
            adTargeting: {
                disableAds: false,
                adUnit: 'someAdUnit',
                customParams: {
                    param1: 'param1',
                    param2: 'param2',
                },
            },
            consentState: {
                aus: {
                    personalisedAdvertising: true,
                },
            },
            expectedPartialEmbedStrings: [
                // assert cust_params value is double uriComponent encoded e.g. % => %25
                // as per existing Frontend behaviour
                '%22cust_params%22%3A%22param1%253Dparam1%2526param2%253Dparam2',
                // encoded consent state
                '%22restrictedDataProcessor%22%3Afalse',
            ],
        },
    ])(
        '$msg',
        async ({ adTargeting, consentState, expectedPartialEmbedStrings }) => {
            const atom = (
                <YoutubeAtom
                    title="My Youtube video!"
                    assetId="-ZCvZmYlQD8"
                    alt=""
                    role="inline"
                    eventEmitters={[]}
                    pillar={0}
                    adTargeting={adTargeting}
                    consentState={consentState}
                />
            );
            const { findByTitle } = render(atom);

            const iframe = (await findByTitle(
                'My Youtube video!',
            )) as HTMLIFrameElement;
            expect(iframe).toBeInTheDocument();
            expectedPartialEmbedStrings.forEach((expectedPartialEmbedString) =>
                expect(iframe.src.includes(expectedPartialEmbedString)).toBe(
                    true,
                ),
            );
        },
    );
});
