import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { YoutubeAtom } from './YoutubeAtom';

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
    it('renders a div for the youtube iframe to attach to', async () => {
        const atom = (
            <YoutubeAtom
                title="My Youtube video!"
                assetId="ZCvZmYlQD8"
                alt=""
                role="inline"
                eventEmitters={[]}
                pillar={0}
            />
        );
        const { getByTestId } = render(atom);
        const playerDiv = getByTestId('youtube-video-ZCvZmYlQD8');
        expect(playerDiv).toBeInTheDocument();
    });

    it('shows a placeholder if overlay is missing', async () => {
        const atom = (
            <YoutubeAtom
                title="My Youtube video!"
                assetId="ZCvZmYlQD8"
                alt=""
                role="inline"
                eventEmitters={[]}
                pillar={0}
            />
        );
        const { getByTestId } = render(atom);
        const placeholder = getByTestId('placeholder');
        expect(placeholder).toBeInTheDocument();
    });

    it('shows an overlay if present', async () => {
        const atom = (
            <YoutubeAtom
                title="My Youtube video!"
                assetId="ZCvZmYlQD8"
                alt=""
                role="inline"
                eventEmitters={[]}
                pillar={0}
                overrideImage={overlayImage}
            />
        );
        const { getByTestId } = render(atom);
        const overlay = getByTestId('youtube-overlay');
        expect(overlay).toBeInTheDocument();
    });

    it('hides an overlay once it is clicked', async () => {
        const atom = (
            <YoutubeAtom
                title="My Youtube video!"
                assetId="ZCvZmYlQD8"
                alt=""
                role="inline"
                eventEmitters={[]}
                pillar={0}
                overrideImage={overlayImage}
            />
        );
        const { getByTestId } = render(atom);
        const overlay = getByTestId('youtube-overlay');
        expect(overlay).toBeInTheDocument();

        fireEvent.click(getByTestId('youtube-overlay'));
        expect(overlay).not.toBeInTheDocument();
    });
});
