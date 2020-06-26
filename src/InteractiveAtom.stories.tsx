import React from 'react';
import { css as emotionCSS } from 'emotion';

import { AtomEmbedBlockElement } from '../fixtures/AtomEmbedBlockElement';
import { InteractiveAtom } from './InteractiveAtom';

export default {
    title: 'InteractiveAtom',
    component: InteractiveAtom,
};

export const DefaultStory = (): JSX.Element => {
    const { id, html, js, css } = AtomEmbedBlockElement;
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
