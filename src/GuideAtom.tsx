import React from 'react';

import { GuideAtomType } from './types';

export const GuideAtom = ({ id }: GuideAtomType): JSX.Element => (
    <div data-atom-id={id}>GuideAtom</div>
);
