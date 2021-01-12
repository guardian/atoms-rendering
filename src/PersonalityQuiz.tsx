import React, {
    useState,
    KeyboardEvent,
    useEffect,
    MouseEvent,
    Fragment,
} from 'react';
import { css, cx } from 'emotion';

import { body, textSans } from '@guardian/src-foundations/typography';
import { Button } from '@guardian/src-button';
import { text, neutral } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';
import { RadioGroup, Radio } from '@guardian/src-radio';

import { radioButtonWrapperStyles } from './Answers';

type ResultsBucket = {
    id: string;
    title: string;
    description: string;
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
    sharingIcons?: JSX.Element;
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
    const bucketCounter: { [key: string]: number } = {};

    const answersFromQuestion: AnswerType[] = Object.keys(selectedAnswers)
        .map((questionId: string): AnswerType | undefined => {
            const selectedQuestion = questions.find(
                (question) => question.id === questionId,
            );
            const answerId = selectedAnswers[questionId];
            const selectedAnswer =
                selectedQuestion &&
                selectedQuestion.answers.find(
                    (answer) => answer.id === answerId,
                );
            return selectedAnswer;
        })
        .filter(
            (selectedAnswer): boolean => selectedAnswer !== undefined,
        ) as AnswerType[];

    answersFromQuestion.forEach((answerFromQuestion) => {
        answerFromQuestion.answerBuckets.forEach((answerBucket) => {
            if (answerBucket in bucketCounter) {
                bucketCounter[answerBucket] = bucketCounter[answerBucket] + 1;
            } else {
                bucketCounter[answerBucket] = 1;
            }
        });
    });

    let bucketIdWithHighestCount: string | undefined;
    Object.keys(bucketCounter).forEach((bucketId) => {
        if (!bucketIdWithHighestCount) {
            bucketIdWithHighestCount = bucketId;
            return;
        }

        bucketIdWithHighestCount =
            bucketCounter[bucketId] > bucketCounter[bucketIdWithHighestCount]
                ? bucketId
                : bucketIdWithHighestCount;
    });

    return bucketIdWithHighestCount as string;
};

export const PersonalityQuizAtom = ({
    id,
    questions,
    resultBuckets,
    sharingIcons,
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

    const onSubmit = (e: MouseEvent | KeyboardEvent) => {
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
                    <Result
                        resultBuckets={topSelectedResult}
                        sharingIcons={sharingIcons}
                    />
                </div>
            )}
            {questions.map((question, idx) => (
                <PersonalityQuizAnswers
                    key={question.id}
                    id={question.id}
                    questionNumber={idx + 1}
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
                    hasSubmittedAnswers={hasSubmittedAnswers}
                />
            ))}
            {hasMissingAnswers && <MissingAnswers />}
            {hasSubmittedAnswers && topSelectedResult && (
                <div data-testid="quiz-results-block-bottom">
                    <Result
                        resultBuckets={topSelectedResult}
                        sharingIcons={sharingIcons}
                    />
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
                    onKeyDown={(e: any) => {
                        const spaceKey = 32;
                        const enterKey = 13;
                        if (e.keyCode === spaceKey || e.keyCode === enterKey)
                            onSubmit(e);
                    }}
                    data-testid="submit-quiz"
                >
                    Submit
                </Button>
                <Button
                    priority="secondary"
                    onClick={() => {
                        setSelectedAnswers({});
                        setHasSubmittedAnswers(false);
                        setTopSelectedResult(null);
                    }}
                    onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
                        const spaceKey = 32;
                        const enterKey = 13;
                        if (e.keyCode === spaceKey || e.keyCode === enterKey) {
                            setSelectedAnswers({});
                            setHasSubmittedAnswers(false);
                            setTopSelectedResult(null);
                        }
                    }}
                    data-testid="reset-quiz"
                >
                    Reset
                </Button>
            </div>
        </form>
    );
};

type PersonalityQuizAnswersProps = {
    id: string;
    questionNumber: number;
    text: string;
    imageUrl?: string;
    answers: AnswerType[];
    updateSelectedAnswer: (selectedAnswerId: string) => void;
    selectedAnswer?: string;
    hasSubmittedAnswers: boolean;
};

const PersonalityQuizAnswers = ({
    id: questionId,
    questionNumber,
    text,
    imageUrl,
    answers,
    updateSelectedAnswer,
    selectedAnswer,
    hasSubmittedAnswers,
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
                    {questionNumber + '.'}
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
            className={cx(
                radioButtonWrapperStyles,
                css`
                    label {
                        :hover {
                            background-color: ${hasSubmittedAnswers
                                ? neutral[97]
                                : neutral[86]};
                        }
                        /* TODO: apply same styles on focus (requires source update) */
                    }
                `,
            )}
        >
            <RadioGroup name={questionId}>
                {answers.map((answer) => (
                    <Radio
                        key={answer.id}
                        value={answer.text}
                        label={answer.text}
                        data-testid={answer.id}
                        data-answer-type={
                            selectedAnswer === answer.id
                                ? 'selected-enabled-answer'
                                : 'unselected-enabled-answer'
                        }
                        disabled={hasSubmittedAnswers}
                        onChange={() => updateSelectedAnswer(answer.id)}
                        checked={selectedAnswer === answer.id}
                    />
                ))}
            </RadioGroup>
        </div>
    </fieldset>
);

const missingAnswersStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })}
    padding-bottom: ${space[3]}px;
    color: ${text.error};
`;

export const MissingAnswers = (): JSX.Element => (
    <div className={missingAnswersStyles}>
        You have not answered all the questions.
    </div>
);

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
`;

export const Result = ({
    resultBuckets,
    sharingIcons,
}: {
    resultBuckets: ResultsBucket;
    sharingIcons?: JSX.Element;
}): JSX.Element => (
    <div className={resultWrapperStyles}>
        <div className={resultHeaderStyles}>{resultBuckets.title}</div>
        <div className={resultDescriptionStyles}>
            {resultBuckets.description}
        </div>
        {sharingIcons && (
            <Fragment>
                <hr />
                <div className={resultHeaderStyles}>Challenge your friends</div>
                {sharingIcons}
            </Fragment>
        )}
    </div>
);
