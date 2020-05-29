import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { ExplainerAtom } from './ExplainerAtom';

describe('ExplainerAtom', () => {
    it('should render', () => {
        const { getByText } = render(
            <ExplainerAtom
                id="123abc"
                title="title"
                html="<p>ExplainerAtom</p>"
            />,
        );

        expect(getByText('ExplainerAtom')).toBeInTheDocument();
    });
});
