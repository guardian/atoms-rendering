import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { CtaAtom } from './CtaAtom';

describe('CtaAtom', () => {
    it('should render', () => {
        const { getByText } = render(<CtaAtom id="123abc" />);

        expect(getByText('CtaAtom')).toBeInTheDocument();
    });
});
