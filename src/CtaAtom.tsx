import React from 'react';

import { CtaAtomType } from './types';

export const CtaAtom = ({ id }: CtaAtomType): JSX.Element => (
    <div data-atom-id={id}>CtaAtom</div>
);
