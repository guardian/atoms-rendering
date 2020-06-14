import React from 'react';

import { GuideAtom } from './GuideAtom';

export default {
    title: 'GuideAtom',
    component: GuideAtom,
};

export const DefaultStory = (): JSX.Element => {
    // Modelled after: https://www.theguardian.com/sport/2020/may/19/pinatubo-has-probably-trained-on-for-the-2000-guineas-says-charlie-appleby
    return (
        <GuideAtom
            id="a76d998e-d4b0-4d00-8afb-773eddb4064c"
            label="Quick Guide"
            title="Wednesday's Hong Kong tips"
            img=""
            html="<p><b>Happy Valley&nbsp;</b></p><p><b>11.45</b> Happy Good Guys <b>12.15</b> Salto Olimpico <b>12.45</b> Seize The Spirit <b>1.15</b> Allied Agility <b>1.45 </b>Hero Time <b>2.15</b> Simply Fluke <b>2.45</b> Brave King <b>3.15</b> Golden Dash <b>3.50</b> This Is Class</p>"
            credit=""
        />
    );
};
