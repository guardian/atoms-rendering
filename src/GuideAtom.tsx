import { GuideAtomType } from './types';
import { Footer } from './expandableAtom/Footer';
import { Container } from './expandableAtom/Container';
import { Body } from './expandableAtom/Body';

export const GuideAtom = ({
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
}: GuideAtomType): JSX.Element => {
    return (
        <Container
            id={id}
            title={title}
            pillar={pillar}
            atomType="guide"
            atomTypeTitle="Quick Guide"
            expandForStorybook={expandForStorybook}
            expandCallback={expandCallback}
        >
            <Body html={html} image={image} credit={credit} pillar={pillar} />
            <Footer
                pillar={pillar}
                dislikeHandler={dislikeHandler}
                likeHandler={likeHandler}
            ></Footer>
        </Container>
    );
};
