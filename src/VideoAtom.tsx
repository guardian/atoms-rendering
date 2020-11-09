import React from 'react';

import { MaintainAspectRatio } from './common/MaintainAspectRatio';

type SourceType = {
    type: string;
    src: string;
};

type VideoAtomType = {
    sources: SourceType[];
    poster?: string;
    height?: number;
    width?: number;
};

export const VideoAtom = ({
    sources,
    poster,
    height = 259,
    width = 460,
}: VideoAtomType): JSX.Element | null => {
    if (sources.length === 0) return null; // Handle empty sources array
    return (
        <MaintainAspectRatio height={height} width={width}>
            <video
                controls
                preload="metadata"
                width={width}
                height={height}
                poster={poster}
            >
                {sources.map((source, index) => (
                    <source key={index} src={source.src} type={source.type} />
                ))}
                <p>
                    {`Your browser doesn't support HTML5 video. Here is a `}
                    <a href={sources[0].src}>link to the video</a> instead.
                </p>
            </video>
        </MaintainAspectRatio>
    );
};
