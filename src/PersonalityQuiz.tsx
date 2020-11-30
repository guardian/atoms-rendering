import React, { useState, KeyboardEvent, useEffect } from 'react';
import { css } from 'emotion';

import { body } from '@guardian/src-foundations/typography';

import { UnselectedAnswer, SelectedAnswer } from './Answers';

type ResultsBucket = {
    id: string;
    title: string;
    description: string;
    // assets TODO:
};

export type AnswerType = {
    id: string;
    text: string;
    revealText?: string;
    isCorrect: boolean;
    answerBuckets: string[];
};

export type QuestionType = {
    id: string;
    text: string;
    answers: AnswerType[];
    imageUrl?: string;
};

export type QuizAtomType = {
    id: string;
    questions: QuestionType[];
    resultBuckets: ResultsBucket[];
};

const answersWrapperStyle = css`
    margin-bottom: 12px;
    border: 0px;
    padding: 0px;
    ${body.medium()};
`;

export const PersonalityQuiz = ({
    id,
    questions,
    resultBuckets,
}: QuizAtomType): JSX.Element => {
    const [selectedAnswers, setSelectedAnswers] = useState<{
        [key: string]: string;
    }>({});

    const [hasSubmittedAnswers, setHasSubmittedAnswers] = useState<boolean>(
        false,
    );

    const [
        topSelectedResult,
        setTopSelectedResult,
    ] = useState<ResultsBucket | null>();

    useEffect(() => {
        if (hasSubmittedAnswers) {
            // convert { [questionId]: answerId } to { [bucketId]: numberOfTimesSelected }
            const bucketCounter = Object.keys(selectedAnswers).reduce(
                (
                    acc: { [key: string]: number },
                    questionId: string,
                ): { [key: string]: number } => {
                    const selectedQuestion = questions.find(
                        (question) => question.id === questionId,
                    );

                    const answerId = selectedAnswers[questionId];
                    const selectedAnswer =
                        selectedQuestion &&
                        selectedQuestion.answers.find(
                            (answer) => answer.id === answerId,
                        );

                    selectedAnswer &&
                        selectedAnswer.answerBuckets.forEach((answerBucket) => {
                            if (answerBucket in acc) {
                                acc[answerBucket] = acc[answerBucket] + 1;
                            } else {
                                acc[answerBucket] = 1;
                            }
                        });

                    return acc;
                },
                {},
            );

            // use bucketCounter to select bucket with highest number of times selected
            const bucketIdWithHighestCount = Object.keys(bucketCounter).reduce(
                (acc, cur) => {
                    if (!acc) return cur;

                    return bucketCounter[cur] > bucketCounter[acc] ? cur : acc;
                },
            );

            setTopSelectedResult(
                resultBuckets.find(
                    (resultBucket) =>
                        resultBucket.id === bucketIdWithHighestCount,
                ),
            );
        } else {
            setTopSelectedResult(null);
        }
    }, [
        hasSubmittedAnswers,
        selectedAnswers,
        setTopSelectedResult,
        resultBuckets,
    ]);

    return (
        <>
            {hasSubmittedAnswers && topSelectedResult && (
                <Result resultBuckets={topSelectedResult} />
            )}
            <form data-atom-id={id}>
                {questions.map((question, idx) => (
                    <PersonalityQuizAnswers
                        key={question.id}
                        id={question.id}
                        number={idx + 1}
                        text={question.text}
                        imageUrl={question.imageUrl}
                        answers={question.answers}
                        updateSelectedAnswer={(selectedAnswerId: string) =>
                            setSelectedAnswers({
                                ...selectedAnswers,
                                [question.id]: selectedAnswerId,
                            })
                        }
                        selectedAnswer={
                            question.id in selectedAnswers
                                ? selectedAnswers[question.id]
                                : undefined
                        }
                    />
                ))}
                <button
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        setHasSubmittedAnswers(true);
                    }}
                    data-testid="submit-quiz"
                >
                    submit
                </button>
            </form>
        </>
    );
};

type PersonalityQuizAnswersProps = {
    id: string;
    number: number;
    text: string;
    imageUrl?: string;
    answers: AnswerType[];
    updateSelectedAnswer: (selectedAnswerId: string) => void;
    selectedAnswer?: string;
};

const PersonalityQuizAnswers = ({
    number,
    text,
    imageUrl,
    answers,
    updateSelectedAnswer,
    selectedAnswer,
}: PersonalityQuizAnswersProps) => (
    <fieldset className={answersWrapperStyle}>
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
            {answers.map((answer) => {
                const isSelected = selectedAnswer === answer.id;
                return isSelected ? (
                    <SelectedAnswer
                        key={answer.id}
                        id={answer.id}
                        answerText={answer.text}
                    />
                ) : (
                    <UnselectedAnswer
                        key={answer.id}
                        id={answer.id}
                        disabled={false}
                        answerText={answer.text}
                        onClick={() => updateSelectedAnswer(answer.id)}
                        onKeyPress={(e: KeyboardEvent) => {
                            if (e.key === 'Enter') {
                                updateSelectedAnswer(answer.id);
                            }
                        }}
                    />
                );
            })}
        </div>
    </fieldset>
);

const resultHeaderStyles = css``;
const resultDescriptionStyles = css``;

export const Result = ({ resultBuckets }: { resultBuckets: ResultsBucket }) => (
    <div data-testid={resultBuckets.id}>
        <div className={resultHeaderStyles}>{resultBuckets.title}</div>
        <div className={resultDescriptionStyles}>
            {resultBuckets.description}
        </div>
    </div>
);
