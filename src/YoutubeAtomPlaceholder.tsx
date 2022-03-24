import React from 'react';
import { css } from '@emotion/react';

export const YoutubeAtomPlaceholder = ({
    id,
    videoId,
}: {
    id: string;
    videoId: string;
}): JSX.Element => {
    const uniqueId = `youtube-placeholder-${videoId}-${id}`;
    return (
        <div
            data-name={uniqueId}
            data-testid={uniqueId}
            css={[
                css`
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: flex;
                    flex-grow: 1;
                    background-color: black;
                `,
            ]}
        ></div>
    );
};
