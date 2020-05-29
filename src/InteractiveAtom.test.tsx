import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { InteractiveAtom } from './InteractiveAtom';

describe('InteractiveAtom', () => {
    it('should render', () => {
        const { getByText } = render(<InteractiveAtom id="123abc" />);

        expect(getByText('InteractiveAtom')).toBeInTheDocument();
    });
});
