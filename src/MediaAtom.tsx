import React from 'react';

import { MediaAtomType } from './types';

export const MediaAtom = ({ id }: MediaAtomType): JSX.Element => (
    <div data-atom-id={id}>MediaAtom</div>
);
