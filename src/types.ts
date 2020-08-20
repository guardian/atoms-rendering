import { Format } from '@guardian/types/Format';

export type ExplainerAtomType = {
    id: string;
    title: string;
    html: string;
};

export type AudioAtomType = {
    id: string;
};

export type ChartAtomType = {
    id: string;
    url: string;
    html: string;
};

export type GuideAtomType = {
    id: string;
    label?: string;
    title: string;
    image?: string;
    html: string;
    credit?: string;
    pillar: string;
    expandForStorybook?: boolean;
    likeHandler: () => void;
    dislikeHandler: () => void;
    expandCallback: () => void;
};

export type InteractiveAtomType = {
    id: string;
    url?: string;
    html?: string;
    js: string;
    css?: string;
};

export type AdTargeting = {
    adUnit: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customParams: { [key: string]: any };
};

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

export type MediaAtomType = {
    format: Format;
    videoMeta: YoutubeMeta;
    hideCaption?: boolean;
    overlayImage?: string;
    adTargeting?: AdTargeting;
    isMainMedia?: boolean;
    height?: number;
    width?: number;
    title?: string;
    duration?: number; // in seconds
};

export type ProfileAtomType = {
    id: string;
    label?: string;
    title: string;
    image?: string;
    html: string;
    credit?: string;
    pillar: string;
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
    pillar: string;
    expandForStorybook?: boolean;
    likeHandler: () => void;
    dislikeHandler: () => void;
    expandCallback: () => void;
};

export type QuizAtomType = {
    id: string;
};

export type TimelineAtomType = {
    id: string;
    events?: TimelineEvent[];
    title: string;
    pillar: string;
    description?: string;
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

export interface TimelineEvent {
    title: string;
    date: string;
    body?: string;
    toDate?: string;
}
