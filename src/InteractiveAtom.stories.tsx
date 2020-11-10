import React from 'react';
import { css as emotionCSS } from 'emotion';

import { InteractiveAtomBlockElement } from '../fixtures/InteractiveAtomBlockElement';
import { InteractiveAtom } from './InteractiveAtom';

export default {
    title: 'InteractiveAtom',
    component: InteractiveAtom,
};

export const DefaultStory = (): JSX.Element => {
    const { id, html, js, css } = InteractiveAtomBlockElement;
    return (
        <div
            className={emotionCSS`
                width: 500px;
                height: 500px;
            `}
        >
            <InteractiveAtom id={id} html={html} js={js} css={css} />
        </div>
    );
};
DefaultStory.parameters = {
    // This interactive uses animation which is causing false negatives for Chromatic
    chromatic: { disable: true },
};
