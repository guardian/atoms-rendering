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

export type Answer = {
    id: string;
    text: string;
    revealText?: string;
    isCorrect: boolean;
};

export type Question = {
    id: string;
    text: string;
    answers: Answer[];
    imageUrl?: string;
};

export type QuizAtomType = {
    id: string;
    questions: Question[];
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
