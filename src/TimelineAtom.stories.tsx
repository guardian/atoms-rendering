import React from 'react';

import { TimelineAtom } from './TimelineAtom';

export default {
    title: 'TimelineAtom',
    component: TimelineAtom,
};

export const DefaultStory = (): JSX.Element => {
    return <TimelineAtom id="abc123" />;
};
