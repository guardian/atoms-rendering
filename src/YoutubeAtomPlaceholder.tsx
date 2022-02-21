import React from 'react';
import { css, keyframes } from '@emotion/react';

const fadeInOpacity = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const transitionOpacityIn = css`
    animation: ${fadeInOpacity} 500ms ease-in 0s 1;
`;

export const YoutubeAtomPlaceholder = ({
    assetId,
}: {
    assetId: string;
}): JSX.Element => {
    return (
        <div
            data-name={`youtube-placeholder-${assetId}`}
            data-testid={`youtube-placeholder-${assetId}`}
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
                    /* ${transitionOpacityIn} */
                `,
            ]}
        ></div>
    );
};
