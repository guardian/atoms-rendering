import React, { useState } from 'react';
import { SvgCheckmark, SvgCross } from '@guardian/src-icons';
import { css } from 'emotion';
import { neutral } from '@guardian/src-foundations/palette';
import { body } from '@guardian/src-foundations/typography';

import {
    QuizAtomType,
    Question as QuestionType,
    Answer as AnswerType,
} from './types';

const enum AnswerState {
    CorrectChosen,
    CorrectUnchosen,
    IncorrectChosen,
    IncorrectUnchosen,
    Unanswered,
}

const answerState = (
    isAnswered: boolean,
    isChosen: boolean,
    isCorrect: boolean,
) => {
    if (!isAnswered) {
        return AnswerState.Unanswered;
    } else if (isCorrect && isChosen) {
        return AnswerState.CorrectChosen;
    } else if (isCorrect && !isChosen) {
        return AnswerState.CorrectUnchosen;
    } else if (!isCorrect && isChosen) {
        return AnswerState.IncorrectChosen;
    } else {
        return AnswerState.IncorrectUnchosen;
    }
};

const neutralBackgroundColour = neutral[97];
const darkerNeutralBackgroundColour = neutral[86];
const correctBackgroundColour = '#3db540';
const incorrectBackgroundColour = '#c70000';

const commonLabelStyle = css`
    svg {
        width: 30px;
        height: 30px;
    }
    display: block;
    padding: 0.75rem 1.25rem;
    transition: background-colour 100ms;
`;

const unansweredLabel = css`
    cursor: pointer;
    background-color: ${neutralBackgroundColour};
    ${commonLabelStyle}
    background-color: ${neutralBackgroundColour};
    :hover {
        background-color: ${darkerNeutralBackgroundColour};
    }
`;

const correctChosenLabel = css`
    background-color: ${correctBackgroundColour};
    ${commonLabelStyle}
`;

const correctUnchosenLabel = css`
    background-color: ${correctBackgroundColour};
    ${commonLabelStyle}
    opacity: 0.8;
`;

const incorrectChosenLabel = css`
    background-color: ${incorrectBackgroundColour};
    ${commonLabelStyle}
`;

const incorrectUnchosenLabel = css`
    background-color: ${neutralBackgroundColour};
    ${commonLabelStyle}
`;

const labelStyle = (state: AnswerState) => {
    switch (state) {
        case AnswerState.Unanswered:
            return unansweredLabel;
        case AnswerState.CorrectChosen:
            return correctChosenLabel;
        case AnswerState.CorrectUnchosen:
            return correctUnchosenLabel;
        case AnswerState.IncorrectChosen:
            return incorrectChosenLabel;
        case AnswerState.IncorrectUnchosen:
            return incorrectUnchosenLabel;
        default:
            return commonLabelStyle;
    }
};

const commonTextStyle = css`
    padding-left: 8px;
    padding-top: 0;
    min-height: auto;
`;

const unchosenText = css`
    color: ${neutral[7]};
    ${commonTextStyle};
`;

const chosenText = css`
    color: ${neutral[100]};
    ${commonTextStyle};
`;

const textStyle = (state: AnswerState) => {
    switch (state) {
        case AnswerState.IncorrectChosen:
            return chosenText;
        case AnswerState.CorrectChosen:
            return chosenText;
        default:
            return unchosenText;
    }
};

const revealTextStyle = (state: AnswerState) => css`
    ${textStyle(state)}
    font-size: 0.75rem;
    font-family: 'Guardian Text Sans Web', 'Helvetica Neue', Helvetica, Arial,
        'Lucida Grande', sans-serif;
`;

const fieldsetStyle = css`
    margin-bottom: 12px;
    border: 0px;
    padding: 0px;
`;

// Will appear on screen readers
const visuallyHidden = css`
    border: 0 !important;
    clip: rect(0 0 0 0) !important;
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
`;

const iconStyle = css`
    svg {
        fill: ${neutral[100]};
        height: 26px;
        width: 26px;
        view-box: '0 0 26px 26px';
    }
`;

const fullWidthStyle = css`
    width: 100%;
`;

const IconWrapper = (el: JSX.Element) => <div className={iconStyle}>{el}</div>;

export const QuizAtom = ({ id, questions }: QuizAtomType): JSX.Element => (
    <div data-atom-id={id}>
        <form>
            {questions.map((question) => (
                <Question
                    key={question.id}
                    number={questions.indexOf(question) + 1}
                    {...question}
                />
            ))}
        </form>
    </div>
);

export type QuestionProps = {
    number: number;
};

export const Question = ({
    text,
    imageUrl,
    answers,
    number,
}: QuestionType & QuestionProps): JSX.Element => {
    const [Chosen, setChosen] = useState<string | undefined>(undefined);

    return (
        <div
            className={css`
                ${body.medium()}
            `}
        >
            <fieldset className={fieldsetStyle}>
                <div
                    className={css`
                        display: flex;
                    `}
                >
                    <div
                        className={css`
                            padding-right: 0.5ch;
                        `}
                    >
                        {number + '.'}
                    </div>
                    <legend
                        className={css`
                            margin-bottom: 12px;
                        `}
                    >
                        {text}
                    </legend>
                </div>
                {imageUrl && (
                    <img className={fullWidthStyle} src={imageUrl}></img>
                )}
                <div
                    className={css`
                        display: flex;
                        flex-direction: column;
                    `}
                >
                    {answers.map((answer) => (
                        <Answer
                            key={answer.id}
                            isChosen={Chosen === answer.id}
                            {...answer}
                            setChosen={setChosen}
                            isAnswered={Chosen !== undefined}
                        />
                    ))}
                </div>
            </fieldset>
        </div>
    );
};

type AnswerProps = {
    isChosen: boolean;
    setChosen: React.Dispatch<React.SetStateAction<string | undefined>>;
    isAnswered: boolean;
};

export const Answer = ({
    id,
    text,
    isCorrect,
    revealText,
    isChosen,
    setChosen,
    isAnswered,
}: AnswerType & AnswerProps): JSX.Element => (
    <div
        className={css`
            clear: both;
            margin-bottom: 6px;
        `}
    >
        <input
            type="radio"
            id={`answer-${id}`}
            required
            checked={isChosen}
            onClick={() => setChosen(id)}
            disabled={isAnswered}
            className={visuallyHidden}
        ></input>
        <label
            htmlFor={`answer-${id}`}
            className={labelStyle(answerState(isAnswered, isChosen, isCorrect))}
        >
            <div
                className={css`
                    display: flex;
                `}
            >
                {isAnswered &&
                    isChosen &&
                    (isCorrect
                        ? IconWrapper(<SvgCheckmark />)
                        : IconWrapper(<SvgCross />))}
                <div
                    className={css`
                        display: flex;
                        flex-direction: column;
                    `}
                >
                    <span
                        className={textStyle(
                            answerState(isAnswered, isChosen, isCorrect),
                        )}
                    >
                        {text}
                    </span>
                    {isAnswered && revealText && (
                        <span
                            className={revealTextStyle(
                                answerState(isAnswered, isChosen, isCorrect),
                            )}
                        >
                            {revealText}
                        </span>
                    )}
                </div>
            </div>
        </label>
    </div>
);
