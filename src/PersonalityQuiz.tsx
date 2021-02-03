import {
    useState,
    KeyboardEvent,
    useEffect,
    MouseEvent,
    Fragment,
    memo,
} from 'react';
import { css } from '@emotion/core';

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
    selectedGlobalAnswers,
    questions,
}: {
    selectedGlobalAnswers: {
        [key: string]: string;
    };
    questions: QuestionType[];
}): string => {
    const bucketCounter: { [key: string]: number } = {};

    const answersFromQuestion: AnswerType[] = Object.keys(selectedGlobalAnswers)
        .map((questionId: string): AnswerType | undefined => {
            const selectedQuestion = questions.find(
                (question) => question.id === questionId,
            );
            const answerId = selectedGlobalAnswers[questionId];
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
    const [selectedGlobalAnswers, setSelectedGlobalAnswers] = useState<{
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
            question.id in selectedGlobalAnswers ? false : true,
        );

        if (missingAnswers) {
            setHasMissingAnswers(true);
        } else {
            setHasSubmittedAnswers(true);
        }
    };

    useEffect(() => {
        if (hasSubmittedAnswers && Object.keys(selectedGlobalAnswers).length) {
            const bucketIdWithHighestCount = findMostReferredToBucketId({
                selectedGlobalAnswers,
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
        selectedGlobalAnswers,
        setTopSelectedResult,
        resultBuckets,
    ]);

    return (
        <form data-atom-id={id} data-atom-type="personalityquiz">
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
                        setSelectedGlobalAnswers({
                            ...selectedGlobalAnswers,
                            [question.id]: selectedAnswerId,
                        });
                    }}
                    globallySelectedAnswer={
                        question.id in selectedGlobalAnswers
                            ? selectedGlobalAnswers[question.id]
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
                css={css`
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
                    onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
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
                        setSelectedGlobalAnswers({});
                        setHasSubmittedAnswers(false);
                        setTopSelectedResult(null);
                    }}
                    onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
                        const spaceKey = 32;
                        const enterKey = 13;
                        if (e.keyCode === spaceKey || e.keyCode === enterKey) {
                            setSelectedGlobalAnswers({});
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
    globallySelectedAnswer?: string;
    hasSubmittedAnswers: boolean;
};

const PersonalityQuizAnswers = ({
    id: questionId,
    questionNumber,
    text,
    imageUrl,
    answers,
    updateSelectedAnswer,
    globallySelectedAnswer,
    hasSubmittedAnswers,
}: PersonalityQuizAnswersProps) => {
    // use local state to avoid re-renders of AnswersGroup from updates due to: updateSelectedAnswer & selectedAnswer
    const [selectedAnswer, setSelectedAnswers] = useState<string | undefined>();

    useEffect(() => {
        if (selectedAnswer && selectedAnswer !== globallySelectedAnswer) {
            updateSelectedAnswer(selectedAnswer);
        }
    }, [updateSelectedAnswer, selectedAnswer]);

    // in order to reset selection
    useEffect(() => {
        if (!globallySelectedAnswer) setSelectedAnswers(undefined);
    }, [globallySelectedAnswer, setSelectedAnswers]);

    return (
        <fieldset css={answersWrapperStyle}>
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
                        {questionNumber + '.'}
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
            <AnswersGroup
                hasSubmittedAnswers={hasSubmittedAnswers}
                questionId={questionId}
                answers={answers}
                selectedAnswer={selectedAnswer}
                setSelectedAnswers={setSelectedAnswers}
            />
        </fieldset>
    );
};

type AnswersGroupProp = {
    hasSubmittedAnswers: boolean;
    questionId: string;
    answers: AnswerType[];
    selectedAnswer: string | undefined;
    setSelectedAnswers: (selectedAnswerId: string) => void;
};

const AnswersGroup = memo(
    ({
        hasSubmittedAnswers,
        questionId,
        answers,
        selectedAnswer,
        setSelectedAnswers,
    }: AnswersGroupProp) => (
        <div
            css={[
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
            ]}
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
                        onChange={() => setSelectedAnswers(answer.id)}
                        checked={selectedAnswer === answer.id}
                    />
                ))}
            </RadioGroup>
        </div>
    ),
);
AnswersGroup.displayName = 'AnswersGroup';

const missingAnswersStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })}
    padding-bottom: ${space[3]}px;
    color: ${text.error};
`;

export const MissingAnswers = (): JSX.Element => (
    <div css={missingAnswersStyles}>
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
    <div css={resultWrapperStyles}>
        <div css={resultHeaderStyles}>{resultBuckets.title}</div>
        <div css={resultDescriptionStyles}>{resultBuckets.description}</div>
        {sharingIcons && (
            <Fragment>
                <hr />
                <div css={resultHeaderStyles}>Challenge your friends</div>
                {sharingIcons}
            </Fragment>
        )}
    </div>
);
