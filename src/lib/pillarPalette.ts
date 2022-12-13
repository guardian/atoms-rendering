import {
    news,
    opinion,
    sport,
    culture,
    lifestyle,
} from '@guardian/source-foundations';
import { ArticlePillar, ArticleTheme, ArticleSpecial } from '@guardian/libs';

type Colour = string;

interface PillarColours {
    300: Colour;
    400: Colour;
    500: Colour;
    600: Colour;
    800: Colour;
}

export const pillarPalette: Record<ArticleTheme, PillarColours> = {
    [ArticlePillar.News]: news,
    [ArticlePillar.Opinion]: opinion,
    [ArticlePillar.Sport]: sport,
    [ArticlePillar.Culture]: culture,
    [ArticlePillar.Lifestyle]: lifestyle,
    [ArticleSpecial.Labs]: lifestyle,
    [ArticleSpecial.SpecialReport]: news,
    [ArticleSpecial.SpecialReportAlt]: news,
};
