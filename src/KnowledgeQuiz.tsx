import React, { useState, Fragment, useEffect } from 'react';
import { css } from '@emotion/react';

import { body, textSans } from '@guardian/src-foundations/typography';
import { neutral, brand } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';
import { RadioGroup, Radio } from '@guardian/src-radio';
import { Button } from '@guardian/src-button';

import { SharingUrlsType } from './types';
import { SharingIcons } from './SharingIcons';

import {
    CorrectSelectedAnswer,
    IncorrectAnswer,
    NonSelectedCorrectAnswer,
    UnselectedAnswer,
    radioButtonWrapperStyles,
} from './Answers';
import { Theme, Special } from '@guardian/types';

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
    sharingUrls: SharingUrlsType;
    theme: Theme;
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
    sharingUrls,
    theme,
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
                        sharingUrls={sharingUrls}
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
                    theme={theme}
                />
            ))}
            {haveAllQuestionsBeenAnswered && (
                <div data-testid="quiz-results-block-top">
                    <Result
                        quizSelection={quizSelection}
                        resultGroups={resultGroups}
                        sharingUrls={sharingUrls}
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
    theme,
}: QuestionType & {
    number: number;
    quizSelection: QuizSelectionType;
    setQuizSelection: (quizSelection: QuizSelectionType) => void;
    theme: Theme;
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
                ${theme === Special.Labs ? textSans.medium() : body.medium()};
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
                    theme={theme}
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
    theme,
}: {
    answers: AnswerType[];
    id: string;
    hasSubmitted: boolean;
    selectedAnswerId?: string;
    setSelectedAnswerId: (selectedAnswerId: string) => void;
    theme: Theme;
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
                                    theme={theme}
                                />
                            );
                        }

                        if (!answer.isCorrect) {
                            return (
                                <IncorrectAnswer
                                    key={answer.id}
                                    id={answer.id}
                                    answerText={answer.text}
                                    theme={theme}
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
                                theme={theme}
                            />
                        );
                    }

                    return (
                        <UnselectedAnswer
                            key={answer.id}
                            id={answer.id}
                            answerText={answer.text}
                            theme={theme}
                        />
                    );
                })}
            </Fragment>
        );
    }

    return (
        <div css={radioButtonWrapperStyles(theme)}>
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
    display: flex;
    flex-direction: column;
`;

const resultsNumberStyles = css`
    ${textSans.xxxlarge({ fontWeight: 'bold' })}
    color: ${brand[400]};
`;

const resultHeaderStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })}
    color: ${neutral[20]};
    padding-bottom: ${space[1]}px;
`;

export const Result = ({
    quizSelection,
    resultGroups,
    sharingUrls,
}: {
    quizSelection: {
        [questionId: string]: AnswerType;
    };
    resultGroups: ResultGroupsType[];
    sharingUrls: SharingUrlsType;
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
            <div css={resultDescriptionStyles}>
                <span>You got...</span>
                <span
                    css={resultsNumberStyles}
                >{`${numberOfCorrectAnswers}/${totalNumberOfQuestions}`}</span>
                {bestResultGroup && <span>{bestResultGroup.title}</span>}
            </div>

            <hr />
            <div css={resultHeaderStyles}>Challenge your friends</div>
            <SharingIcons
                sharingUrls={sharingUrls}
                displayIcons={[
                    'facebook',
                    'twitter',
                    'email',
                    'whatsApp',
                    'messenger',
                    'linkedIn',
                    'pinterest',
                ]}
            />
        </div>
    );
};
