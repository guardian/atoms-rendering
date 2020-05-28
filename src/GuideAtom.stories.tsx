import React from 'react';

import { GuideAtom } from './GuideAtom';

export default {
    title: 'GuideAtom',
    component: GuideAtom,
};

export const DefaultStory = (): JSX.Element => {
    return <GuideAtom id="abc123" />;
};
