import React from 'react';

import { AudioAtomType } from './types';

export const AudioAtom = ({
    trackUrl,
    kicker,
    title,
}: AudioAtomType): JSX.Element => {
    return (
        <figure>
            <figcaption>{kicker}</figcaption>
            {title && <p>{title}</p>}
            <audio controls src={trackUrl}>
                <p>
                    {' '}
                    Sorry your browser does not support audio - but you can
                    download here and listen
                    https://audio.guim.co.uk/2020/05/05-61553-gnl.fw.200505.jf.ch7DW.mp3{' '}
                </p>
            </audio>
        </figure>
    );
};
