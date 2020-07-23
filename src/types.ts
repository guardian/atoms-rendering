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
};

export type QandaAtomType = {
    id: string;
    title: string;
    image: string;
    html: string;
    credit: string;
    likeHandler?: () => void;
    dislikeHandler?: () => void;
    expandHandler?: () => void;
};

export type QuizAtomType = {
    id: string;
};

export type TimelineAtomType = {
    id: string;
};

export type InteractiveAtomBlockElementType = {
    _type: string;
    css: string;
    js: string;
    html: string;
    id: string;
    url: string;
};
