import { css } from '@emotion/react';

import { InteractiveAtomBlockElement } from './fixtures/InteractiveAtomBlockElement';
import { InteractiveAtom } from './InteractiveAtom';

export default {
    title: 'InteractiveAtom',
    component: InteractiveAtom,
};

export const DefaultStory = (): JSX.Element => {
    const { id, html, js, css: atomCss } = InteractiveAtomBlockElement;
    return (
        <div
            css={css`
                width: 500px;
                height: 500px;
            `}
        >
            <InteractiveAtom
                id={id}
                elementHtml={html}
                elementJs={js}
                elementCss={atomCss}
            />
        </div>
    );
};
DefaultStory.parameters = {
    // This interactive uses animation which is causing false negatives for Chromatic
    chromatic: { disable: true },
};
