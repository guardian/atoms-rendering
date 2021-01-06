import React, { useState, Fragment } from 'react';
import { css } from 'emotion';

import { body } from '@guardian/src-foundations/typography';
import { RadioGroup, Radio } from '@guardian/src-radio';
import { Button } from '@guardian/src-button';

import {
    CorrectSelectedAnswer,
    IncorrectAnswer,
    NonSelectedCorrectAnswer,
    UnselectedAnswer,
    radioButtonWrapperStyles,
} from './Answers';

type AnswerType = {
    id: string;
    text: string;
    revealText?: string;
    isCorrect: boolean;
    answerBuckets: string[];
};

type QuestionType = {
    id: string;
    text: string;
    answers: AnswerType[];
    imageUrl?: string;
};

type QuizAtomType = {
    id: string;
    questions: QuestionType[];
};

const fieldsetStyle = css`
    margin-bottom: 12px;
    border: 0px;
    padding: 0px;
`;

export const KnowledgeQuizAtom = ({
    id,
    questions,
}: QuizAtomType): JSX.Element => (
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

export const Question = ({
    id,
    text,
    imageUrl,
    answers,
    number,
}: QuestionType & {
    number: number;
}): JSX.Element => {
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

    const updateSelectedAnswer = (selectedAnswerId: string) =>
        setSelectedAnswer(selectedAnswerId);

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
                <div
                    className={css`
                        /* fix for chrome jumping to top of page */
                        position: relative;
                    `}
                >
                    <Answers
                        id={id}
                        answers={answers}
                        hasSubmitted={hasSubmitted}
                        selectedAnswer={selectedAnswer}
                        updateSelectedAnswer={updateSelectedAnswer}
                    />
                </div>
                <div
                    className={css`
                        display: flex;
                        flex-direction: row;
                        button {
                            margin-right: 10px;
                        }
                    `}
                >
                    <Button
                        type="submit"
                        data-testid={`submit-question-${id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setHasSubmitted(true);
                        }}
                        onKeyDown={(e) => {
                            const spaceKey = 32;
                            const enterKey = 13;
                            if (
                                e.keyCode === spaceKey ||
                                e.keyCode === enterKey
                            ) {
                                // prevent submit
                                e.preventDefault();
                                setHasSubmitted(true);
                            }
                        }}
                    >
                        Submit
                    </Button>
                    <Button
                        priority="secondary"
                        data-testid={`reset-question-${id}`}
                        onClick={() => {
                            setHasSubmitted(false);
                            setSelectedAnswer('');
                        }}
                        onKeyDown={(e) => {
                            const spaceKey = 32;
                            const enterKey = 13;
                            if (
                                e.keyCode === spaceKey ||
                                e.keyCode === enterKey
                            ) {
                                setHasSubmitted(false);
                                setSelectedAnswer('');
                            }
                        }}
                    >
                        Reset
                    </Button>
                </div>
            </fieldset>
        </div>
    );
};

const Answers = ({
    answers,
    id: questionId,
    hasSubmitted,
    selectedAnswer,
    updateSelectedAnswer,
}: {
    answers: AnswerType[];
    id: string;
    hasSubmitted: boolean;
    selectedAnswer?: string;
    updateSelectedAnswer: (selectedAnswerId: string) => void;
}) => {
    if (hasSubmitted) {
        return (
            <Fragment>
                {answers.map((answer) => {
                    const isSelected = selectedAnswer === answer.id;

                    if (isSelected) {
                        if (answer.isCorrect) {
                            return (
                                <CorrectSelectedAnswer
                                    key={answer.id}
                                    id={answer.id}
                                    answerText={answer.text}
                                    explainerText={answer.revealText || ''}
                                />
                            );
                        }

                        if (!answer.isCorrect) {
                            return (
                                <IncorrectAnswer
                                    key={answer.id}
                                    id={answer.id}
                                    answerText={answer.text}
                                />
                            );
                        }
                    }

                    if (answer.isCorrect) {
                        return (
                            <NonSelectedCorrectAnswer
                                key={answer.id}
                                id={answer.id}
                                answerText={answer.text}
                                explainerText={answer.revealText || ''}
                            />
                        );
                    }

                    return (
                        <UnselectedAnswer
                            key={answer.id}
                            id={answer.id}
                            answerText={answer.text}
                        />
                    );
                })}
            </Fragment>
        );
    }

    return (
        <div className={radioButtonWrapperStyles}>
            <RadioGroup name={questionId}>
                {answers.map((answer) => (
                    <Radio
                        key={answer.id}
                        value={answer.text}
                        data-testid={answer.id}
                        data-answertype={
                            selectedAnswer === answer.id
                                ? 'selected-enabled-answer'
                                : 'unselected-enabled-answer'
                        }
                        name={questionId}
                        label={answer.text}
                        onChange={() => updateSelectedAnswer(answer.id)}
                        checked={selectedAnswer === answer.id}
                    />
                ))}
            </RadioGroup>
        </div>
    );
};
