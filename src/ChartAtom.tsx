import React from 'react';

import { ChartAtomType } from './types';

export const ChartAtom = ({ id }: ChartAtomType): JSX.Element => (
    <div data-atom-id={id}>ChartAtom</div>
);
