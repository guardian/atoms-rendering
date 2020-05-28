import React from 'react';

import { MediaAtom } from './MediaAtom';

export default {
    title: 'MediaAtom',
    component: MediaAtom,
};

export const DefaultStory = (): JSX.Element => {
    return <MediaAtom id="abc123" />;
};
