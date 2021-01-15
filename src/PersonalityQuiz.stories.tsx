import React from 'react';

import { Pillar } from '@guardian/types';

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
        pillar={Pillar.Sport}
        sharingUrls={sharingUrls}
    />
);
