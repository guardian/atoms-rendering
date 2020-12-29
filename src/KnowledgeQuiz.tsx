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
}: QuizAtomType): JSX.Element => {
    const [selectedAnswers, setSelectedAnswers] = useState<{
        [key: string]: string;
    }>({});

    const [hasSubmittedAnswers, setHasSubmittedAnswers] = useState<boolean>(
        false,
    );
    return (
        <Fragment>
            <form data-atom-id={id}>
                {questions.map((question, idx) => (
                    <Question
                        key={question.id}
                        id={question.id}
                        number={idx + 1}
                        text={question.text}
                        imageUrl={question.imageUrl}
                        answers={question.answers}
                        hasSubmittedAnswers={hasSubmittedAnswers}
                        selectedAnswers={selectedAnswers}
                        updateSelectedAnswer={(selectedAnswerId: string) => {
                            setSelectedAnswers({
                                ...selectedAnswers,
                                [question.id]: selectedAnswerId,
                            });
                        }}
                    />
                ))}
            </form>
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
                    onClick={() => setHasSubmittedAnswers(true)}
                    onKeyDown={(e) => {
                        const spaceKey = 32;
                        const enterKey = 13;
                        if (e.keyCode === spaceKey || e.keyCode === enterKey)
                            setHasSubmittedAnswers(true);
                    }}
                    data-testid="submit-quiz"
                >
                    Submit
                </Button>
                <Button
                    priority="secondary"
                    onClick={() => {
                        setHasSubmittedAnswers(false);
                        setSelectedAnswers({});
                    }}
                    onKeyDown={(e) => {
                        const spaceKey = 32;
                        const enterKey = 13;
                        if (e.keyCode === spaceKey || e.keyCode === enterKey) {
                            setHasSubmittedAnswers(false);
                            setSelectedAnswers({});
                        }
                    }}
                    data-testid="reset-quiz"
                >
                    Reset
                </Button>
            </div>
        </Fragment>
    );
};

export const Question = ({
    id,
    text,
    imageUrl,
    answers,
    number,
    hasSubmittedAnswers,
    selectedAnswers,
    updateSelectedAnswer,
}: QuestionType & {
    number: number;
    hasSubmittedAnswers: boolean;
    selectedAnswers: {
        [key: string]: string;
    };
    updateSelectedAnswer: (selectedAnswerId: string) => void;
}): JSX.Element => (
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
                    hasSubmittedAnswers={hasSubmittedAnswers}
                    selectedAnswers={selectedAnswers}
                    updateSelectedAnswer={updateSelectedAnswer}
                />
            </div>
        </fieldset>
    </div>
);

const Answers = ({
    answers,
    id: questionId,
    hasSubmittedAnswers,
    selectedAnswers,
    updateSelectedAnswer,
}: {
    answers: AnswerType[];
    id: string;
    hasSubmittedAnswers: boolean;
    selectedAnswers: {
        [key: string]: string;
    };
    updateSelectedAnswer: (selectedAnswerId: string) => void;
}) => {
    if (hasSubmittedAnswers) {
        return (
            <Fragment>
                {answers.map((answer) => {
                    const isSelected =
                        selectedAnswers[questionId] === answer.id;

                    if (isSelected) {
                        if (answer.isCorrect) {
                            return (
                                <CorrectSelectedAnswer
                                    key={answer.id}
                                    id={answer.id}
                                    name={questionId}
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
                                    name={questionId}
                                    answerText={answer.text}
                                />
                            );
                        }
                    }

                    if (answer.isCorrect) {
                        return (
                            <NonSelectedCorrectAnswer
                                key={answer.id}
                                name={questionId}
                                id={answer.id}
                                answerText={answer.text}
                                explainerText={answer.revealText || ''}
                            />
                        );
                    }

                    return (
                        <UnselectedAnswer
                            name={questionId}
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
                            selectedAnswers[questionId] === answer.id
                                ? 'selected-enabled-answer'
                                : 'unselected-enabled-answer'
                        }
                        name={questionId}
                        label={answer.text}
                        onChange={() => updateSelectedAnswer(answer.id)}
                        checked={selectedAnswers[questionId] === answer.id}
                    />
                ))}
            </RadioGroup>
        </div>
    );
};
