import React from 'react';

import { AudioAtomType } from './types';

export const AudioAtom = ({ id }: AudioAtomType): JSX.Element => (
    <div data-atom-id={id}>AudioAtom</div>
);
