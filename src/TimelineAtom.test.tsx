import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { TimelineAtom } from './TimelineAtom';

describe('TimelineAtom', () => {
    it('should render', () => {
        const { getByText } = render(<TimelineAtom id="123abc" />);

        expect(getByText('TimelineAtom')).toBeInTheDocument();
    });
});
