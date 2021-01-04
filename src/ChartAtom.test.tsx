import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { html } from './fixtures/chartAtoms';

import { ChartAtom } from './ChartAtom';

describe('ChartAtom', () => {
    it('should render', () => {
        const { getByTestId } = render(<ChartAtom id="123abc" html={html} />);

        expect(getByTestId('chart')).toBeInTheDocument();
    });
});
