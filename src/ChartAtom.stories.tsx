import React from 'react';

import { ChartAtom } from './ChartAtom';

export default {
    title: 'ChartAtom',
    component: ChartAtom,
};

export const DefaultStory = (): JSX.Element => {
    return (
        <ChartAtom
            id="abc123"
            url="https://embed.theguardian.com/embed/atom/chart/650c584d-551f-41ac-8bf8-3283fb04a863"
        />
    );
};
