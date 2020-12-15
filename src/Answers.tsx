import React, { KeyboardEvent } from 'react';
import { css, cx } from 'emotion';

import { SvgCheckmark, SvgCross } from '@guardian/src-icons';
import {
    neutral,
    news,
    opinion,
    success,
} from '@guardian/src-foundations/palette';
import { body, textSans } from '@guardian/src-foundations/typography';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';
import { focusHalo } from '@guardian/src-foundations/accessibility';
import { space } from '@guardian/src-foundations';

const iconStyle = css`
    height: ${space[6]}px;
    svg {
        fill: ${neutral[100]};
        height: ${space[6]}px;
        width: ${space[6]}px;
    }
`;

const selectableAnswerStyles = css`
    /* used to aligne radioButtonStyle */
    position: relative;
    ::before {
        content: '';
        height: ${space[4]}px;
        width: ${space[4]}px;
        border-radius: ${space[4]}px;
        display: inline-block;
        position: absolute;
        left: ${space[4]}px;
        top: ${space[4]}px;
        box-shadow: 0 0 0 1px ${neutral[86]};
        transition: background-color 100ms, box-shadow 50ms;
    }
`;

const unselectedAnswerLabelStyles = (disabled: boolean) => css`
    ${body.medium()};
    background-color: ${neutral[97]};
    ${!disabled ? selectableAnswerStyles : ''}

    display: flex;
    flex-direction: row;

    margin-bottom: ${space[2]}px;

    padding-top: ${space[3]}px;
    padding-bottom: ${space[3]}px;
    padding-right: ${space[4]}px;
    padding-left: ${space[12]}px;
`;

const unselectedAnswerInputStyles = css`
    :hover ~ label {
        background-color: ${neutral[86]};
        cursor: pointer;

        ::before {
            background-color: ${neutral[46]};
            box-shadow: 0 0 0 1px ${neutral[46]}, inset 0 0 0 3px ${neutral[86]};
        }
    }
    :focus ~ label {
        background-color: ${neutral[86]};
        ${focusHalo}
    }
`;

export const UnselectedAnswer = ({
    questionId,
    id,
    onClick,
    disabled,
    answerText,
    onKeyPress,
}: {
    questionId: string;
    id: string;
    onClick?: () => void;
    onKeyPress?: (e: KeyboardEvent<Element>) => void;
    disabled: boolean;
    answerText: string;
}): JSX.Element => (
    <div>
        <input
            type="radio"
            id={`answer-${id}`}
            name={questionId}
            onClick={onClick}
            onKeyPress={onKeyPress}
            disabled={disabled}
            className={cx(
                css`
                    ${visuallyHidden}
                `,
                disabled ? '' : unselectedAnswerInputStyles,
            )}
            required
        />
        <label
            className={unselectedAnswerLabelStyles(disabled)}
            htmlFor={`answer-${id}`}
            data-answertype={
                disabled
                    ? 'unselected-disabled-answer'
                    : 'unselected-enabled-answer'
            }
            id={id}
            data-testid={id}
        >
            {answerText}
        </label>
    </div>
);

const bulletpointStyles = css`
    ${selectableAnswerStyles}
    ::before {
        background-color: ${neutral[20]};
        box-shadow: 0 0 0 1px ${neutral[20]}, inset 0 0 0 3px ${opinion[500]};
    }
`;

const selectedAnswerStyles = (disabled: boolean) => css`
    display: flex;
    flex-direction: row;

    margin-bottom: ${space[2]}px;

    padding-top: ${space[3]}px;
    padding-bottom: ${space[3]}px;
    padding-right: ${space[4]}px;
    padding-left: ${space[12]}px;
    background-color: ${opinion[500]};

    ${disabled ? '' : bulletpointStyles}
`;

export const SelectedAnswer = ({
    questionId,
    id,
    answerText,
    disabled,
}: {
    questionId: string;
    id: string;
    answerText: string;
    disabled: boolean;
}): JSX.Element => (
    <div>
        <input
            type="radio"
            id={`answer-${id}`}
            name={questionId}
            disabled={disabled}
            className={css`
                ${visuallyHidden};
            `}
            required
            checked
        />
        <label
            id={id}
            className={selectedAnswerStyles(disabled)}
            data-testid={id}
            data-answertype="selected-answer"
        >
            <span
                className={css`
                    ${body.medium()};
                `}
            >
                {answerText}
            </span>
        </label>
    </div>
);

const correctSelectedAnswerStyles = css`
    color: ${neutral[100]};
    padding-left: 10px;
    display: flex;
    flex-direction: column;
`;

export const CorrectSelectedAnswer = ({
    answerText,
    explainerText,
    id,
}: {
    answerText: string;
    explainerText: string;
    id: string;
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
            background-color: ${success[500]};
        `}
    >
        <div className={iconStyle}>
            <SvgCheckmark />
        </div>
        <label
            className={correctSelectedAnswerStyles}
            id={id}
            data-testid={id}
            data-answertype="correct-selected-answer"
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

const nonSelectedCorrectAnswerLabelStyles = css`
    color: ${neutral[0]};
    display: flex;
    flex-direction: column;
`;

export const NonSelectedCorrectAnswer = ({
    answerText,
    explainerText,
    id,
}: {
    answerText: string;
    explainerText: string;
    id: string;
}): JSX.Element => (
    <div
        className={css`
            display: flex;
            flex-direction: row;

            margin-bottom: ${space[2]}px;

            padding-top: ${space[3]}px;
            padding-bottom: ${space[3]}px;
            padding-right: ${space[4]}px;
            padding-left: ${space[12]}px;

            background-color: ${success[400]};
        `}
    >
        <label
            className={nonSelectedCorrectAnswerLabelStyles}
            id={id}
            data-testid={id}
            data-answertype="non-selected-correct-answer"
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

const incorrectAnswerLabelStyles = css`
    color: ${neutral[100]};
    padding-left: 10px;
    display: flex;
    flex-direction: column;

    ${body.medium()};
`;

export const IncorrectAnswer = ({
    answerText,
    id,
}: {
    answerText: string;
    id: string;
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
            background-color: ${news[400]};
        `}
    >
        <div className={iconStyle}>
            <SvgCross />
        </div>
        <label
            className={incorrectAnswerLabelStyles}
            id={id}
            data-testid={id}
            data-answertype="incorrect-answer"
        >
            {answerText}
        </label>
    </div>
);
