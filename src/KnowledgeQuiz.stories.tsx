import React from 'react';

import { KnowledgeQuizAtom } from './KnowledgeQuiz';
import {
    exampleKnowledgeQuestions,
    resultGroups,
} from './fixtures/knowledgeQuizAtom';
import { sharingUrls } from './fixtures/sharingUrls';

export default {
    title: 'KnowledgeQuizAtom',
    component: KnowledgeQuizAtom,
};

export const DefaultRendering = (): JSX.Element => (
    <KnowledgeQuizAtom
        id="2c6bf552-2827-4256-b3a0-f557d215c394"
        questions={exampleKnowledgeQuestions}
        resultGroups={resultGroups}
        sharingUrls={sharingUrls}
    />
);
