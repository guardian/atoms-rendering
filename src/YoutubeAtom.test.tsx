import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { YoutubeAtom } from './YoutubeAtom';
import { AdTargeting } from './types';

const disabledAdsEmbedConfig =
    'embed_config=%7B%22adsConfig%22%3A%7B%22disableAds%22%3Atrue%7D%7D';

const overlayImage = [
    {
        srcSet: [
            {
                width: 500,
                src:
                    'https://i.guim.co.uk/img/media/4b3808707ec341629932a9d443ff5a812cf4df14/0_309_1800_1081/master/1800.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=aff4b8255693eb449f13070df88e9cac',
            },
        ],
    },
];

describe('YoutubeAtom', () => {
    it('should directly render the youtube iframe if no overlay provided', async () => {
        const atom = (
            <YoutubeAtom
                title="My Youtube video!"
                assetId="-ZCvZmYlQD8"
                alt=""
                role="inline"
                eventEmitters={[]}
                consentState={{}}
                pillar={0}
            />
        );
        const { findByTitle } = render(atom);

        const iframe = await findByTitle('My Youtube video!');
        expect(iframe).toBeInTheDocument();
    });

    it('should not render the youtube iframe if no consent state is given', async () => {
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
        const { queryByTitle } = render(atom);

        const iframe = (await queryByTitle(
            'My Youtube video!',
        )) as HTMLIFrameElement;
        expect(iframe).not.toBeInTheDocument();
    });

    it('should not render the youtube iframe if an overlay is provided', async () => {
        const atom = (
            <YoutubeAtom
                title="My Youtube video!"
                assetId="-ZCvZmYlQD8"
                alt=""
                role="inline"
                eventEmitters={[]}
                consentState={{}}
                pillar={0}
                posterImage={overlayImage}
            />
        );
        const { queryByTitle } = render(atom);

        const iframe = queryByTitle('My Youtube video!');
        expect(iframe).not.toBeInTheDocument();
    });

    it('should show a placeholder if both overlay and consent are missing', async () => {
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
        const { queryByTitle, getByTestId } = render(atom);

        const iframe = queryByTitle('My Youtube video!');
        expect(iframe).not.toBeInTheDocument();
        const placeholder = getByTestId('placeholder');
        expect(placeholder).toBeInTheDocument();
    });

    it('should render an iframe with ads disabled when passed no ad targeting', async () => {
        const atom = (
            <YoutubeAtom
                title="My Youtube video!"
                assetId="-ZCvZmYlQD8"
                alt=""
                role="inline"
                consentState={{}}
                eventEmitters={[]}
                pillar={0}
            />
        );
        const { findByTitle } = render(atom);

        const iframe = (await findByTitle(
            'My Youtube video!',
        )) as HTMLIFrameElement;
        expect(iframe).toBeInTheDocument();
        expect(iframe.src.includes(disabledAdsEmbedConfig)).toBe(true);
    });

    it('should render an iframe with ads disabled when passed ad targeting with disabledAds flag true', async () => {
        const atom = (
            <YoutubeAtom
                title="My Youtube video!"
                assetId="-ZCvZmYlQD8"
                alt=""
                role="inline"
                eventEmitters={[]}
                pillar={0}
                consentState={{}}
                adTargeting={
                    {
                        disableAds: true,
                        adUnit: 'someAdUnit',
                        customParams: {
                            param1: 'param1',
                            param2: 'param2',
                        },
                    } as AdTargeting
                }
            />
        );
        const { findByTitle } = render(atom);

        const iframe = (await findByTitle(
            'My Youtube video!',
        )) as HTMLIFrameElement;
        expect(iframe).toBeInTheDocument();
        expect(iframe.src.includes(disabledAdsEmbedConfig)).toBe(true);
    });

    it('should render an iframe with ad targeting when passed ad targeting and consent state', async () => {
        const atom = (
            <YoutubeAtom
                title="My Youtube video!"
                assetId="-ZCvZmYlQD8"
                alt=""
                role="inline"
                eventEmitters={[]}
                pillar={0}
                consentState={{
                    aus: {
                        personalisedAdvertising: true,
                    },
                }}
                adTargeting={
                    {
                        disableAds: false,
                        adUnit: 'someAdUnit',
                        customParams: {
                            param1: 'param1',
                            param2: 'param2',
                        },
                    } as AdTargeting
                }
            />
        );
        const { findByTitle } = render(atom);

        const iframe = (await findByTitle(
            'My Youtube video!',
        )) as HTMLIFrameElement;
        expect(iframe).toBeInTheDocument();
        // assert cust_params value is double uriComponent encoded e.g. % => %25
        // as per existing Frontend behaviour
        expect(
            iframe.src.includes(
                '%22cust_params%22%3A%22param1%253Dparam1%2526param2%253Dparam2',
            ),
        ).toBe(true);
        // encoded consent state
        expect(
            iframe.src.includes('%22restrictedDataProcessor%22%3Afalse'),
        ).toBe(true);
    });
});
