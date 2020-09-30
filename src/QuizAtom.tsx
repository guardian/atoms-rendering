import React, { useState, KeyboardEvent } from 'react';
import { css } from 'emotion';

import { body } from '@guardian/src-foundations/typography';

import {
    CorrectSelectedAnswer,
    IncorrectAnswer,
    NonSelectedCorrectAnswer,
    UnselectedAnswer,
} from './Answers';
import { QuizAtomType, Question as QuestionType } from './types';

const fieldsetStyle = css`
    margin-bottom: 12px;
    border: 0px;
    padding: 0px;
`;

export const QuizAtom = ({ id, questions }: QuizAtomType): JSX.Element => (
    <form data-atom-id={id}>
        {questions.map((question, idx) => (
            <Question
                key={question.id}
                id={question.id}
                number={idx + 1}
                text={question.text}
                imageUrl={question.imageUrl}
                answers={question.answers}
            />
        ))}
    </form>
);

export type QuestionProps = {
    number: number;
};

export const Question = ({
    text,
    imageUrl,
    answers,
    number,
}: QuestionType & QuestionProps): JSX.Element => {
    const [selected, setSelected] = useState<string | undefined>(undefined);

    return (
        <div
            className={css`
                ${body.medium()};
            `}
        >
            <fieldset className={fieldsetStyle}>
                <div>
                    <legend
                        className={css`
                            margin-bottom: 12px;
                        `}
                    >
                        <span
                            className={css`
                                padding-right: 12px;
                            `}
                        >
                            {number + '.'}
                        </span>
                        {text}
                    </legend>
                </div>
                {imageUrl && (
                    <img
                        className={css`
                            width: 100%;
                        `}
                        src={imageUrl}
                    />
                )}
                <div>
                    {answers.map((answer) => {
                        const isAnswered = selected !== undefined;
                        const isSelected = selected === answer.id;

                        if (isAnswered) {
                            if (isSelected) {
                                if (answer.isCorrect) {
                                    return (
                                        <CorrectSelectedAnswer
                                            answerText={answer.text}
                                            explainerText={
                                                answer.revealText || ''
                                            }
                                        />
                                    );
                                }

                                if (!answer.isCorrect) {
                                    return (
                                        <IncorrectAnswer
                                            answerText={answer.text}
                                        />
                                    );
                                }
                            }

                            if (answer.isCorrect) {
                                return (
                                    <NonSelectedCorrectAnswer
                                        answerText={answer.text}
                                        explainerText={answer.revealText || ''}
                                    />
                                );
                            }

                            return (
                                <UnselectedAnswer
                                    id={answer.id}
                                    disabled={true}
                                    answerText={answer.text}
                                />
                            );
                        }

                        return (
                            <UnselectedAnswer
                                id={answer.id}
                                disabled={false}
                                answerText={answer.text}
                                onClick={() => setSelected(answer.id)}
                                onKeyPress={(e: KeyboardEvent) => {
                                    if (e.key === 'Enter' && !isAnswered) {
                                        setSelected(answer.id);
                                    }
                                }}
                            />
                        );
                    })}
                </div>
            </fieldset>
        </div>
    );
};
