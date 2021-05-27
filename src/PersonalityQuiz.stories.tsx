import React from 'react';
<<<<<<< HEAD
=======
import { css } from '@emotion/react';
>>>>>>> 889024b17ace5fc90be2648daab6cd100dd29507

import { PersonalityQuizAtom } from './PersonalityQuiz';
import {
    examplePersonalityQuestions,
    exampleResultBuckets,
} from './fixtures/personalityQuizAtom';
import { sharingUrls } from './fixtures/sharingUrls';

export default {
    title: 'PersonalityQuizAtom',
    component: PersonalityQuizAtom,
};

export const DefaultRendering = () => (
    <PersonalityQuizAtom
        id="quiz-id"
        questions={examplePersonalityQuestions}
        resultBuckets={exampleResultBuckets}
        sharingUrls={sharingUrls}
    />
);
