import React from 'react';
import { css } from 'emotion';

import { YoutubeOverlay } from './YoutubeOverlay';

type EmbedConfig = {
    adsConfig: {
        adTagParameters: {
            iu: string;
            cust_params: string;
        };
    };
};

interface AdTargeting {
    adUnit: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customParams: { [key: string]: any };
}

const buildEmbedConfig = (adTargeting: AdTargeting): EmbedConfig => {
    return {
        adsConfig: {
            adTagParameters: {
                iu: `${adTargeting.adUnit || ''}`,
                cust_params: encodeURIComponent(
                    constructQuery(adTargeting.customParams),
                ),
            },
        },
    };
};

const constructQuery = (query: { [key: string]: any }): string =>
    Object.keys(query)
        .map((param: any) => {
            const value = query[param];
            const queryValue = Array.isArray(value)
                ? value.map((v) => encodeURIComponent(v)).join(',')
                : encodeURIComponent(value);
            return `${param}=${queryValue}`;
        })
        .join('&');

type YoutubeMeta = {
    assetId: string;
    mediaTitle: string;
    id?: string;
    channelId?: string;
    duration?: number;
    posterSrc?: string;
    height?: string;
    width?: string;
};

type YoutubeAtomType = {
    videoMeta: YoutubeMeta;
    overlayImage?: string;
    adTargeting?: AdTargeting;
    height?: number;
    width?: number;
    title?: string;
    duration?: number; // in seconds
    origin?: string;
};

const MaintainAspectRatio = ({
    height,
    width,
    children,
}: {
    height: number;
    width: number;
    children: React.ReactNode;
}): JSX.Element => (
    /* https://css-tricks.com/aspect-ratio-boxes/ */
    <div
        className={css`
            /* position relative to contain the absolutely positioned iframe plus any Overlay image */
            position: relative;
            padding-bottom: ${(height / width) * 100}%;

            iframe {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
        `}
    >
        {children}
    </div>
);

// Note, this is a subset of the CAPI MediaAtom essentially.
export const YoutubeAtom = ({
    videoMeta,
    overlayImage,
    adTargeting,
    height = 259,
    width = 460,
    title = 'YouTube video player',
    duration,
    origin,
}: YoutubeAtomType): JSX.Element => {
    const embedConfig =
        adTargeting && JSON.stringify(buildEmbedConfig(adTargeting));
    const originString = origin ? `&origin=${origin}` : '';
    const iframeSrc = `https://www.youtube.com/embed/${videoMeta.assetId}?embed_config=${embedConfig}&enablejsapi=1${originString}&widgetid=1&modestbranding=1`;
    return (
        <MaintainAspectRatio height={height} width={width}>
            <iframe
                title={title}
                width={width}
                height={height}
                id={videoMeta.assetId}
                src={iframeSrc}
                // needed in order to allow `player.playVideo();` to be able to run
                // https://stackoverflow.com/a/53298579/7378674
                allow="autoplay"
                tabIndex={overlayImage ? -1 : 0}
            />
            {overlayImage && (
                <YoutubeOverlay
                    image={overlayImage}
                    duration={duration}
                    id={videoMeta.assetId}
                />
            )}
        </MaintainAspectRatio>
    );
};