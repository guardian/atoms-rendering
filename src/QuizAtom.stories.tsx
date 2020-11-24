import React from 'react';
import { css } from 'emotion';

import { QuizAtom } from './QuizAtom';
import {
    CorrectSelectedAnswer,
    IncorrectAnswer,
    NonSelectedCorrectAnswer,
    UnselectedAnswer,
    SelectedAnswer,
} from './Answers';
import {
    exampleKnowledgeQuestions,
    examplePersonalityQuestions,
} from '../fixtures/quizAtom';

export default {
    title: 'QuizAtom',
    component: QuizAtom,
};

export const KnowledgeQuiz = (): JSX.Element => (
    <QuizAtom
        id="2c6bf552-2827-4256-b3a0-f557d215c394"
        questions={exampleKnowledgeQuestions}
        quizType="knowledge"
    />
);

export const PersonalityQuiz = (): JSX.Element => (
    <QuizAtom
        id="2c6bf552-2827-4256-b3a0-f557d215c394"
        questions={examplePersonalityQuestions}
        quizType="personality"
    />
);

export const Answers = (): JSX.Element => (
    <div
        className={css`
            display: flex;
            flex-direction: column;
        `}
    >
        <UnselectedAnswer
            id="someId1"
            onClick={() => console.log('unselected answer was clicked')}
            onKeyPress={() => console.log('unselected answer was key pressed')}
            disabled={false}
            answerText="Selectable unanswered answer"
        />
        <UnselectedAnswer
            id="someId2"
            disabled={true}
            answerText="Unselectable unanswered answer"
        />
        <CorrectSelectedAnswer
            id="someId3"
            answerText="Correct Selected Answer"
            explainerText="this is such a cool answer"
        />
        <NonSelectedCorrectAnswer
            id="someId4"
            answerText="Correct Non Selected Answer"
            explainerText="this is such a cool answer"
        />
        <IncorrectAnswer
            id="someId5"
            answerText="Correct Non Selected Answer"
        />
        <SelectedAnswer id="someId6" answerText="Selected Answer" />
    </div>
);
