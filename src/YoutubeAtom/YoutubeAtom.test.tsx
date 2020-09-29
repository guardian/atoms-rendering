import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Pillar, Display, Design } from '@guardian/types/Format';
import { YoutubeAtom } from './YoutubeAtom';

describe('YoutubeAtom', () => {
    it('should render', () => {
        const atom = (
            <YoutubeAtom
                title="My Youtube video!"
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
        const { getByTitle } = render(atom);

        expect(getByTitle('My Youtube video!')).toBeInTheDocument();
    });
});
