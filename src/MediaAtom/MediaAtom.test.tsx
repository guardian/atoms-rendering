import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { MediaAtom } from './MediaAtom';

describe('MediaAtom', () => {
    it('should render', () => {
        const { getByText } = render(<MediaAtom id="123abc" />);

        expect(getByText('MediaAtom')).toBeInTheDocument();
    });
});
