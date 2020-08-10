import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { GuideAtom } from './GuideAtom';

describe('GuideAtom', () => {
    it('should render', () => {
        const { getByText, queryByText } = render(
            <GuideAtom
                id="a76d998e-d4b0-4d00-8afb-773eddb4064c"
                label="Quick Guide"
                title="Wednesday's Hong Kong tips"
                html="<p><b>Happy Valley&nbsp;</b></p><p><b>11.45</b> Happy Good Guys <b>12.15</b> Salto Olimpico <b>12.45</b> Seize The Spirit <b>1.15</b> Allied Agility <b>1.45 </b>Hero Time <b>2.15</b> Simply Fluke <b>2.45</b> Brave King <b>3.15</b> Golden Dash <b>3.50</b> This Is Class</p>"
                credit=""
                pillar=""
                likeHandler={() => {
                    return null;
                }}
                dislikeHandler={() => {
                    return null;
                }}
                expandCallback={() => {
                    return null;
                }}
            />,
        );

        expect(getByText('Quick Guide')).toBeInTheDocument();

        // Test that the 'Show' part of the expand switch is hidden on expand
        expect(getByText('Show')).toBeInTheDocument();
        fireEvent.click(getByText('Show'));
        expect(queryByText('Show')).toBe(null);
        // Test that 'Hide' is hidden after closing the Guide
        expect(getByText('Hide')).toBeInTheDocument();
        fireEvent.click(getByText('Hide'));
        expect(queryByText('Hide')).toBe(null);
    });

    it('Show feedback on like', () => {
        const { getByText, queryByText, queryByTestId } = render(
            <GuideAtom
                id="a76d998e-d4b0-4d00-8afb-773eddb4064c"
                label="Quick Guide"
                title="Wednesday's Hong Kong tips"
                html="<p><b>Happy Valley&nbsp;</b></p><p><b>11.45</b> Happy Good Guys <b>12.15</b> Salto Olimpico <b>12.45</b> Seize The Spirit <b>1.15</b> Allied Agility <b>1.45 </b>Hero Time <b>2.15</b> Simply Fluke <b>2.45</b> Brave King <b>3.15</b> Golden Dash <b>3.50</b> This Is Class</p>"
                credit=""
                pillar=""
                likeHandler={() => {
                    return null;
                }}
                dislikeHandler={() => {
                    return null;
                }}
                expandCallback={() => {
                    return null;
                }}
            />,
        );

        // Expand Guide
        fireEvent.click(getByText('Show'));
        // Like button should be visibile and feedback not visibile
        expect(queryByTestId('like')).toBeVisible();
        expect(queryByText('Thank you for your feedback.')).not.toBeVisible();

        // Fire like event
        fireEvent.click(queryByTestId('like'));
        // Feedback should be visible, like button should be hidden
        expect(queryByText('Thank you for your feedback.')).toBeVisible();
        expect(queryByTestId('like')).not.toBeVisible();
    });

    it('Show feedback on dislike', () => {
        const { getByText, queryByText, queryByTestId } = render(
            <GuideAtom
                id="a76d998e-d4b0-4d00-8afb-773eddb4064c"
                label="Quick Guide"
                title="Wednesday's Hong Kong tips"
                html="<p><b>Happy Valley&nbsp;</b></p><p><b>11.45</b> Happy Good Guys <b>12.15</b> Salto Olimpico <b>12.45</b> Seize The Spirit <b>1.15</b> Allied Agility <b>1.45 </b>Hero Time <b>2.15</b> Simply Fluke <b>2.45</b> Brave King <b>3.15</b> Golden Dash <b>3.50</b> This Is Class</p>"
                credit=""
                pillar=""
                likeHandler={() => {
                    return null;
                }}
                dislikeHandler={() => {
                    return null;
                }}
                expandCallback={() => {
                    return null;
                }}
            />,
        );

        // Expand Guide
        fireEvent.click(getByText('Show'));
        // Like button should be visibile and feedback not visibile
        expect(queryByTestId('dislike')).toBeVisible();
        expect(queryByText('Thank you for your feedback.')).not.toBeVisible();

        // Fire dislike event
        fireEvent.click(queryByTestId('dislike'));
        // Feedback should be visible, like button should be hidden
        expect(queryByText('Thank you for your feedback.')).toBeVisible();
        expect(queryByTestId('dislike')).not.toBeVisible();
    });
});
