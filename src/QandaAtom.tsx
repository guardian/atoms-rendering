import React from 'react';
import { QandaAtomType } from './types';
import { submitComponentEvent } from './lib/ophan';
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
        expandCallback={
            expandCallback ??
            (() =>
                submitComponentEvent({
                    component: {
                        componentType: 'QANDA_ATOM',
                        id,
                        products: [],
                        labels: [],
                    },
                    action: 'EXPAND',
                }))
        }
    >
        <Body html={html} image={image} credit={credit} pillar={pillar} />
        <Footer
            pillar={pillar}
            dislikeHandler={
                dislikeHandler ??
                (() =>
                    submitComponentEvent({
                        component: {
                            componentType: 'QANDA_ATOM',
                            id,
                            products: [],
                            labels: [],
                        },
                        action: 'DISLIKE',
                    }))
            }
            likeHandler={
                likeHandler ??
                (() =>
                    submitComponentEvent({
                        component: {
                            componentType: 'QANDA_ATOM',
                            id,
                            products: [],
                            labels: [],
                        },
                        action: 'LIKE',
                    }))
            }
        ></Footer>
    </Container>
);
