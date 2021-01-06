import React from 'react';
import { css } from 'emotion';

import { SvgCheckmark, SvgCross } from '@guardian/src-icons';
import { neutral, news, success } from '@guardian/src-foundations/palette';
import { body, textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';

// We export Radio wrapper styles to override Source Radio buttons to align
// with our custom answers for the quiz
export const radioButtonWrapperStyles = css`
    label {
        padding-top: ${space[3]}px;
        padding-bottom: ${space[3]}px;
        padding-left: ${space[2]}px;
        padding-right: ${space[2]}px;

        margin-bottom: ${space[2]}px;

        background-color: ${neutral[97]};

        :hover {
            background-color: ${neutral[86]};
        }
        /* TODO: apply same styles on focus (requires source update) */

        span {
            ${body.medium()};
        }
    }
`;

const AnswerWithSVG = ({
    id,
    text,
    supplementText,
    isCorrect,
    answerType,
}: {
    id: string;
    text: string;
    supplementText?: string;
    isCorrect: boolean;
    answerType: string;
}): JSX.Element => (
    <div
        className={css`
            display: flex;
            flex-direction: row;

            margin-bottom: ${space[2]}px;

            padding-top: ${space[3]}px;
            padding-bottom: ${space[3]}px;
            padding-right: ${space[4]}px;
            padding-left: ${space[3]}px;

            background-color: ${isCorrect ? success[400] : news[400]};
        `}
    >
        <div
            className={css`
                margin-right: ${space[1]}px;

                height: ${space[6]}px;
                svg {
                    fill: ${neutral[100]};
                    height: ${space[6]}px;
                    width: ${space[6]}px;
                }
            `}
        >
            {isCorrect ? <SvgCheckmark /> : <SvgCross />}
        </div>
        <label
            className={css`
                color: ${neutral[100]};
                display: flex;
                flex-direction: column;

                ${body.medium()};
            `}
            id={id}
            data-answer-type={answerType}
        >
            <span
                className={css`
                    ${body.medium()};
                `}
            >
                {text}
            </span>
            {supplementText && (
                <span
                    className={css`
                        ${textSans.xsmall()}
                    `}
                >
                    {supplementText}
                </span>
            )}
        </label>
    </div>
);

const AnswerWithoutSVG = ({
    id,
    text,
    supplementText,
    isCorrect,
    answerType,
}: {
    id: string;
    text: string;
    supplementText?: string;
    isCorrect?: boolean;
    answerType: string;
}): JSX.Element => (
    <div
        className={css`
            ${body.medium()};
            background-color: ${isCorrect ? success[500] : neutral[97]};

            display: flex;
            flex-direction: row;

            margin-bottom: ${space[2]}px;

            padding-top: ${space[3]}px;
            padding-bottom: ${space[3]}px;
            padding-right: ${space[2]}px;
            padding-left: ${space[9]}px;
        `}
    >
        <label
            className={css`
                margin-left: ${space[1]}px;
                display: flex;
                flex-direction: column;
            `}
            id={id}
            data-answer-type={answerType}
        >
            <span
                className={css`
                    ${body.medium()};
                `}
            >
                {text}
            </span>
            {supplementText && (
                <span
                    className={css`
                        ${textSans.xsmall()}
                    `}
                >
                    {supplementText}
                </span>
            )}
        </label>
    </div>
);

export const CorrectSelectedAnswer = ({
    answerText,
    explainerText,
    id,
}: {
    answerText: string;
    explainerText: string;
    id: string;
}): JSX.Element => (
    <AnswerWithoutSVG
        id={id}
        text={answerText}
        supplementText={explainerText}
        isCorrect={true}
        answerType="correct-selected-answer"
    />
);

export const IncorrectAnswer = ({
    answerText,
    id,
}: {
    answerText: string;
    id: string;
}): JSX.Element => (
    <AnswerWithSVG
        id={id}
        text={answerText}
        isCorrect={false}
        answerType="incorrect-answer"
    />
);

export const NonSelectedCorrectAnswer = ({
    answerText,
    explainerText,
    id,
}: {
    answerText: string;
    explainerText: string;
    id: string;
}): JSX.Element => (
    <AnswerWithSVG
        id={id}
        text={answerText}
        supplementText={explainerText}
        isCorrect={true}
        answerType="non-selected-correct-answer"
    />
);

export const UnselectedAnswer = ({
    id,
    answerText,
}: {
    answerText: string;
    id: string;
}): JSX.Element => (
    <AnswerWithoutSVG
        id={id}
        text={answerText}
        answerType="unselected-disabled-answer"
    />
);
