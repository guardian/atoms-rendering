import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { AudioAtom } from './AudioAtom';

describe('AudioAtom', () => {
    it('should render', () => {
        const { getByText } = render(<AudioAtom id="123abc" />);

        expect(getByText('AudioAtom')).toBeInTheDocument();
    });
});
