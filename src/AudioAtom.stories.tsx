import React from 'react';

import { AudioAtom } from './AudioAtom';

export default {
    title: 'AudioAtom',
    component: AudioAtom,
};

export const DefaultStory = (): JSX.Element => {
    return <AudioAtom id="abc123" />;
};
