import React from 'react';

import { PersonalityQuiz } from './PersonalityQuiz';
import {
    examplePersonalityQuestions,
    exampleResultBuckets,
} from '../fixtures/personalityQuizAtom';

export default {
    title: 'PersonalityQuiz',
    component: PersonalityQuiz,
};
export const DefaultRendering = () => (
    <PersonalityQuiz
        id="quiz-id"
        questions={examplePersonalityQuestions}
        resultBuckets={exampleResultBuckets}
    />
);
