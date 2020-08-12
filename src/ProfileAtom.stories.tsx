import React from 'react';

import { ProfileAtom } from './ProfileAtom';

export default {
    title: 'ProfileAtom',
    component: ProfileAtom,
};

export const DefaultStory = (): JSX.Element => {
    // Modelled after: https://www.theguardian.com/politics/2020/jan/24/labour-leadership-unite-backs-brilliant-rebecca-long-bailey
    return (
        <ProfileAtom
            id="1fba49a4-81c6-49e4-b7fa-fd66d1512360"
            label="Profile"
            title="Who is Jon Lansman?"
            html="<p>A 62-year-old Labour veteran who joined the party in 1974 and worked for Labour icon Tony Benn during his deputy leadership campaign in the 1980s. Lansman served as director of operations for Corbyn’s leadership campaign. After Corbyn was elected as the leader of the Labour party in 2015, Lansman founded Momentum, a pro-Corbyn campaign group.<br></p>"
            credit=""
            pillar="sport"
            expandForStorybook={true}
            likeHandler={() => {
                console.log('LIKED');
                return null;
            }}
            dislikeHandler={() => {
                console.log('DISLIKED');
                return null;
            }}
            expandCallback={() => {
                console.log('EXPANDED');
                return null;
            }}
        />
    );
};
