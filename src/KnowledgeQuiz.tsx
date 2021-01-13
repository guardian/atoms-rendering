import React, { useState, Fragment, useEffect } from 'react';
import { css } from 'emotion';

import { body, textSans } from '@guardian/src-foundations/typography';
import { neutral, sport } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';
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
    resultGroups: ResultGroupsType[];
    sharingIcons?: JSX.Element;
};

type ResultGroupsType = {
    title: string;
    shareText: string;
    minScore: number;
    id: string;
};

const fieldsetStyle = css`
    margin-bottom: 12px;
    border: 0px;
    padding: 0px;
`;

export const KnowledgeQuizAtom = ({
    id,
    questions,
    resultGroups,
    sharingIcons,
}: QuizAtomType): JSX.Element => {
    const [selectedGlobalAnswers, setSelectedGlobalAnswers] = useState<{
        [questionId: string]: AnswerType;
    }>({});

    const haveAllQuestionsBeenAnswered =
        Object.keys(selectedGlobalAnswers).length === questions.length;

    return (
        <form data-atom-id={id}>
            {haveAllQuestionsBeenAnswered && (
                <div data-testid="quiz-results-block-top">
                    <Result
                        selectedGlobalAnswers={selectedGlobalAnswers}
                        resultGroups={resultGroups}
                        sharingIcons={sharingIcons}
                    />
                </div>
            )}
            {questions.map((question, idx) => (
                <Question
                    key={question.id}
                    id={question.id}
                    number={idx + 1}
                    text={question.text}
                    imageUrl={question.imageUrl}
                    answers={question.answers}
                    setSelectedGlobalAnswers={({
                        answer,
                        questionId,
                    }: {
                        answer: AnswerType;
                        questionId: string;
                    }) =>
                        setSelectedGlobalAnswers({
                            ...selectedGlobalAnswers,
                            [questionId]: answer,
                        })
                    }
                />
            ))}
            {haveAllQuestionsBeenAnswered && (
                <div data-testid="quiz-results-block-top">
                    <Result
                        selectedGlobalAnswers={selectedGlobalAnswers}
                        resultGroups={resultGroups}
                        sharingIcons={sharingIcons}
                    />
                </div>
            )}
        </form>
    );
};

export const Question = ({
    id,
    text,
    imageUrl,
    answers,
    number,
    setSelectedGlobalAnswers,
}: QuestionType & {
    number: number;
    setSelectedGlobalAnswers: ({
        answer,
        questionId,
    }: {
        answer: AnswerType;
        questionId: string;
    }) => void;
}): JSX.Element => {
    const [selectedAnswerId, setSelectedAnswerId] = useState<
        string | undefined
    >();
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

    useEffect(() => {
        if (selectedAnswerId && hasSubmitted) {
            const selectedAnswer = answers.find(
                (answer) => answer.id === selectedAnswerId,
            );
            selectedAnswer &&
                setSelectedGlobalAnswers({
                    questionId: id,
                    answer: selectedAnswer,
                });
        }
    }, [selectedAnswerId, hasSubmitted, answers]);

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
                            {`${number}.`}
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
                <Answers
                    id={id}
                    answers={answers}
                    hasSubmitted={hasSubmitted}
                    selectedAnswerId={selectedAnswerId}
                    setSelectedAnswerId={setSelectedAnswerId}
                />
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
                        size="small"
                        data-testid={`submit-question-${id}`}
                        onClick={() => {
                            setHasSubmitted(true);
                        }}
                        onKeyDown={(e) => {
                            const spaceKey = 32;
                            const enterKey = 13;
                            if (
                                e.keyCode === spaceKey ||
                                e.keyCode === enterKey
                            ) {
                                setHasSubmitted(true);
                            }
                        }}
                    >
                        Reveal
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
    selectedAnswerId,
    setSelectedAnswerId,
}: {
    answers: AnswerType[];
    id: string;
    hasSubmitted: boolean;
    selectedAnswerId?: string;
    setSelectedAnswerId: (selectedAnswerId: string) => void;
}) => {
    if (hasSubmitted) {
        return (
            <Fragment>
                {answers.map((answer) => {
                    const isSelected = selectedAnswerId === answer.id;

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
                        data-answer-type={
                            selectedAnswerId === answer.id
                                ? 'selected-enabled-answer'
                                : 'unselected-enabled-answer'
                        }
                        name={questionId}
                        label={answer.text}
                        onChange={() => setSelectedAnswerId(answer.id)}
                        checked={selectedAnswerId === answer.id}
                    />
                ))}
            </RadioGroup>
        </div>
    );
};

const resultWrapperStyles = css`
    background-color: ${neutral[93]};
    margin-top: ${space[3]}px;
    margin-bottom: ${space[3]}px;
    padding: ${space[2]}px;
`;
const resultHeaderStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })}
    color: ${neutral[20]};
    padding-bottom: ${space[1]}px;
`;

const resultDescriptionStyles = css`
    ${textSans.medium()}
    color: ${neutral[46]};
    display: flex;
    flex-direction: column;
`;

const resultsNumberStyles = css`
    ${textSans.xxxlarge({ fontWeight: 'bold' })}
    color: ${sport[200]};
`;

export const Result = ({
    selectedGlobalAnswers,
    resultGroups,
    sharingIcons,
}: {
    selectedGlobalAnswers: {
        [questionId: string]: AnswerType;
    };
    resultGroups: ResultGroupsType[];
    sharingIcons?: JSX.Element;
}): JSX.Element => {
    const totalNumberOfQuestions = Object.keys(selectedGlobalAnswers).length;
    const numberOfCorrectAnswers = Object.keys(selectedGlobalAnswers).filter(
        (questionId) => selectedGlobalAnswers[questionId].isCorrect,
    ).length;
    const resultGroup = resultGroups.reduce(
        (acc: null | ResultGroupsType, cur: ResultGroupsType) => {
            if (!acc) return cur;

            // In the case we have the exact numberOfCorrectAnswers
            if (acc.minScore === numberOfCorrectAnswers) return acc;
            if (cur.minScore === numberOfCorrectAnswers) return cur;

            // if `cur` has a closer score than `acc`
            if (
                acc.minScore < cur.minScore &&
                cur.minScore < numberOfCorrectAnswers
            )
                return cur;

            return acc;
        },
        null,
    );
    return (
        <div className={resultWrapperStyles}>
            <p className={resultDescriptionStyles}>
                <span>You got...</span>
                <span
                    className={resultsNumberStyles}
                >{`${numberOfCorrectAnswers}/${totalNumberOfQuestions}`}</span>
                {resultGroup && <span>{resultGroup.title}</span>}
            </p>
            {sharingIcons && (
                <Fragment>
                    <hr />
                    <div className={resultHeaderStyles}>
                        Challenge your friends
                    </div>
                    {sharingIcons}
                </Fragment>
            )}
        </div>
    );
};
