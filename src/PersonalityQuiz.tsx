import React, { useState, KeyboardEvent, useEffect, MouseEvent } from 'react';
import { css } from 'emotion';

import { body, textSans } from '@guardian/src-foundations/typography';
import { Button } from '@guardian/src-button';
import { text, brand } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';

import { UnselectedAnswer, SelectedAnswer } from './Answers';

type ResultsBucket = {
    id: string;
    title: string;
    description: string;
    // assets TODO:
};

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
    resultBuckets: ResultsBucket[];
};

const answersWrapperStyle = css`
    margin-bottom: 12px;
    border: 0px;
    padding: 0px;
    ${body.medium()};
`;

export const findMostReferredToBucketId = ({
    selectedAnswers,
    questions,
}: {
    selectedAnswers: {
        [key: string]: string;
    };
    questions: QuestionType[];
}): string => {
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
    return bucketIdWithHighestCount;
};

export const PersonalityQuizAtom = ({
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
    const [hasMissingAnswers, setHasMissingAnswers] = useState<boolean>(false);

    const [
        topSelectedResult,
        setTopSelectedResult,
    ] = useState<ResultsBucket | null>();

    const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // check all answers have been selected
        const missingAnswers = questions.some((question) =>
            question.id in selectedAnswers ? false : true,
        );

        if (missingAnswers) {
            setHasMissingAnswers(true);
        } else {
            setHasSubmittedAnswers(true);
        }
    };

    useEffect(() => {
        if (hasSubmittedAnswers && Object.keys(selectedAnswers).length) {
            const bucketIdWithHighestCount = findMostReferredToBucketId({
                selectedAnswers,
                questions,
            });
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
        <form data-atom-id={id}>
            {hasSubmittedAnswers && topSelectedResult && (
                <div data-testid="quiz-results-block-top">
                    <Result resultBuckets={topSelectedResult} />
                </div>
            )}
            {questions.map((question, idx) => (
                <PersonalityQuizAnswers
                    key={question.id}
                    id={question.id}
                    number={idx + 1}
                    text={question.text}
                    imageUrl={question.imageUrl}
                    answers={question.answers}
                    updateSelectedAnswer={(selectedAnswerId: string) => {
                        setHasMissingAnswers(false);
                        setSelectedAnswers({
                            ...selectedAnswers,
                            [question.id]: selectedAnswerId,
                        });
                    }}
                    selectedAnswer={
                        question.id in selectedAnswers
                            ? selectedAnswers[question.id]
                            : undefined
                    }
                />
            ))}
            {hasMissingAnswers && <MissingAnswers />}
            {hasSubmittedAnswers && topSelectedResult && (
                <div data-testid="quiz-results-block-bottom">
                    <Result resultBuckets={topSelectedResult} />
                </div>
            )}
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
                    onClick={onSubmit}
                    data-testid="submit-quiz"
                >
                    Submit
                </Button>
                <Button
                    onClick={() => {
                        setSelectedAnswers({});
                        setHasSubmittedAnswers(false);
                        setTopSelectedResult(null);
                    }}
                >
                    Reset
                </Button>
            </div>
        </form>
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

const missingAnswersStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })}
    padding-bottom: ${space[3]}px;
    color: ${text.error};
`;

export const MissingAnswers = (): JSX.Element => (
    <div className={missingAnswersStyles} data-testid="missing-answers">
        You have not answered all the questions.
    </div>
);

const resultWrapperStyles = css`
    background-color: ${brand[800]};
    margin-top: ${space[3]}px;
    margin-bottom: ${space[3]}px;
    padding: ${space[2]}px;
`;
const resultHeaderStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })}
    padding-bottom: ${space[1]}px;
`;

const resultDescriptionStyles = css`
    ${textSans.medium()}
`;

export const Result = ({
    resultBuckets,
}: {
    resultBuckets: ResultsBucket;
}): JSX.Element => (
    <div className={resultWrapperStyles}>
        <div className={resultHeaderStyles}>{resultBuckets.title}</div>
        <div className={resultDescriptionStyles}>
            {resultBuckets.description}
        </div>
    </div>
);
