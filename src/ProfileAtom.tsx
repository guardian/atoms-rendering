import { ProfileAtomType } from './types';
import { Container } from './expandableAtom/Container';
import { Footer } from './expandableAtom/Footer';
import { Body } from './expandableAtom/Body';

export const ProfileAtom = ({
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
}: ProfileAtomType): JSX.Element => {
    return (
        <Container
            id={id}
            title={title}
            pillar={pillar}
            atomType="profile"
            atomTypeTitle="Profile"
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
