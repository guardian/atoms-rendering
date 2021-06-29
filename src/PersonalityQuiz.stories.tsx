import React from 'react';

import { PersonalityQuizAtom } from './PersonalityQuiz';
import {
    examplePersonalityQuestions,
    exampleResultBuckets,
} from './fixtures/personalityQuizAtom';
import { sharingUrls } from './fixtures/sharingUrls';
import { Pillar, Special } from '@guardian/types';

export default {
    title: 'PersonalityQuizAtom',
    component: PersonalityQuizAtom,
};

export const DefaultRendering = (): JSX.Element => (
    <PersonalityQuizAtom
        id="quiz-id"
        questions={examplePersonalityQuestions}
        resultBuckets={exampleResultBuckets}
        sharingUrls={sharingUrls}
        theme={Pillar.News}
    />
);

export const LabsTheme = (): JSX.Element => (
    <PersonalityQuizAtom
        id="2c6bf552-2827-4256-b3a0-f557d215c394"
        questions={examplePersonalityQuestions}
        resultBuckets={exampleResultBuckets}
        sharingUrls={sharingUrls}
        theme={Special.Labs}
    />
);
