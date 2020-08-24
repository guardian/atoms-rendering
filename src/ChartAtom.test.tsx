import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { ChartAtom } from './ChartAtom';

describe('ChartAtom', () => {
    it('should render', () => {
        const { getByText } = render(<ChartAtom id="123abc" />);

        // expect(getByText('ChartAtom')).toBeInTheDocument();
    });
});
