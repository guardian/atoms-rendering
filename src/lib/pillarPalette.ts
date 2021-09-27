import {
    news,
    opinion,
    sport,
    culture,
    lifestyle,
} from '@guardian/src-foundations/palette';
import { ArticlePillar, ArticleTheme, ArticleSpecial } from '@guardian/libs';

type colour = string;

interface PillarColours {
    300: colour;
    400: colour;
    500: colour;
    600: colour;
    800: colour;
}

export const pillarPalette: Record<ArticleTheme, PillarColours> = {
    [ArticlePillar.News]: news,
    [ArticlePillar.Opinion]: opinion,
    [ArticlePillar.Sport]: sport,
    [ArticlePillar.Culture]: culture,
    [ArticlePillar.Lifestyle]: lifestyle,
    [ArticleSpecial.Labs]: lifestyle,
    [ArticleSpecial.SpecialReport]: news,
};
