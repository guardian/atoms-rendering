import React, { useState, KeyboardEvent } from 'react';
import { css } from 'emotion';

import { body } from '@guardian/src-foundations/typography';

import {
    CorrectSelectedAnswer,
    IncorrectAnswer,
    NonSelectedCorrectAnswer,
    UnselectedAnswer,
    SelectedAnswer,
} from './Answers';

type QuizType = 'knowledge' | 'personality';

export type AnswerType = {
    id: string;
    text: string;
    revealText?: string;
    isCorrect: boolean;
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
    quizType: QuizType;
};

const fieldsetStyle = css`
    margin-bottom: 12px;
    border: 0px;
    padding: 0px;
`;

export const QuizAtom = ({
    id,
    questions,
    quizType,
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
                quizType={quizType}
            />
        ))}
    </form>
);

const KnowledgeAnswers = ({ answers }: { answers: AnswerType[] }) => {
    const [selected, setSelected] = useState<string | undefined>(undefined);
    return (
        <>
            {answers.map((answer) => {
                const isAnswered = selected !== undefined;
                const isSelected = selected === answer.id;

                if (isAnswered) {
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
                            disabled={true}
                            answerText={answer.text}
                        />
                    );
                }

                return (
                    <UnselectedAnswer
                        key={answer.id}
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
        </>
    );
};

const PersonalityAnswers = ({ answers }: { answers: AnswerType[] }) => {
    const [selected, setSelected] = useState<string | undefined>(undefined);
    return (
        <>
            {answers.map((answer) => {
                const isSelected = selected === answer.id;
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
                        onClick={() => setSelected(answer.id)}
                        onKeyPress={(e: KeyboardEvent) => {
                            if (e.key === 'Enter') {
                                setSelected(answer.id);
                            }
                        }}
                    />
                );
            })}
        </>
    );
};

export type QuestionProps = {
    number: number;
    quizType: QuizType;
};

export const Question = ({
    text,
    imageUrl,
    answers,
    number,
    quizType,
}: QuestionType & QuestionProps): JSX.Element => (
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
                {quizType === 'knowledge' && (
                    <KnowledgeAnswers answers={answers} />
                )}
                {quizType === 'personality' && (
                    <PersonalityAnswers answers={answers} />
                )}
            </div>
        </fieldset>
    </div>
);
