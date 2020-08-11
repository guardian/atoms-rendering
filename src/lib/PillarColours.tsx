import {
    news,
    opinion,
    culture,
    sport,
    lifestyle,
} from '@guardian/src-foundations/palette/';

//Labs uses different structure so has been removed for now
export function GetPillarColour(
    pillar: string,
    colourValue: keyof typeof opinion,
): string {
    switch (pillar) {
        case 'opinion':
            return opinion[colourValue];
        case 'sport':
            return sport[colourValue];
        case 'culture':
            return culture[colourValue];
        case 'lifestyle':
            return lifestyle[colourValue];
        case 'news':
            return news[colourValue];
        default:
            return news[400];
    }
}
