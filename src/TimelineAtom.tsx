import React from 'react';
import { Container } from './components/Container';
import { Footer } from './components/Footer';
import { Body } from './components/Body';
import { TimelineEvent } from './types';
import { css } from 'emotion';
import { body } from '@guardian/src-foundations/typography';

import { TimelineAtomType } from './types';
import { neutral, brandAlt } from '@guardian/src-foundations';

const EventContainer = css`
    div::not(:last-child) {
        border-left: 0.0625rem solid ${neutral[60]};
        padding-bottom: 1rem;
    }

    ${body.medium()};
`;

const EventDate = css`
    background: ${brandAlt[400]};
`;

const TimelineContents = ({
    events,
}: {
    events: TimelineEvent[];
}): JSX.Element => {
    return (
        <div className={EventContainer}>
            {events.map((event, index) => (
                <div key={index}>
                    <div>
                        <span className={EventDate}>{event.date}</span>
                    </div>
                    {event.body}
                    {event.body && (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: event.body,
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export const TimelineAtom = ({
    id,
    events,
    description,
    title,
    pillar,
    expandForStorybook,
    likeHandler,
    dislikeHandler,
    expandCallback,
}: TimelineAtomType): JSX.Element => {
    console.log('--------EVENTS-------');
    console.log(events);
    console.log('----------------------');

    return (
        <Container
            atomType="timeline"
            atomTypeTitle="Timeline"
            id={id}
            pillar={pillar}
            expandForStorybook={expandForStorybook}
            title={title}
            expandCallback={expandCallback}
        >
            {description && <Body html={description} pillar={pillar} />}
            {events && <TimelineContents events={events} />}
            <Footer
                pillar={pillar}
                dislikeHandler={dislikeHandler}
                likeHandler={likeHandler}
            ></Footer>
        </Container>
    );
};
