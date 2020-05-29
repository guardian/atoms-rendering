import React from 'react';

import { TimelineAtomType } from './types';

export const TimelineAtom = ({ id }: TimelineAtomType): JSX.Element => (
    <div data-atom-id={id}>TimelineAtom</div>
);
