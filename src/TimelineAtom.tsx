import React from 'react';
import { Container } from './components/Container';
import { Footer } from './components/Footer';
import { Body } from './components/Body';
import { TimelineEvent } from './types';
import { css } from 'emotion';
import { body } from '@guardian/src-foundations/typography';

import { TimelineAtomType } from './types';
import { neutral, brandAlt, space } from '@guardian/src-foundations';

const EventContainer = css`
    [data-type~='event-snippet']:not(:last-child) {
        border-left: 0.0625rem solid ${neutral[60]};
        padding-bottom: 1rem;
    }
`;

const Snippet = css`
    padding-left: ${space[4]}px;
    margin-left: ${space[2]}px;
`;

const EventTitle = css`
    ${body.medium({
        lineHeight: 'tight',
        fontWeight: 'bold',
    })};
`;

const EventDateBullet = css`
    content: '';
    width: 16px;
    height: 16px;
    border-radius: 100%;
    float: left;
    margin-left: -24px;
    background-color: #121212;
`;

const EventDate = css`
    ::before {
        ${EventDateBullet}
    }
    background: ${brandAlt[400]};
    ${body.medium({
        lineHeight: 'tight',
        fontWeight: 'bold',
    })};
`;

const TimelineContents = ({
    events,
    pillar,
}: {
    events: TimelineEvent[];
    pillar: string;
}): JSX.Element => {
    return (
        <div className={EventContainer}>
            {events.map((event, index) => (
                <div key={index} data-type="event-snippet" className={Snippet}>
                    <div>
                        <span className={EventDate}>{event.date}</span>
                        {event.toDate && (
                            <span>
                                {' '}
                                -{' '}
                                <span className={EventDate}>
                                    {event.toDate}
                                </span>
                            </span>
                        )}
                    </div>
                    {event.title && (
                        <div className={EventTitle}>{event.title}</div>
                    )}
                    {event.body && <Body html={event.body} pillar={pillar} />}
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
            {events && <TimelineContents events={events} pillar={pillar} />}
            <Footer
                pillar={pillar}
                dislikeHandler={dislikeHandler}
                likeHandler={likeHandler}
            ></Footer>
        </Container>
    );
};
