import React from 'react';

import { QandaAtomType } from './types';

export const QandaAtom = ({ id }: QandaAtomType): JSX.Element => (
    <div data-atom-id={id}>QandaAtom</div>
);
