import React from 'react';

import { QuizAtom } from './QuizAtom';
import { QuizAtomType, Question } from './types';
import { exampleQuestions } from '../fixtures/quizAtom';

export default {
    title: 'QuizAtom',
    component: QuizAtom,
};

export const DefaultStory = (): JSX.Element => (
    <QuizAtom
        id="2c6bf552-2827-4256-b3a0-f557d215c394"
        questions={exampleQuestions}
    />
);
