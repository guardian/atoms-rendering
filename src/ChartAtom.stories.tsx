import React from 'react';

import { ChartAtom } from './ChartAtom';
import { html } from '../fixtures/chartAtoms';
import { css } from 'emotion';
export default {
    title: 'ChartAtom',
    component: ChartAtom,
};

export const DefaultStory = (): JSX.Element => {
    return (
        <div
            className={css`
                height: 500px;
            `}
        >
            <ChartAtom
                id="abc123"
                url="https://embed.theguardian.com/embed/atom/chart/650c584d-551f-41ac-8bf8-3283fb04a863"
                html={html}
            />
        </div>
    );
};
