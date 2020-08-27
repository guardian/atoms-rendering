import React from 'react';

import { Caption } from './Caption';
import { YoutubeOverlay } from './YoutubeOverlay';
import { MaintainAspectRatio } from './MaintainAspectRatio';

import { Display } from '@guardian/types/Format';
import { MediaAtomType } from '../types';

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

export const MediaAtom = ({
    format,
    videoMeta,
    hideCaption,
    overlayImage,
    adTargeting,
    isMainMedia,
    height = 259,
    width = 460,
    title = 'YouTube video player',
    duration,
}: MediaAtomType): JSX.Element => {
    const shouldLimitWidth =
        !isMainMedia &&
        (format.display === Display.Showcase ||
            // format.display === Display.Supporting || TODO check on this
            format.display === Display.Immersive);

    const embedConfig =
        adTargeting && JSON.stringify(buildEmbedConfig(adTargeting));

    return (
        <>
            <MaintainAspectRatio height={height} width={width}>
                {overlayImage && (
                    <YoutubeOverlay
                        image={overlayImage}
                        pillar={format.pillar}
                        duration={duration}
                    />
                )}
                <iframe
                    title={title}
                    width={width}
                    height={height}
                    src={`https://www.youtube.com/embed/${videoMeta.assetId}?embed_config=${embedConfig}&enablejsapi=1&origin=https://www.theguardian.com&widgetid=1&modestbranding=1`}
                />
            </MaintainAspectRatio>
            {!hideCaption && (
                <Caption
                    format={format}
                    captionText={videoMeta.mediaTitle || ''}
                    displayCredit={false}
                    shouldLimitWidth={shouldLimitWidth}
                />
            )}
        </>
    );
};
