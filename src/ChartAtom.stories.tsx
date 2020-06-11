import React from 'react';

import { ChartAtom } from './ChartAtom';

export default {
    title: 'ChartAtom',
    component: ChartAtom,
};

export const DefaultStory = (): JSX.Element => {
    return <ChartAtom id="abc123" />;
};
