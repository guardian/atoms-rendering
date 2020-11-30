import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { exampleKnowledgeQuestions } from '../fixtures/knowledgeQuizAtom';

const questions = [exampleKnowledgeQuestions[0]];

import { KnowledgeQuizAtom } from './KnowledgeQuiz';

describe('KnowledgeQuiz', () => {
    it('should render', () => {
        const { getByText } = render(
            <KnowledgeQuizAtom id="123abc" questions={questions} />,
        );
        expect(getByText(questions[0].text)).toBeInTheDocument();
    });
    describe('on answer click', () => {
        const correctAnswer = questions[0].answers.find(
            (answers) => answers.isCorrect,
        );
        const incorrectAnswer = questions[0].answers.find(
            (answers) => !answers.isCorrect,
        );
        // make sure we have a different incorrect answer to test
        const incorrectUnselectedAnswer = questions[0].answers.find(
            (answers) =>
                !answers.isCorrect && answers.id !== incorrectAnswer.id,
        );

        it('should display correct answer when chosen', () => {
            const { getByTestId, rerender } = render(
                <KnowledgeQuizAtom id="123abc" questions={questions} />,
            );

            fireEvent.click(getByTestId(correctAnswer.id));
            rerender(<KnowledgeQuizAtom id="123abc" questions={questions} />);

            expect(
                getByTestId(correctAnswer.id).getAttribute('data-answertype'),
            ).toBe('correct-selected-answer');
        });

        it('should correct user when incorrect answer chosen', () => {
            const { getByTestId, rerender } = render(
                <KnowledgeQuizAtom id="123abc" questions={questions} />,
            );

            fireEvent.click(getByTestId(incorrectAnswer.id));
            rerender(<KnowledgeQuizAtom id="123abc" questions={questions} />);

            expect(
                getByTestId(incorrectAnswer.id).getAttribute('data-answertype'),
            ).toBe('incorrect-answer');
            expect(
                getByTestId(correctAnswer.id).getAttribute('data-answertype'),
            ).toBe('non-selected-correct-answer');
        });

        it('should disable selection when answer has been selected', () => {
            const { getByTestId, rerender } = render(
                <KnowledgeQuizAtom id="123abc" questions={questions} />,
            );

            expect(
                getByTestId(incorrectUnselectedAnswer.id).getAttribute(
                    'data-answertype',
                ),
            ).toBe('unselected-enabled-answer');

            fireEvent.click(getByTestId(correctAnswer.id));
            rerender(<KnowledgeQuizAtom id="123abc" questions={questions} />);

            expect(
                getByTestId(incorrectUnselectedAnswer.id).getAttribute(
                    'data-answertype',
                ),
            ).toBe('unselected-disabled-answer');
        });
    });
});
