import React from 'react';

import { InteractiveAtomType } from './types';

export const InteractiveAtom = ({ id }: InteractiveAtomType): JSX.Element => (
    <div data-atom-id={id}>InteractiveAtom</div>
);
