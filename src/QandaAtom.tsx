import React from 'react';
import { QandaAtomType } from './types';
import { Container } from './expandableAtom/Container';
import { Footer } from './expandableAtom/Footer';
import { Body } from './expandableAtom/Body';

export const QandaAtom = ({
    id,
    title,
    image,
    html,
    credit,
    pillar,
    expandForStorybook,
    likeHandler,
    dislikeHandler,
    expandCallback,
}: QandaAtomType): JSX.Element => (
    <Container
        id={id}
        title={title}
        atomType="qanda"
        atomTypeTitle="Q&A"
        pillar={pillar}
        expandForStorybook={expandForStorybook}
        expandCallback={expandCallback}
    >
        <Body html={html} image={image} credit={credit} pillar={pillar} />
        <Footer
            pillar={pillar}
            likeHandler={likeHandler}
            dislikeHandler={dislikeHandler}
        ></Footer>
    </Container>
);
