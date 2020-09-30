import React from 'react';
import { css } from 'emotion';

import { QuizAtom } from './QuizAtom';
import {
    CorrectSelectedAnswer,
    IncorrectAnswer,
    NonSelectedCorrectAnswer,
    UnselectedAnswer,
} from './Answers';
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
            answerText="Correct Selected Answer"
            explainerText="this is such a cool answer"
        />
        <NonSelectedCorrectAnswer
            answerText="Correct Non Selected Answer"
            explainerText="this is such a cool answer"
        />
        <IncorrectAnswer answerText="Correct Non Selected Answer" />
    </div>
);
