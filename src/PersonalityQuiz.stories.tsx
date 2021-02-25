import React from 'react';
import { css } from '@emotion/react';

import { PersonalityQuizAtom } from './PersonalityQuiz';
import {
    examplePersonalityQuestions,
    exampleResultBuckets,
} from './fixtures/personalityQuizAtom';

export default {
    title: 'PersonalityQuizAtom',
    component: PersonalityQuizAtom,
};

const WhatsappSVG = () => (
    <svg
        width="30px"
        height="30px"
        viewBox="0 0 30 30"
        enableBackground="new 0 0 30 30"
    >
        <path d="M22.09,7.87c-1.88-1.88-4.38-2.92-7.05-2.92c-5.49,0-9.96,4.47-9.96,9.96c0,1.75,0.46,3.47,1.33,4.98 L5,25.04l5.28-1.38c1.45,0.79,3.09,1.21,4.76,1.21c5.49,0,9.96-4.47,9.96-9.96C25,12.26,23.97,9.76,22.09,7.87 M15.04,23.19 c-1.49,0-2.95-0.4-4.22-1.15l-0.3-0.18l-3.13,0.82l0.84-3.05l-0.2-0.31C7.2,18,6.76,16.47,6.77,14.91c0-4.56,3.71-8.27,8.28-8.27 c2.21,0,4.29,0.86,5.85,2.43c1.56,1.56,2.42,3.64,2.42,5.85C23.32,19.48,19.6,23.19,15.04,23.19 M19.58,16.99 c-0.25-0.12-1.47-0.73-1.7-0.81s-0.39-0.12-0.56,0.12c-0.17,0.25-0.64,0.81-0.79,0.97c-0.14,0.17-0.29,0.19-0.54,0.06 c-0.25-0.12-1.05-0.39-2-1.23c-0.74-0.66-1.24-1.47-1.38-1.72c-0.15-0.25-0.02-0.38,0.11-0.51c0.11-0.11,0.25-0.29,0.37-0.44 c0.12-0.15,0.17-0.25,0.25-0.42c0.08-0.17,0.04-0.31-0.02-0.44c-0.06-0.12-0.56-1.35-0.77-1.85c-0.2-0.49-0.41-0.42-0.56-0.43 c-0.14-0.01-0.31-0.01-0.48-0.01c-0.17,0-0.44,0.06-0.66,0.31c-0.22,0.25-0.87,0.85-0.87,2.08c0,1.22,0.89,2.41,1.02,2.57 c0.12,0.17,1.75,2.68,4.25,3.76c0.59,0.26,1.06,0.41,1.42,0.52c0.6,0.19,1.14,0.16,1.57,0.1c0.48-0.07,1.47-0.6,1.68-1.18 s0.21-1.08,0.14-1.18C20,17.18,19.83,17.12,19.58,16.99" />
    </svg>
);

const PinterestSVG = () => (
    <svg viewBox="0 0 32 32" width="32" height="32">
        <path d="M16.363 8C12.133 8 10 11.13 10 13.74c0 1.582.58 2.988 1.823 3.512.204.086.387.003.446-.23.04-.16.137-.568.18-.737.06-.23.037-.312-.127-.513-.36-.436-.588-1-.588-1.802 0-2.322 1.684-4.402 4.384-4.402 2.39 0 3.703 1.508 3.703 3.522 0 2.65-1.136 4.887-2.822 4.887-.93 0-1.628-.795-1.405-1.77.268-1.165.786-2.42.786-3.262 0-.752-.39-1.38-1.2-1.38-.952 0-1.716 1.017-1.716 2.38 0 .867.284 1.454.284 1.454l-1.146 5.006c-.34 1.487-.05 3.31-.026 3.493.014.108.15.134.21.05.09-.117 1.223-1.562 1.61-3.006.108-.41.625-2.526.625-2.526.31.61 1.215 1.145 2.176 1.145 2.862 0 4.804-2.693 4.804-6.298C22 10.54 19.763 8 16.363 8" />
    </svg>
);

const SVGWrapper = ({ children }: { children: JSX.Element }) => (
    <a
        css={css`
            margin-right: 10px;
        `}
    >
        {children}
    </a>
);

export const DefaultRendering = (): React.ReactNode => (
    <PersonalityQuizAtom
        id="quiz-id"
        questions={examplePersonalityQuestions}
        resultBuckets={exampleResultBuckets}
        sharingIcons={
            <div
                css={css`
                    display: flex;
                    flex-direction: row;
                `}
            >
                <SVGWrapper>
                    <PinterestSVG />
                </SVGWrapper>
                <SVGWrapper>
                    <WhatsappSVG />
                </SVGWrapper>
            </div>
        }
    />
);
