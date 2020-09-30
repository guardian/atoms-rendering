import React, { KeyboardEvent } from 'react';
import { css } from 'emotion';

import { SvgCheckmark, SvgCross } from '@guardian/src-icons';
import { neutral, news } from '@guardian/src-foundations/palette';
import { body, textSans } from '@guardian/src-foundations/typography';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';
import { focusHalo } from '@guardian/src-foundations/accessibility';

const iconStyle = css`
    height: 26px;
    svg {
        fill: ${neutral[100]};
        height: 26px;
        width: 26px;
    }
`;

const answerWrapperStyles = css`
    display: flex;
    flex-direction: row;

    margin-bottom: 6px;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 20px;
    padding-right: 20px;
`;

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

const unselectedAnswerLabelStyles = (disabled: boolean) => css`
    ${body.medium()};
    background-color: ${neutral[97]};
    ${!disabled ? selectableAnswerStyles : ''}

    ${answerWrapperStyles}
    padding-left: 28px;
`;

export const UnselectedAnswer = ({
    id,
    onClick,
    disabled,
    answerText,
    onKeyPress,
}: {
    id: string;
    onClick?: () => void;
    onKeyPress?: (e: KeyboardEvent<Element>) => void;
    disabled: boolean;
    answerText: string;
}): JSX.Element => (
    <>
        <label
            className={unselectedAnswerLabelStyles(disabled)}
            onKeyPress={onKeyPress}
            tabIndex={disabled ? -1 : 0}
            htmlFor={`answer-${id}`}
        >
            {answerText}
        </label>
        <input
            type="radio"
            tabIndex={-1}
            required
            id={`answer-${id}`}
            onClick={onClick}
            disabled={disabled}
            className={css`
                ${visuallyHidden};
            `}
        />
    </>
);

const correctSelectedAnswerStyles = css`
    color: ${neutral[100]};
    padding-left: 8px;
    display: flex;
    flex-direction: column;
`;

export const CorrectSelectedAnswer = ({
    answerText,
    explainerText,
}: {
    answerText: string;
    explainerText: string;
}): JSX.Element => (
    <div
        className={css`
            ${answerWrapperStyles}
            background-color: rgb(61, 181, 64);
        `}
    >
        <div className={iconStyle}>
            <SvgCheckmark />
        </div>
        <label className={correctSelectedAnswerStyles}>
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
    padding-left: 8px;
    display: flex;
    flex-direction: column;
`;
export const NonSelectedCorrectAnswer = ({
    answerText,
    explainerText,
}: {
    answerText: string;
    explainerText: string;
}): JSX.Element => (
    <div
        className={css`
            ${answerWrapperStyles}
            background-color: rgb(61, 181, 64, 0.6);
        `}
    >
        <label className={nonSelectedCorrectAnswerLabelStyles}>
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
    padding-left: 8px;
    display: flex;
    flex-direction: column;

    ${body.medium()};
`;

export const IncorrectAnswer = ({
    answerText,
}: {
    answerText: string;
}): JSX.Element => (
    <div
        className={css`
            ${answerWrapperStyles}
            background-color: ${news[400]};
        `}
    >
        <div className={iconStyle}>
            <SvgCross />
        </div>
        <label className={incorrectAnswerLabelStyles}>{answerText}</label>
    </div>
);
