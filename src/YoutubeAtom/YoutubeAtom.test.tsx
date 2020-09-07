import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Pillar, Display, Design } from '@guardian/types/Format';
import { YoutubeAtom } from './YoutubeAtom';

describe('YoutubeAtom', () => {
    it('should render', () => {
        const atom = (
            <YoutubeAtom
                format={{
                    pillar: Pillar.News,
                    design: Design.Article,
                    display: Display.Standard,
                }}
                videoMeta={{
                    assetId: '-ZCvZmYlQD8',
                    mediaTitle: 'YoutubeAtom',
                }}
            />
        );
        const { getByText } = render(atom);

        expect(getByText('Youtube')).toBeInTheDocument();
    });
});
