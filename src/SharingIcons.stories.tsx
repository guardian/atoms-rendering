import React from 'react';

import { sharingUrls } from './fixtures/sharingUrls';
import { SharingIcons } from './SharingIcons';

export default {
    title: 'SharingIcons',
    component: SharingIcons,
};

export const SharingIconsDefault = () => (
    <SharingIcons
        sharingUrls={sharingUrls}
        displayIcons={[
            'facebook',
            'twitter',
            'email',
            'whatsApp',
            'messenger',
            'pinterest',
            'linkedIn',
        ]}
    />
);
