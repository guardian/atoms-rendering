import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { YoutubeAtom } from './YoutubeAtom';

const assetId = '-ZCvZmYlQD8';
describe('YoutubeAtom', () => {
    it('should render', () => {
        const atom = (
            <YoutubeAtom
                title="My Youtube video!"
                videoMeta={{
                    assetId,
                    mediaTitle: 'YoutubeAtom',
                }}
                alt=""
                role="inline"
                eventEmitters={[]}
            />
        );
        const { getByTitle } = render(atom);

        expect(getByTitle('My Youtube video!')).toBeInTheDocument();
    });
});
