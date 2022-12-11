import { css } from '@emotion/react';

import { Radio } from '@guardian/source-react-components';
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
        css={css`
            display: flex;
            flex-direction: column;
        `}
    >
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
        <IncorrectAnswer id="someId5" answerText="Incorrect Answer" />
        <UnselectedAnswer
            id="someId1"
            answerText="Unselectable unanswered answer"
        />
        <div css={radioButtonWrapperStyles}>
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
