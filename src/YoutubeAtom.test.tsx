import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { YoutubeAtom } from './YoutubeAtom';

describe('YoutubeAtom', () => {
    it('should render', () => {
        const atom = (
            <YoutubeAtom
                title="My Youtube video!"
                assetId="-ZCvZmYlQD8"
                alt=""
                role="inline"
                eventEmitters={[]}
            />
        );
        const { getByTitle } = render(atom);

        expect(getByTitle('My Youtube video!')).toBeInTheDocument();
        expect(getByTitle('My Youtube video!'))
            .toHaveAttribute('src', expect.stringMatching(/https:\/\/www.youtube-nocookie.com\/embed.*/))
    });
});
