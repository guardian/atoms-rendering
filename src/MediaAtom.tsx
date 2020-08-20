import React from 'react';
import { css } from 'emotion';
import { Pillar, Format } from '@guardian/types/Format';
import { MediaAtomType, AdTargeting } from './types';
import {
    news,
    opinion,
    sport,
    culture,
    lifestyle,
} from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { text } from '@guardian/src-foundations/palette';

type RatioProps = {
    height: number;
    width: number;
    children: React.ReactNode;
};

const MaintainAspectRatio = ({
    height,
    width,
    children,
}: RatioProps): JSX.Element => (
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

type colour = string;

interface PillarColours {
    dark: colour;
    main: colour;
    bright: colour;
    pastel: colour;
    faded: colour;
    300: colour;
    400: colour;
    500: colour;
    600: colour;
    800: colour;
}

// TODO move
const pillarPalette: Record<Pillar, PillarColours> = {
    [Pillar.News]: news,
    [Pillar.Opinion]: opinion,
    [Pillar.Sport]: sport,
    [Pillar.Culture]: culture,
    [Pillar.Lifestyle]: lifestyle,
};

const iconStyle = (pillar: Pillar) => css`
    fill: ${pillarPalette[pillar].main};
    padding-right: 3px;
`;

const captionTextStyle = css`
    ${textSans.xsmall()};
    padding-top: 6px;
    ${textSans.xsmall()};
    word-wrap: break-word;
    color: ${text.supporting};
`;

type CaptionProps = {
    format: Format;
    captionText?: string;
    credit?: string;
};

const Caption = ({
    format,
    captionText,
    credit,
}: CaptionProps): JSX.Element | null => {
    if (!captionText && !credit) {
        return null;
    }

    return (
        <figcaption className={captionTextStyle}>
            <span className={iconStyle(format.pillar)}>
                {/* TODO colour as required */}
                <svg width="11" height="10" viewBox="0 0 11 10">
                    <path fillRule="evenodd" d="M5.5 0L11 10H0z" />
                </svg>
            </span>
            {captionText && (
                <span
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        __html: captionText || '',
                    }}
                    key="caption"
                />
            )}
            {credit && ` ${credit}`}
        </figcaption>
    );
};

type EmbedConfig = {
    adsConfig: {
        adTagParameters: {
            iu: string;
            cust_params: string;
        };
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

// TODO should this be YoutubeAtom really?
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
    /*     const shouldLimitWidth =
        !isMainMedia &&
        (display === Display.Showcase || display === Display.Immersive); */

    const embedConfig =
        adTargeting && JSON.stringify(buildEmbedConfig(adTargeting));

    return (
        <>
            <MaintainAspectRatio height={height} width={width}>
                {/*                 {overlayImage && (
                    <YouTubeOverlay
                        image={overlayImage}
                        pillar={pillar}
                        duration={duration}
                    />
                )} */}
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
                />
            )}
        </>
    );
};
