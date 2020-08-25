import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { QuizAtom } from './QuizAtom';

describe('QuizAtom', () => {
    it('should render', () => {
        const { getByText } = render(<QuizAtom id="123abc" questions={[]} />);

        // expect(getByText('QuizAtom')).toBeInTheDocument();
    });
});
