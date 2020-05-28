import React from 'react';

import { ProfileAtom } from './ProfileAtom';

export default {
    title: 'ProfileAtom',
    component: ProfileAtom,
};

export const DefaultStory = (): JSX.Element => {
    return <ProfileAtom id="abc123" />;
};
