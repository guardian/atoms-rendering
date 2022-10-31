import React from 'react';

type Props = {
    uniqueId: string;
};

const ImaAdContainer = ({ uniqueId }: Props): JSX.Element => {
    return (
        <div
            id={`ima-ad-container-${uniqueId}`}
            data-atom-type="ima-ad-container"
        ></div>
    );
};

export { ImaAdContainer };
