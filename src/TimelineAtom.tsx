import React from 'react';
import { Container } from './components/Container';
import { Footer } from './components/Footer';
import { Body } from './components/Body';

import { TimelineAtomType } from './types';

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
            <Body html={description} pillar={pillar} />
            <Footer
                pillar={pillar}
                dislikeHandler={dislikeHandler}
                likeHandler={likeHandler}
            ></Footer>
        </Container>
    );
};
