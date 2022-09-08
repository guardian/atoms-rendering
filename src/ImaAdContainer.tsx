import React from 'react';

type Props = {
    adContainerId: string;
};

const ImaAdContainer = ({ adContainerId }: Props): JSX.Element => {
    return <div id={adContainerId}></div>;
};

export { ImaAdContainer };
