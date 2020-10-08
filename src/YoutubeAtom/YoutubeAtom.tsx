import React from 'react';

import { YoutubeOverlay } from './YoutubeOverlay';
import { MaintainAspectRatio } from './MaintainAspectRatio';
import { YoutubeAtomType } from '../types';

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

// Note, this is a subset of the CAPI MediaAtom essentially.
export const YoutubeAtom = ({
    format,
    videoMeta,
    overlayImage,
    adTargeting,
    height = 259,
    width = 460,
    title = 'YouTube video player',
    duration,
}: YoutubeAtomType): JSX.Element => {
    const embedConfig =
        adTargeting && JSON.stringify(buildEmbedConfig(adTargeting));
    console.log('Atom Rendered');
    return (
        <div>
            <MaintainAspectRatio height={height} width={width}>
                <iframe
                    title={title}
                    width={width}
                    height={height}
                    id={videoMeta.assetId}
                    src={`https://www.youtube.com/embed/${videoMeta.assetId}?embed_config=${embedConfig}&enablejsapi=1&origin=http://localhost:3030&widgetid=1&modestbranding=1`}
                />
                {overlayImage && (
                    <YoutubeOverlay
                        image={overlayImage}
                        pillar={format.pillar}
                        duration={duration}
                        id={videoMeta.assetId}
                    />
                )}
            </MaintainAspectRatio>
        </div>
    );
};
