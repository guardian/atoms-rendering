import React from 'react';
import { css } from 'emotion';

import { Radio } from '@guardian/src-radio';
import {
    CorrectSelectedAnswer,
    IncorrectAnswer,
    NonSelectedCorrectAnswer,
    UnselectedAnswer,
    radioButtonWrapperStyles,
} from './Answers';

export default {
    title: 'Answers',
};

export const Answers = (): JSX.Element => (
    <div
        className={css`
            display: flex;
            flex-direction: column;
        `}
    >
        <CorrectSelectedAnswer
            id="someId3"
            name="someName"
            answerText="Correct Selected Answer"
            explainerText="this is such a cool answer"
        />
        <NonSelectedCorrectAnswer
            id="someId4"
            name="someName"
            answerText="Correct Non Selected Answer"
            explainerText="this is such a cool answer"
        />
        <IncorrectAnswer
            id="someId5"
            name="someName"
            answerText="Incorrect Answer"
        />
        <UnselectedAnswer
            id="someId1"
            name="someName"
            answerText="Unselectable unanswered answer"
        />
        <div className={radioButtonWrapperStyles}>
            <Radio
                value={'answer.text'}
                label="Selectable unanswered answer"
                onChange={(e) => console.log(e.target.value)}
                checked={true}
            />
            <Radio
                value={'answer.text'}
                label="Selectable unanswered answer"
                onChange={(e) => console.log(e.target.value)}
                checked={false}
            />
        </div>
    </div>
);
