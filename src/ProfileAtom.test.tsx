import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { ProfileAtom } from './ProfileAtom';

describe('ProfileAtom', () => {
    it('should render', () => {
        const { getByText } = render(<ProfileAtom id="123abc" />);

        expect(getByText('ProfileAtom')).toBeInTheDocument();
    });
});
