import React from 'react';

import { CtaAtom } from './CtaAtom';

export default {
    title: 'CtaAtom',
    component: CtaAtom,
};

export const DefaultStory = (): JSX.Element => {
    return <CtaAtom id="abc123" />;
};
