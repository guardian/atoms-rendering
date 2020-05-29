import React from 'react';

import { QandaAtom } from './QandaAtom';

export default {
    title: 'QandaAtom',
    component: QandaAtom,
};

export const DefaultStory = (): JSX.Element => {
    return <QandaAtom id="abc123" />;
};
