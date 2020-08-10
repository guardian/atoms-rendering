import {
    news,
    opinion,
    culture,
    sport,
    lifestyle,
    labs,
} from '@guardian/src-foundations/palette/';

export function GetPillarColour400(pillar: string) {
    switch (pillar) {
        case 'opinion':
            return opinion[400];
        case 'sport':
            return sport[400];
        case 'culture':
            return culture[400];
        case 'lifestyle':
            return lifestyle[400];
        case 'labs':
            return labs[400];
        case 'news':
        default:
            return news[400];
    }
}

export function GetPillarColour300(pillar: string) {
    switch (pillar) {
        case 'opinion':
            return opinion[300];
        case 'sport':
            return sport[300];
        case 'culture':
            return culture[300];
        case 'lifestyle':
            return lifestyle[300];
        case 'labs':
            return labs[300];
        case 'news':
        default:
            return news[300];
    }
}
