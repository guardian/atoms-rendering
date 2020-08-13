import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { TimelineAtom } from './TimelineAtom';

describe('TimelineAtom', () => {
    it('should render', () => {
        const { getByText } = render(
            <TimelineAtom
                id="123abc"
                title="Timeline"
                description="<p>TimelineAtom</p>"
                pillar="news"
                likeHandler={() => {
                    return null;
                }}
                dislikeHandler={() => {
                    return null;
                }}
                expandCallback={() => {
                    return null;
                }}
            />,
        );
        expect(getByText('TimelineAtom')).toBeInTheDocument();
    });
});
