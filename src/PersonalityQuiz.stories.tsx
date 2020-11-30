import React from 'react';

import { PersonalityQuizAtom } from './PersonalityQuiz';
import {
    examplePersonalityQuestions,
    exampleResultBuckets,
} from '../fixtures/personalityQuizAtom';

export default {
    title: 'PersonalityQuizAtom',
    component: PersonalityQuizAtom,
};
export const DefaultRendering = () => (
    <PersonalityQuizAtom
        id="quiz-id"
        questions={examplePersonalityQuestions}
        resultBuckets={exampleResultBuckets}
    />
);
