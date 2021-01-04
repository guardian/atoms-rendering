import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { exampleKnowledgeQuestions } from './fixtures/knowledgeQuizAtom';

import { KnowledgeQuizAtom } from './KnowledgeQuiz';

const questions = [exampleKnowledgeQuestions[0]];

describe('KnowledgeQuiz', () => {
    it('should render', () => {
        const { getByText } = render(
            <KnowledgeQuizAtom id="123abc" questions={questions} />,
        );
        expect(getByText(questions[0].text)).toBeInTheDocument();
    });
    describe('on answer click', () => {
        const correctAnswer = {
            id: 'c5c49561-d9df-4fd4-a7bb-47e7e0a88240',
            text: 'Dino Zoff',
            revealText:
                'Goalkeeper Zoff is the oldest player to win the tournament. He was 40 when he lifted the trophy after Italy’s 3-1 victory over West Germanyin the final. He was 21 years and 297 days older than Giuseppe Bergomi, one of his teammates.',
            isCorrect: true,
            answerBuckets: [],
        };
        const incorrectAnswer = {
            id: '3bf94d69-9bca-465a-bf51-82d77b305ad8',
            text: 'Claudio Gentile\n',
            isCorrect: false,
            answerBuckets: [],
        };
        // make sure we have a different incorrect answer to test
        const incorrectUnselectedAnswer = {
            id: '1c3484a2-006a-461a-a737-348275cbdfbc',
            text: 'Marco Tardelli\n',
            isCorrect: false,
            answerBuckets: [],
        };

        it('should change answer component when chosen', () => {
            const { getByTestId, rerender } = render(
                <KnowledgeQuizAtom id="123abc" questions={questions} />,
            );

            fireEvent.click(getByTestId(correctAnswer.id));
            rerender(<KnowledgeQuizAtom id="123abc" questions={questions} />);

            expect(
                getByTestId(correctAnswer.id).getAttribute('data-answertype'),
            ).toBe('selected-enabled-answer');
        });

        it('should display correct answer when chosen', () => {
            const { getByTestId, rerender } = render(
                <KnowledgeQuizAtom id="123abc" questions={questions} />,
            );

            fireEvent.click(getByTestId(correctAnswer.id));
            fireEvent.click(getByTestId('submit-quiz'));
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
            fireEvent.click(getByTestId('submit-quiz'));
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
            fireEvent.click(getByTestId('submit-quiz'));
            rerender(<KnowledgeQuizAtom id="123abc" questions={questions} />);

            expect(
                getByTestId(incorrectUnselectedAnswer.id).getAttribute(
                    'data-answertype',
                ),
            ).toBe('unselected-disabled-answer');
        });
    });
});
