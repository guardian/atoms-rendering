import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { QandaAtom } from './QandaAtom';

describe('QandaAtom', () => {
    it('should render', () => {
        const { getByText } = render(
            <QandaAtom id="123abc" title="title" html="<p>QandaAtom</p>" />,
        );

        expect(getByText('QandaAtom')).toBeInTheDocument();
    });
});
