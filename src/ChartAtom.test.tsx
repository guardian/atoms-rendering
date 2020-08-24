import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { ChartAtom } from './ChartAtom';

describe('ChartAtom', () => {
    it('should render', () => {
        const { getByText } = render(
            <ChartAtom
                url="https://api.nextgen.guardianapps.co.uk/embed/atom/chart/16597f9d-cc9c-4659-bfcb-1a1fcbbf6263"
                id="123abc"
            />,
        );

        // expect(getByText('ChartAtom')).toBeInTheDocument();
    });
});
