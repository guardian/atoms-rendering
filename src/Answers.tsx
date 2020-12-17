import React from 'react';
import { css, cx } from 'emotion';

import { SvgCheckmark, SvgCross } from '@guardian/src-icons';
import { neutral, news, success } from '@guardian/src-foundations/palette';
import { body, textSans } from '@guardian/src-foundations/typography';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';
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
    name,
    isCorrect,
}: {
    id: string;
    text: string;
    supplementText?: string;
    name: string;
    isCorrect: boolean;
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
        <input
            type="radio"
            id={id}
            name={name}
            data-testid={id}
            className={cx(
                css`
                    ${visuallyHidden}
                `,
            )}
            required
        />
        <label
            className={css`
                color: ${neutral[100]};
                display: flex;
                flex-direction: column;

                ${body.medium()};
            `}
            data-answertype="with logo"
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
    name,
    isCorrect,
}: {
    id: string;
    text: string;
    supplementText?: string;
    name: string;
    isCorrect?: boolean;
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
        <input
            type="radio"
            id={id}
            name={name}
            data-testid={id}
            className={cx(
                css`
                    ${visuallyHidden}
                `,
            )}
            required
        />
        <label
            className={css`
                margin-left: ${space[1]}px;
                display: flex;
                flex-direction: column;
            `}
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
    name,
}: {
    answerText: string;
    explainerText: string;
    id: string;
    name: string;
}): JSX.Element => (
    <AnswerWithoutSVG
        id={id}
        name={name}
        text={answerText}
        supplementText={explainerText}
        isCorrect={true}
    />
);

export const IncorrectAnswer = ({
    answerText,
    id,
    name,
}: {
    answerText: string;
    id: string;
    name: string;
}): JSX.Element => (
    <AnswerWithSVG id={id} name={name} text={answerText} isCorrect={false} />
);

export const NonSelectedCorrectAnswer = ({
    answerText,
    explainerText,
    id,
    name,
}: {
    answerText: string;
    explainerText: string;
    id: string;
    name: string;
}): JSX.Element => (
    <AnswerWithSVG
        id={id}
        name={name}
        text={answerText}
        supplementText={explainerText}
        isCorrect={true}
    />
);

export const UnselectedAnswer = ({
    answerText,
    id,
    name,
}: {
    answerText: string;
    id: string;
    name: string;
}): JSX.Element => <AnswerWithoutSVG id={id} name={name} text={answerText} />;
