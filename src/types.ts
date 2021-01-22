import { Theme } from '@guardian/types';

export type AdTargeting = {
    adUnit: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customParams: { [key: string]: any };
};

export type AudioAtomType = {
    id: string;
    trackUrl: string;
    kicker: string;
    title?: string;
    pillar: Theme;
    shouldUseAcast?: boolean;
};

export type ChartAtomType = {
    id: string;
    html: string;
};

export type ExplainerAtomType = {
    id: string;
    title: string;
    html: string;
};

export type GuideAtomType = {
    id: string;
    label?: string;
    title: string;
    image?: string;
    html: string;
    credit?: string;
    pillar: Theme;
    expandForStorybook?: boolean;
    likeHandler: () => void;
    dislikeHandler: () => void;
    expandCallback: () => void;
};

export type InteractiveAtomBlockElementType = {
    _type: string;
    css: string;
    js: string;
    html: string;
    id: string;
    url: string;
};

export type InteractiveAtomType = {
    id: string;
    url?: string;
    html?: string;
    js: string;
    css?: string;
};

export type ProfileAtomType = {
    id: string;
    label?: string;
    title: string;
    image?: string;
    html: string;
    credit?: string;
    pillar: Theme;
    expandForStorybook?: boolean;
    likeHandler: () => void;
    dislikeHandler: () => void;
    expandCallback: () => void;
};

export type QandaAtomType = {
    id: string;
    title: string;
    image?: string;
    html: string;
    credit?: string;
    pillar: Theme;
    expandForStorybook?: boolean;
    likeHandler: () => void;
    dislikeHandler: () => void;
    expandCallback: () => void;
};

export type TimelineAtomType = {
    id: string;
    events?: TimelineEvent[];
    title: string;
    pillar: Theme;
    description?: string;
    expandForStorybook?: boolean;
    likeHandler: () => void;
    dislikeHandler: () => void;
    expandCallback: () => void;
};

export interface TimelineEvent {
    title: string;
    date: string;
    body?: string;
    toDate?: string;
}

type AssetType = {
    url: string;
    mimeType: string;
};

export type VideoAtomType = {
    assets: AssetType[];
    poster?: string;
    height?: number;
    width?: number;
};

export type SrcSetItem = { src: string; width: number };

export type ImageSource = {
    srcSet: SrcSetItem[];
};

// aka weighting. RoleType affects how an image is placed. It is called weighting
// in Composer but role in CAPI. We respect CAPI so we maintain this nomenclature
// in DCR
export type RoleType =
    | 'immersive'
    | 'supporting'
    | 'showcase'
    | 'inline'
    | 'thumbnail'
    | 'halfWidth';
