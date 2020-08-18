import React from 'react';

import { QandaAtom } from './QandaAtom';
import {
    imageStoryExpanded,
    listStoryExpanded,
    imageStoryWithCreditExpanded,
} from '../fixtures/qandaAtom';

export default {
    title: 'QandaAtom',
    component: QandaAtom,
};

// Based on https://www.theguardian.com/technology/2018/sep/19/time-to-regulate-bitcoin-says-treasury-committee-report
export const NewsStoryExpanded = (): JSX.Element => {
    return <QandaAtom {...imageStoryExpanded} />;
};

// Based on https://www.theguardian.com/world/2020/mar/17/israel-to-track-mobile-phones-of-suspected-coronavirus-cases
export const ListStoryExpanded = (): JSX.Element => {
    return <QandaAtom {...listStoryExpanded} />;
};

// Based on https://www.theguardian.com/world/2020/aug/06/coronavirus-global-report-germany-and-france-record-biggest-rise-in-cases-since-may
export const ImageStoryWithCreditExpanded = (): JSX.Element => {
    return <QandaAtom {...imageStoryWithCreditExpanded} />;
};
