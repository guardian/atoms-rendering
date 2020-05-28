import React from 'react';

import { QuizAtomType } from './types';

export const QuizAtom = ({ id }: QuizAtomType): JSX.Element => (
    <div data-atom-id={id}>QuizAtom</div>
);
