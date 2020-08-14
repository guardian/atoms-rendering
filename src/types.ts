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

export type MediaAtomType = {
    id: string;
};

export type ProfileAtomType = {
    id: string;
    label: string;
    title: string;
    img?: string;
    html: string;
    credit: string;
};

export type QandaAtomType = {
    id: string;
    title: string;
    image?: string;
    html: string;
    credit?: string;
    likeHandler: () => void;
    dislikeHandler: () => void;
    expandHandler: () => void;
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
