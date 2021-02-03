import { useState, useEffect } from 'react';
import { css } from '@emotion/core';

import { body, textSans } from '@guardian/src-foundations/typography';
import { neutral, brand } from '@guardian/src-foundations/palette';
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
};

type ResultGroupsType = {
    title: string;
    shareText: string;
    minScore: number;
    id: string;
};

type QuizSelectionType = {
    [questionId: string]: AnswerType;
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
}: QuizAtomType): JSX.Element => {
    const [quizSelection, setQuizSelection] = useState<QuizSelectionType>({});

    const haveAllQuestionsBeenAnswered =
        Object.keys(quizSelection).length === questions.length;

    return (
        <form data-atom-id={id} data-atom-type="knowledgequiz">
            {haveAllQuestionsBeenAnswered && (
                <div data-testid="quiz-results-block-top">
                    <Result
                        quizSelection={quizSelection}
                        resultGroups={resultGroups}
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
                    quizSelection={quizSelection}
                    setQuizSelection={setQuizSelection}
                />
            ))}
            {haveAllQuestionsBeenAnswered && (
                <div data-testid="quiz-results-block-top">
                    <Result
                        quizSelection={quizSelection}
                        resultGroups={resultGroups}
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
    quizSelection,
    setQuizSelection,
}: QuestionType & {
    number: number;
    quizSelection: QuizSelectionType;
    setQuizSelection: (quizSelection: QuizSelectionType) => void;
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
                setQuizSelection({
                    ...quizSelection,
                    [id]: selectedAnswer,
                });
        }
    }, [selectedAnswerId, setQuizSelection, hasSubmitted, answers]);

    return (
        <div
            css={css`
                ${body.medium()};
            `}
        >
            <fieldset css={fieldsetStyle}>
                <div>
                    <legend
                        css={css`
                            margin-bottom: 12px;
                        `}
                    >
                        <span
                            css={css`
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
                        css={css`
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
                    css={css`
                        display: flex;
                        flex-direction: row;
                        margin-bottom: 8px;
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
                        onKeyDown={(
                            e: React.KeyboardEvent<HTMLButtonElement>,
                        ) => {
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
            <>
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
            </>
        );
    }

    return (
        <div css={radioButtonWrapperStyles}>
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

const resultDescriptionStyles = css`
    ${textSans.medium()}
    color: ${neutral[46]};
    display: flex;
    flex-direction: column;
`;

const resultsNumberStyles = css`
    ${textSans.xxxlarge({ fontWeight: 'bold' })}
    color: ${brand[400]};
`;

export const Result = ({
    quizSelection,
    resultGroups,
}: {
    quizSelection: {
        [questionId: string]: AnswerType;
    };
    resultGroups: ResultGroupsType[];
}): JSX.Element => {
    const totalNumberOfQuestions = Object.keys(quizSelection).length;
    const numberOfCorrectAnswers = Object.keys(quizSelection).filter(
        (questionId) => quizSelection[questionId].isCorrect,
    ).length;

    let bestResultGroup: ResultGroupsType | undefined;
    resultGroups.forEach((resultGroup) => {
        if (!bestResultGroup) bestResultGroup = resultGroup;

        // In the case we have the exact numberOfCorrectAnswers
        if (resultGroup.minScore === numberOfCorrectAnswers)
            bestResultGroup = resultGroup;
        if (bestResultGroup.minScore === numberOfCorrectAnswers) return; // do nothing

        // if `cur` has a closer score than `acc`
        if (
            bestResultGroup.minScore < resultGroup.minScore &&
            resultGroup.minScore < numberOfCorrectAnswers
        )
            return resultGroup;
    });

    return (
        <div css={resultWrapperStyles}>
            <p css={resultDescriptionStyles}>
                <span>You got...</span>
                <span
                    css={resultsNumberStyles}
                >{`${numberOfCorrectAnswers}/${totalNumberOfQuestions}`}</span>
                {bestResultGroup && <span>{bestResultGroup.title}</span>}
            </p>
        </div>
    );
};
