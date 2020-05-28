import React from 'react';

import { ProfileAtomType } from './types';

export const ProfileAtom = ({ id }: ProfileAtomType): JSX.Element => (
    <div data-atom-id={id}>ProfileAtom</div>
);
