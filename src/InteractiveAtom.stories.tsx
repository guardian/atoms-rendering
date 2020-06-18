import React from 'react';
import { css } from 'emotion';

import { InteractiveAtom } from './InteractiveAtom';

export default {
    title: 'InteractiveAtom',
    component: InteractiveAtom,
};

export const DefaultStory = (): JSX.Element => {
    return (
        <div
            className={css`
                width: 500px;
                height: 500px;
            `}
        >
            <InteractiveAtom
                id="abc123"
                url="https://api.nextgen.guardianapps.co.uk/embed/atom/interactive/interactives%2F2020%2F03%2Fcovid-19-uk%2Fdefault"
            />
        </div>
    );
};
