import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import {
    examplePersonalityQuestions,
    exampleResultBuckets,
} from '../fixtures/personalityQuizAtom';

import {
    PersonalityQuizAtom,
    findMostReferredToBucketId,
} from './PersonalityQuiz';

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
            const selectedAnswer = examplePersonalityQuestions[0].answers[0];
            const { getByTestId, rerender } = render(
                <PersonalityQuizAtom
                    id="123abc"
                    questions={examplePersonalityQuestions}
                    resultBuckets={exampleResultBuckets}
                />,
            );

            fireEvent.click(getByTestId(selectedAnswer.id));
            rerender(
                <PersonalityQuizAtom
                    id="123abc"
                    questions={examplePersonalityQuestions}
                    resultBuckets={exampleResultBuckets}
                />,
            );

            expect(
                getByTestId(selectedAnswer.id).getAttribute('data-answertype'),
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

        it('should display response on quiz submit and hide on rest', () => {
            const { getByTestId, rerender, queryByTestId } = render(
                <PersonalityQuizAtom
                    id="123abc"
                    questions={examplePersonalityQuestions}
                    resultBuckets={exampleResultBuckets}
                />,
            );

            examplePersonalityQuestions.forEach((question) =>
                fireEvent.click(getByTestId(question.answers[0].id)),
            );

            fireEvent.click(getByTestId('submit-quiz'));
            rerender(
                <PersonalityQuizAtom
                    id="123abc"
                    questions={examplePersonalityQuestions}
                    resultBuckets={exampleResultBuckets}
                />,
            );

            // Note are only testing if the results display on the component
            // and not if the the text is correct. We test findMostReferredToBucketId
            // seperatly to check correct bucket selection
            expect(getByTestId('quiz-results-block-top')).toBeTruthy();
            expect(getByTestId('quiz-results-block-bottom')).toBeTruthy();

            fireEvent.click(getByTestId('reset-quiz'));
            rerender(
                <PersonalityQuizAtom
                    id="123abc"
                    questions={examplePersonalityQuestions}
                    resultBuckets={exampleResultBuckets}
                />,
            );

            expect(
                queryByTestId('quiz-results-block-top'),
            ).not.toBeInTheDocument();
            expect(
                queryByTestId('quiz-results-block-bottom'),
            ).not.toBeInTheDocument();
        });
    });

    describe('findMostReferredToBucketId', () => {
        it('should return bucket most commonly found in answers', () => {
            const selectedAnswers = {
                '7fd34318-d273-4399-8fce-c9dc8af01995':
                    'c48aa7d4-f87b-4bef-96f1-fd9458e3e145',
                'd776cb0a-e10a-4ea7-a720-4769958cabc5':
                    '8b3cab92-676e-4983-8d9a-fbcbe8b3a9f4',
                'fe07e26e-deef-4cf7-85df-2cf8a6b4409e':
                    '76b6ad00-7aa0-4418-ab1e-087ed1d15006',
            };

            const bucketId = findMostReferredToBucketId({
                selectedAnswers,
                questions: examplePersonalityQuestions,
            });

            expect(bucketId).toBe('d9574643-86f6-49e6-a384-7bc9e7cc5454');
        });
    });
});
