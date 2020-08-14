import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { TimelineAtom } from './TimelineAtom';

describe('TimelineAtom', () => {
    it('should render', () => {
        const { getByText, queryByText } = render(
            <TimelineAtom
                id="9704dbd0-0273-49d2-8425-c58ccf9a1951"
                description='<p><b>January 2015</b></p><p>Hamilton, a new musical written by and starring <a href="https://www.theguardian.com/stage/2016/sep/25/lin-manuel-miranda-broadway-smash-hamilton-hip-hop-musical-school-of-eminem">Lin-Manuel Miranda</a>, has its first performances off-Broadway at the Public theater in New York. Its subject is the US founding father who was the first secretary of the Treasury.&nbsp;</p><p><b>February 2015</b><br></p><p>As the show opens officially, it wins praise from critics, particularly for its innovative blend of musical styles, from rap to operetta. In her <a href="https://www.theguardian.com/stage/2015/feb/18/hamilton-review-founding-father-gets-a-hip-hop-makeover">four-star review</a>, the Guardian’s Alexis Soloski calls the show "brash, nimble, historically engaged and startlingly contemporary".</p><p><b>August 2015</b><br></p><p>After selling out its run at the Public, the show opens on Broadway at the Richard Rodgers theatre and there is huge demand for tickets.</p><p><b>February 2016</b><br></p><p>The original Broadway cast recording wins a Grammy award for best musical theatre album.</p><p><b>March 2016</b><br></p><p>Miranda visits the White House to perform songs from the musical and a <a href="https://www.theguardian.com/stage/video/2016/mar/15/hamilton-star-freestyle-raps-with-obama-at-the-white-house-video">video of him freestyling</a> in the Rose Garden with President Barack Obama goes viral. First lady Michelle Obama calls the show “the best piece of art in any form that I have ever seen in my life”.</p><p><b>April 2016</b><br></p><p>Hamilton wins the Pulitzer prize for drama.</p><p><b>June 2016</b>&nbsp;<br></p><p>The musical breaks records, winning 11 Tony awards – at a ceremony that takes place after news breaks of a mass shooting in Orlando, Florida. Miranda performs a sonnet in praise of his wife and son, ending with the words: “Now fill the world with music, love and pride.”</p><p><b>July 2016</b><br></p><p>Miranda stops performing in the show to pursue other opportunities, including starring in a sequel to Mary Poppins. A spoof version of the musical, Spamilton, opens in New York.</p><p><b>&nbsp;October 2016</b></p><p>A production of Hamilton opens in Chicago and runs concurrently with the Broadway version.</p><p><b>November 2016</b><br></p><p>Vice-president-elect <a href="https://www.theguardian.com/us-news/video/2016/nov/19/mike-pence-told-at-hamilton-we-are-anxious-you-will-not-protect-us-video">Mike Pence</a> sees the show in New York. From the stage, actor Brandon Victor Dixon addresses him directly, saying: “We are the diverse America who are alarmed and anxious that your new administration will not protect us.” On Twitter, Donald Trump condemns their “terrible behaviour” and says he hears the show is “highly overrated”.<br></p><p><b>January 2017</b><br></p><p>The first cast members are revealed for a West End production of Hamilton.&nbsp;</p><p><b>December 2017</b><br></p><p>The show opens to five-star reviews at the newly renovated Victoria Palace theatre in London.</p><p><b>March 2018</b></p><p>The London production of Hamilton gets 13 Olivier nominations, making it the most nominated show in the history of the awards.</p><p><b>July 2020</b></p><p>A filmed version of the Broadway production debuts on the Disney+ streaming service, warmly welcomed while the world is still in lockdown over the coronavirus crisis.&nbsp;</p>'
                title="How Hamilton the Musical became a smash hit"
                pillar="culture"
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

        expect(getByText('Timeline')).toBeInTheDocument();

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
            <TimelineAtom
                id="9704dbd0-0273-49d2-8425-c58ccf9a1951"
                description='<p><b>January 2015</b></p><p>Hamilton, a new musical written by and starring <a href="https://www.theguardian.com/stage/2016/sep/25/lin-manuel-miranda-broadway-smash-hamilton-hip-hop-musical-school-of-eminem">Lin-Manuel Miranda</a>, has its first performances off-Broadway at the Public theater in New York. Its subject is the US founding father who was the first secretary of the Treasury.&nbsp;</p><p><b>February 2015</b><br></p><p>As the show opens officially, it wins praise from critics, particularly for its innovative blend of musical styles, from rap to operetta. In her <a href="https://www.theguardian.com/stage/2015/feb/18/hamilton-review-founding-father-gets-a-hip-hop-makeover">four-star review</a>, the Guardian’s Alexis Soloski calls the show "brash, nimble, historically engaged and startlingly contemporary".</p><p><b>August 2015</b><br></p><p>After selling out its run at the Public, the show opens on Broadway at the Richard Rodgers theatre and there is huge demand for tickets.</p><p><b>February 2016</b><br></p><p>The original Broadway cast recording wins a Grammy award for best musical theatre album.</p><p><b>March 2016</b><br></p><p>Miranda visits the White House to perform songs from the musical and a <a href="https://www.theguardian.com/stage/video/2016/mar/15/hamilton-star-freestyle-raps-with-obama-at-the-white-house-video">video of him freestyling</a> in the Rose Garden with President Barack Obama goes viral. First lady Michelle Obama calls the show “the best piece of art in any form that I have ever seen in my life”.</p><p><b>April 2016</b><br></p><p>Hamilton wins the Pulitzer prize for drama.</p><p><b>June 2016</b>&nbsp;<br></p><p>The musical breaks records, winning 11 Tony awards – at a ceremony that takes place after news breaks of a mass shooting in Orlando, Florida. Miranda performs a sonnet in praise of his wife and son, ending with the words: “Now fill the world with music, love and pride.”</p><p><b>July 2016</b><br></p><p>Miranda stops performing in the show to pursue other opportunities, including starring in a sequel to Mary Poppins. A spoof version of the musical, Spamilton, opens in New York.</p><p><b>&nbsp;October 2016</b></p><p>A production of Hamilton opens in Chicago and runs concurrently with the Broadway version.</p><p><b>November 2016</b><br></p><p>Vice-president-elect <a href="https://www.theguardian.com/us-news/video/2016/nov/19/mike-pence-told-at-hamilton-we-are-anxious-you-will-not-protect-us-video">Mike Pence</a> sees the show in New York. From the stage, actor Brandon Victor Dixon addresses him directly, saying: “We are the diverse America who are alarmed and anxious that your new administration will not protect us.” On Twitter, Donald Trump condemns their “terrible behaviour” and says he hears the show is “highly overrated”.<br></p><p><b>January 2017</b><br></p><p>The first cast members are revealed for a West End production of Hamilton.&nbsp;</p><p><b>December 2017</b><br></p><p>The show opens to five-star reviews at the newly renovated Victoria Palace theatre in London.</p><p><b>March 2018</b></p><p>The London production of Hamilton gets 13 Olivier nominations, making it the most nominated show in the history of the awards.</p><p><b>July 2020</b></p><p>A filmed version of the Broadway production debuts on the Disney+ streaming service, warmly welcomed while the world is still in lockdown over the coronavirus crisis.&nbsp;</p>'
                title="How Hamilton the Musical became a smash hit"
                pillar="culture"
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

        // Expand Timeline
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
            <TimelineAtom
                id="9704dbd0-0273-49d2-8425-c58ccf9a1951"
                description='<p><b>January 2015</b></p><p>Hamilton, a new musical written by and starring <a href="https://www.theguardian.com/stage/2016/sep/25/lin-manuel-miranda-broadway-smash-hamilton-hip-hop-musical-school-of-eminem">Lin-Manuel Miranda</a>, has its first performances off-Broadway at the Public theater in New York. Its subject is the US founding father who was the first secretary of the Treasury.&nbsp;</p><p><b>February 2015</b><br></p><p>As the show opens officially, it wins praise from critics, particularly for its innovative blend of musical styles, from rap to operetta. In her <a href="https://www.theguardian.com/stage/2015/feb/18/hamilton-review-founding-father-gets-a-hip-hop-makeover">four-star review</a>, the Guardian’s Alexis Soloski calls the show "brash, nimble, historically engaged and startlingly contemporary".</p><p><b>August 2015</b><br></p><p>After selling out its run at the Public, the show opens on Broadway at the Richard Rodgers theatre and there is huge demand for tickets.</p><p><b>February 2016</b><br></p><p>The original Broadway cast recording wins a Grammy award for best musical theatre album.</p><p><b>March 2016</b><br></p><p>Miranda visits the White House to perform songs from the musical and a <a href="https://www.theguardian.com/stage/video/2016/mar/15/hamilton-star-freestyle-raps-with-obama-at-the-white-house-video">video of him freestyling</a> in the Rose Garden with President Barack Obama goes viral. First lady Michelle Obama calls the show “the best piece of art in any form that I have ever seen in my life”.</p><p><b>April 2016</b><br></p><p>Hamilton wins the Pulitzer prize for drama.</p><p><b>June 2016</b>&nbsp;<br></p><p>The musical breaks records, winning 11 Tony awards – at a ceremony that takes place after news breaks of a mass shooting in Orlando, Florida. Miranda performs a sonnet in praise of his wife and son, ending with the words: “Now fill the world with music, love and pride.”</p><p><b>July 2016</b><br></p><p>Miranda stops performing in the show to pursue other opportunities, including starring in a sequel to Mary Poppins. A spoof version of the musical, Spamilton, opens in New York.</p><p><b>&nbsp;October 2016</b></p><p>A production of Hamilton opens in Chicago and runs concurrently with the Broadway version.</p><p><b>November 2016</b><br></p><p>Vice-president-elect <a href="https://www.theguardian.com/us-news/video/2016/nov/19/mike-pence-told-at-hamilton-we-are-anxious-you-will-not-protect-us-video">Mike Pence</a> sees the show in New York. From the stage, actor Brandon Victor Dixon addresses him directly, saying: “We are the diverse America who are alarmed and anxious that your new administration will not protect us.” On Twitter, Donald Trump condemns their “terrible behaviour” and says he hears the show is “highly overrated”.<br></p><p><b>January 2017</b><br></p><p>The first cast members are revealed for a West End production of Hamilton.&nbsp;</p><p><b>December 2017</b><br></p><p>The show opens to five-star reviews at the newly renovated Victoria Palace theatre in London.</p><p><b>March 2018</b></p><p>The London production of Hamilton gets 13 Olivier nominations, making it the most nominated show in the history of the awards.</p><p><b>July 2020</b></p><p>A filmed version of the Broadway production debuts on the Disney+ streaming service, warmly welcomed while the world is still in lockdown over the coronavirus crisis.&nbsp;</p>'
                title="How Hamilton the Musical became a smash hit"
                pillar="culture"
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

        // Timeline Guide
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
