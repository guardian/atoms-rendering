import {
    news,
    opinion,
    sport,
    culture,
    lifestyle,
} from '@guardian/src-foundations/palette';

import { Pillar } from '../types';

type colour = string;

interface PillarColours {
    300: colour;
    400: colour;
    500: colour;
    600: colour;
    800: colour;
}

export const pillarPalette: Record<Pillar, PillarColours> = {
    [Pillar.News]: news,
    [Pillar.Opinion]: opinion,
    [Pillar.Sport]: sport,
    [Pillar.Culture]: culture,
    [Pillar.Lifestyle]: lifestyle,
    [Pillar.Labs]: lifestyle, // TODO: Get editorial palette from Source
};
