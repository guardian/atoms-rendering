import React, { useState, KeyboardEvent } from 'react';
import { css, cx } from 'emotion';

import { SvgCheckmark, SvgCross } from '@guardian/src-icons';
import { neutral, news } from '@guardian/src-foundations/palette';
import { body, textSans } from '@guardian/src-foundations/typography';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';
import { focusHalo } from '@guardian/src-foundations/accessibility';

import {
    QuizAtomType,
    Question as QuestionType,
    Answer as AnswerType,
} from './types';

const neutralBackgroundColour = css`
    background-color: ${neutral[97]};
`;
const darkerNeutralBackgroundColour = css`
    background-color: ${neutral[86]};
`;
const opaqueGreenBackgroundColour = css`
    background-color: rgb(61, 181, 64);
`;
const translucentGreenBackgroundColour = css`
    background-color: rgb(61, 181, 64, 0.6);
`;
const redBackgroundColour = css`
    background-color: ${news[400]};
`;

const commonLabelStyle = css`
    svg {
        width: 30px;
        height: 30px;
    }
    display: block;
    padding: 0.75rem 1.25rem;
    transition: background-colour 100ms;
`;

const focusLabelStyle = css`
    cursor: pointer;
    ${neutralBackgroundColour};
    :hover {
        ${darkerNeutralBackgroundColour};
    }
    :focus {
        ${focusHalo}
        ${darkerNeutralBackgroundColour};
    }
`;

const commonTextStyle = css`
    padding-left: 8px;
    padding-top: 0;
    min-height: auto;
`;

const blackColour = css`
    color: ${neutral[7]};
`;
const whiteColour = css`
    color: ${neutral[100]};
`;
const revealTextStyle = css`
    ${textSans.xsmall()}
`;

const fieldsetStyle = css`
    margin-bottom: 12px;
    border: 0px;
    padding: 0px;
`;

const questionStyle = css`
    display: flex;
    div {
        padding-right: 0.5ch;
    }
    legend {
        margin-bottom: 12px;
    }
    span {
        padding-right: 12px;
    }
`;

const answerStyle = css`
    display: flex;
    div {
        display: flex;
        flex-direction: column;
    }
`;

const iconStyle = css`
    height: 26px;
    svg {
        fill: ${neutral[100]};
        height: 26px;
        width: 26px;
        view-box: '0 0 26px 26px';
    }
`;

const IconWrapper = (el: JSX.Element) => <div className={iconStyle}>{el}</div>;

export const QuizAtom = ({ id, questions }: QuizAtomType): JSX.Element => {
    console.log(`rendered atom`);
    return (
        <div data-atom-id={id}>
            <form>
                {questions.map((question, idx) => (
                    <Question
                        key={question.id}
                        id={question.id}
                        number={idx + 1}
                        text={question.text}
                        imageUrl={question.imageUrl}
                        answers={question.answers}
                    />
                ))}
            </form>
        </div>
    );
};

export type QuestionProps = {
    number: number;
};

export const Question = ({
    text,
    imageUrl,
    answers,
    number,
}: QuestionType & QuestionProps): JSX.Element => {
    const [chosen, setChosen] = useState<string | undefined>(undefined);

    return (
        <div
            className={css`
                ${body.medium()};
            `}
        >
            <fieldset className={fieldsetStyle}>
                <div className={questionStyle}>
                    <legend>
                        <span>{number + '.'}</span>
                        {text}
                    </legend>
                </div>
                {imageUrl && (
                    <img
                        className={css`
                            width: 100%;
                        `}
                        src={imageUrl}
                    ></img>
                )}
                <div>
                    {answers.map((answer) => (
                        <Answer
                            key={answer.id}
                            id={answer.id}
                            text={answer.text}
                            isCorrect={answer.isCorrect}
                            revealText={answer.revealText}
                            isChosen={chosen === answer.id}
                            setChosen={setChosen}
                            isAnswered={chosen !== undefined}
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
}: AnswerType & AnswerProps): JSX.Element => {
    const handleClick = () => setChosen(id);
    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !isAnswered) {
            setChosen(id);
        }
    };
    return (
        <div
            className={css`
                clear: both;
                margin-bottom: 6px;
                position: relative;
            `}
        >
            <input
                type="radio"
                tabIndex={-1}
                id={`answer-${id}`}
                required
                defaultChecked={isChosen}
                onClick={handleClick}
                disabled={isAnswered}
                className={css`
                    ${visuallyHidden};
                `}
            ></input>
            <label
                htmlFor={`answer-${id}`}
                tabIndex={0}
                className={cx({
                    [commonLabelStyle]: true,
                    [focusLabelStyle]: !isAnswered,
                    [opaqueGreenBackgroundColour]: isCorrect && isChosen,
                    [translucentGreenBackgroundColour]:
                        isCorrect && !isChosen && isAnswered,
                    [redBackgroundColour]: !isCorrect && isChosen,
                    [neutralBackgroundColour]: !isCorrect && !isChosen,
                })}
                onKeyPress={handleKeyPress}
            >
                <div className={answerStyle}>
                    {isAnswered &&
                        isChosen &&
                        (isCorrect
                            ? IconWrapper(<SvgCheckmark />)
                            : IconWrapper(<SvgCross />))}
                    <div>
                        <span
                            className={cx({
                                [commonTextStyle]: true,
                                [whiteColour]: isChosen,
                                [blackColour]: !isChosen,
                            })}
                        >
                            {text}
                        </span>
                        {isAnswered && revealText && (
                            <span
                                className={cx({
                                    [commonTextStyle]: true,
                                    [revealTextStyle]: true,
                                    [whiteColour]: isChosen,
                                    [blackColour]: !isChosen,
                                })}
                            >
                                {revealText}
                            </span>
                        )}
                    </div>
                </div>
            </label>
        </div>
    );
};

const selectableAnswerStyles = css`
    :hover {
        background-color: ${neutral[86]};
        cursor: pointer;
    }
    :focus {
        background-color: ${neutral[86]};
        ${focusHalo}
    }
`;

export const UnselectedAnswer = ({
    onClick,
    disabled,
    answerText,
    onKeyPress,
}: {
    onClick: () => void;
    onKeyPress: () => void;
    disabled: boolean;
    answerText: string;
}): JSX.Element => (
    <>
        <label
            className={css`
                ${body.medium()};
                background-color: ${neutral[97]};
                ${!disabled ? selectableAnswerStyles : ''}

                margin-bottom: 6px;
                padding-top: 12px;
                padding-bottom: 12px;
                padding-left: 20px;
                padding-right: 20px;
            `}
            onKeyPress={onKeyPress}
            tabIndex={0}
        >
            {answerText}
        </label>
        <input
            type="radio"
            tabIndex={-1}
            // id={`answer-${id}`}
            required
            // defaultChecked={isChosen}
            onClick={onClick}
            disabled={disabled}
            className={css`
                ${visuallyHidden};
            `}
        />
    </>
);

export const CorrectSelectedAnswer = ({
    answerText,
    explainerText,
}: {
    answerText: string;
    explainerText: string;
}): JSX.Element => (
    <div
        className={css`
            display: flex;
            flex-direction: row;

            margin-bottom: 6px;
            padding-top: 12px;
            padding-bottom: 12px;
            padding-left: 20px;
            padding-right: 20px;

            background-color: rgb(61, 181, 64);
        `}
    >
        <div className={iconStyle}>
            <SvgCheckmark />
        </div>
        <label
            className={css`
                color: ${neutral[100]};

                display: flex;
                flex-direction: column;
            `}
        >
            <span
                className={css`
                    ${body.medium()};
                `}
            >
                {answerText}
            </span>
            <span
                className={css`
                    ${textSans.xsmall()}
                `}
            >
                {explainerText}
            </span>
        </label>
    </div>
);

export const NonSelectedCorrectAnswer = ({
    answerText,
    explainerText,
}: {
    answerText: string;
    explainerText: string;
}): JSX.Element => (
    <div
        className={css`
            display: flex;
            flex-direction: row;

            margin-bottom: 6px;
            padding-top: 12px;
            padding-bottom: 12px;
            padding-left: 20px;
            padding-right: 20px;

            background-color: rgb(61, 181, 64, 0.6);
        `}
    >
        <label
            className={css`
                color: ${neutral[0]};

                display: flex;
                flex-direction: column;
            `}
        >
            <span
                className={css`
                    ${body.medium()};
                `}
            >
                {answerText}
            </span>
            <span
                className={css`
                    ${textSans.xsmall()}
                `}
            >
                {explainerText}
            </span>
        </label>
    </div>
);
