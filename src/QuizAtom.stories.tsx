import React from 'react';

import { QuizAtom } from './QuizAtom';

export default {
    title: 'QuizAtom',
    component: QuizAtom,
};

export const DefaultStory = (): JSX.Element => {
    return <QuizAtom id="abc123" />;
};
