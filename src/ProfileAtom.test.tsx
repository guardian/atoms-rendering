import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { ProfileAtom } from './ProfileAtom';

describe('ProfileAtom', () => {
    it('should render', () => {
        const { getByText } = render(
            <ProfileAtom
                id="1fba49a4-81c6-49e4-b7fa-fd66d1512360"
                label="Profile"
                title="Who is Jon Lansman?"
                img=""
                html="<p>A 62-year-old Labour veteran who joined the party in 1974 and worked for Labour icon Tony Benn during his deputy leadership campaign in the 1980s. Lansman served as director of operations for Corbyn’s leadership campaign. After Corbyn was elected as the leader of the Labour party in 2015, Lansman founded Momentum, a pro-Corbyn campaign group.<br></p>"
                credit=""
            />,
        );

        // expect(getByText('ProfileAtom')).toBeInTheDocument();
    });
});
