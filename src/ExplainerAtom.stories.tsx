import React from 'react';

import { ExplainerAtom } from './ExplainerAtom';

const html =
    '<p>Cranes lean in, waiting for an all-clear<br>that will not come.&nbsp;</p><p>Forehead pressed to glass,<br>phone at my ear, I learn</p><p>to sail on your voice<br>over a sadness of building sites,&nbsp;</p><p>past King’s Cross, St Pancras,<br>to the place where you are.</p><p>You say nothing<br>is too far, mothers</p><p>will find their daughters,<br>strangers will be neighbours,</p><p>even saviours<br>will have names.</p><p>You are all flame<br>in a red dress.&nbsp;&nbsp;</p><p>Petals brush my face.<br>You say at last</p><p>the cherry blossom<br>has arrived</p><p>as if that is what<br>we were really waiting for.</p>';

export default {
    title: 'ExplainerAtom',
    component: ExplainerAtom,
};

export const DefaultStory = (): JSX.Element => {
    return (
        <ExplainerAtom
            id="abc123"
            title="Cranes Lean In by Imtiaz Dharker"
            html={html}
        />
    );
};
