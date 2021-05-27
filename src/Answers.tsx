import React from 'react';
import { css } from '@emotion/react';

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

const answerWithSVGStyles = css`
    margin-bottom: ${space[2]}px;

    padding-top: ${space[2]}px;
    padding-bottom: ${space[3]}px;
    padding-right: ${space[4]}px;
    padding-left: ${space[3]}px;
`;

const WhiteCheckmark = () => (
    <div
        css={css`
            margin-right: ${space[1]}px;

            height: ${space[6]}px;
            svg {
                fill: ${neutral[100]};
                height: ${space[6]}px;
                width: ${space[6]}px;
            }
        `}
    >
        <SvgCheckmark />
    </div>
);

const BlackCheckmark = () => (
    <div
        css={css`
            margin-right: ${space[1]}px;

            height: ${space[6]}px;
            svg {
                fill: ${neutral[0]};
                height: ${space[6]}px;
                width: ${space[6]}px;
            }
        `}
    >
        <SvgCheckmark />
    </div>
);

const WhiteCross = () => (
    <div
        css={css`
            margin-right: ${space[1]}px;

            height: ${space[6]}px;
            svg {
                fill: ${neutral[100]};
                height: ${space[6]}px;
                width: ${space[6]}px;
            }
        `}
    >
        <SvgCross />
    </div>
);

const WhiteText = ({
    text,
    supplementText,
    id,
    answerType,
}: {
    id: string;
    text: string;
    supplementText?: string;
    answerType: string;
}) => (
    <label
        css={css`
            color: ${neutral[100]};
            display: flex;
            flex-direction: column;

            ${body.medium()};
        `}
        data-testid={id}
        data-answer-type={answerType}
    >
        <span
            css={css`
                ${body.medium()};
            `}
        >
            {text}
        </span>
        {supplementText && (
            <span
                css={css`
                    ${textSans.xsmall()}
                `}
            >
                {supplementText}
            </span>
        )}
    </label>
);

const BlackText = ({
    text,
    supplementText,
    id,
    answerType,
}: {
    id: string;
    text: string;
    supplementText?: string;
    answerType: string;
}) => (
    <label
        css={css`
            color: ${neutral[0]};
            display: flex;
            flex-direction: column;

            ${body.medium()};
        `}
        data-testid={id}
        data-answer-type={answerType}
    >
        <span
            css={css`
                ${body.medium()};
            `}
        >
            {text}
        </span>
        {supplementText && (
            <span
                css={css`
                    ${textSans.xsmall()}
                `}
            >
                {supplementText}
            </span>
        )}
    </label>
);

const correctSelectedAnswerStyles = css`
    display: flex;
    flex-direction: row;

    background-color: ${success[400]};
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
    <div css={[answerWithSVGStyles, correctSelectedAnswerStyles]}>
        <WhiteCheckmark />
        <WhiteText
            id={id}
            text={answerText}
            supplementText={explainerText}
            answerType="correct-selected-answer"
        />
    </div>
);

const incorrectSelectedAnswerStyles = css`
    display: flex;
    flex-direction: row;

    background-color: ${news[400]};
`;

export const IncorrectAnswer = ({
    answerText,
    id,
}: {
    answerText: string;
    id: string;
}): JSX.Element => (
    <div css={[answerWithSVGStyles, incorrectSelectedAnswerStyles]}>
        <WhiteCross />
        <WhiteText id={id} text={answerText} answerType="incorrect-answer" />
    </div>
);

const correctNonSelectedAnswerStyles = css`
    display: flex;
    flex-direction: row;
    border: ${space[1]}px solid;
    padding-left: ${space[2]}px;

    background-color: ${neutral[97]};
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
    <div css={[answerWithSVGStyles, correctNonSelectedAnswerStyles]}>
        <BlackCheckmark />
        <BlackText
            id={id}
            text={answerText}
            supplementText={explainerText}
            answerType="non-selected-correct-answer"
        />
    </div>
);

const unselectedAnswerStyles = css`
    background-color: ${neutral[97]};
    margin-bottom: ${space[2]}px;

    padding-top: ${space[2]}px;
    padding-bottom: ${space[3]}px;
    padding-right: ${space[2]}px;
    padding-left: ${space[9]}px;
`;

export const UnselectedAnswer = ({
    id,
    answerText,
}: {
    answerText: string;
    id: string;
}): JSX.Element => (
    <div css={unselectedAnswerStyles}>
        <BlackText
            id={id}
            text={answerText}
            answerType="unselected-disabled-answer"
        />
    </div>
);
