import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import {
    examplePersonalityQuestions,
    exampleResultBuckets,
} from '../fixtures/personalityQuizAtom';

import { PersonalityQuizAtom } from './PersonalityQuiz';

describe('PersonalityQuiz', () => {
    it('should render', () => {
        const { getByText } = render(
            <PersonalityQuizAtom
                id="123abc"
                questions={examplePersonalityQuestions}
                resultBuckets={exampleResultBuckets}
            />,
        );
        expect(
            getByText(examplePersonalityQuestions[0].text),
        ).toBeInTheDocument();
    });

    describe('on answer click', () => {
        it('should change answer component when chosen', () => {
            const { getByTestId, rerender } = render(
                <PersonalityQuizAtom
                    id="123abc"
                    questions={examplePersonalityQuestions}
                    resultBuckets={exampleResultBuckets}
                />,
            );

            fireEvent.click(getByTestId(examplePersonalityQuestions[0].id));
            rerender(
                <PersonalityQuizAtom
                    id="123abc"
                    questions={examplePersonalityQuestions}
                    resultBuckets={exampleResultBuckets}
                />,
            );

            expect(
                getByTestId(examplePersonalityQuestions[0].id).getAttribute(
                    'data-answertype',
                ),
            ).toBe('selected-answer');
        });

        it('should prevent submit unless all answers have been selected', () => {
            const { getByTestId, rerender } = render(
                <PersonalityQuizAtom
                    id="123abc"
                    questions={examplePersonalityQuestions}
                    resultBuckets={exampleResultBuckets}
                />,
            );

            fireEvent.click(getByTestId('submit-quiz'));
            rerender(
                <PersonalityQuizAtom
                    id="123abc"
                    questions={examplePersonalityQuestions}
                    resultBuckets={exampleResultBuckets}
                />,
            );

            expect(getByTestId('missing-answers')).toBeTruthy();
        });

        it('should display response on quiz submit', () => {
            const { getByTestId, rerender } = render(
                <PersonalityQuizAtom
                    id="123abc"
                    questions={examplePersonalityQuestions}
                    resultBuckets={exampleResultBuckets}
                />,
            );

            fireEvent.click(getByTestId('submit-quiz'));
            rerender(
                <PersonalityQuizAtom
                    id="123abc"
                    questions={examplePersonalityQuestions}
                    resultBuckets={exampleResultBuckets}
                />,
            );

            // TODO: how to detect submit prevention?
            // expect(
            //     getByTestId(examplePersonalityQuestions[0].id).getAttribute(
            //         'data-answertype',
            //     ),
            // ).toBe('selected-answer');
        });
    });
});
