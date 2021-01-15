const title = 'Sports quiz: football in the 1980s';
const articleUrl =
    'https://www.theguardian.com/football/that-1980s-sports-blog/2020/jun/12/sports-quiz-football-in-the-1980s';

export const sharingUrls = {
    facebook: {
        userMessage: 'Share on Facebook',
        url: `https://www.facebook.com/dialog/share?app_id=202314643182694&href=${encodeURIComponent(
            `${articleUrl}?CMP=share_btn_fb`,
        )}`,
    },
    twitter: {
        userMessage: 'Share on Twitter',
        url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title,
        )}&url=${encodeURIComponent(`${articleUrl}?CMP=share_btn_tw`)}`,
    },
    email: {
        userMessage: 'Share via Email',
        url: `mailto:?subject=${title}&body=${encodeURIComponent(
            `${articleUrl}?CMP=share_btn_link`,
        )}`,
    },
    whatsApp: {
        userMessage: 'Share on WhatsApp',
        url: `whatsapp://send?text=${encodeURIComponent(
            `"${title}" ${articleUrl}?CMP=share_btn_wa`,
        )}`,
    },
};
