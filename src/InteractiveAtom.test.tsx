import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { InteractiveAtom } from './InteractiveAtom';

describe('InteractiveAtom', () => {
    it('should render', () => {
        const { getByText } = render(
            <InteractiveAtom
                id="123abc"
                url="https://api.nextgen.guardianapps.co.uk/embed/atom/interactive/interactives%2F2020%2F03%2Fcovid-19-uk%2Fdefault"
            />,
        );

        // Todo: I don't know which test to put here
    });
});
