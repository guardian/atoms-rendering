import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { GuideAtom } from './GuideAtom';

describe('GuideAtom', () => {
    it('should render', () => {
        const { getByText } = render(<GuideAtom id="123abc" />);

        expect(getByText('GuideAtom')).toBeInTheDocument();
    });
});
