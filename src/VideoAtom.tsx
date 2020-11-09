import React from 'react';

import { MaintainAspectRatio } from './common/MaintainAspectRatio';

type VideoAtomType = {
    src: string;
    poster?: string;
    height?: number;
    width?: number;
};

export const VideoAtom = ({
    src,
    poster,
    height = 259,
    width = 460,
}: VideoAtomType): JSX.Element => {
    return (
        <MaintainAspectRatio height={height} width={width}>
            <video
                controls
                preload="metadata"
                src={src}
                width={width}
                height={height}
                poster={poster}
            >
                <p>
                    {`Your browser doesn't support HTML5 video. Here is a `}
                    <a href={src}>link to the video</a> instead.
                </p>
            </video>
        </MaintainAspectRatio>
    );
};
