import React from 'react';

type Props = {
    adContainerId: string;
};

const ImaAdContainer = ({ adContainerId }: Props): JSX.Element => {
    return <div id={adContainerId} data-atom-type="ima-ad-container"></div>;
};

export { ImaAdContainer };
