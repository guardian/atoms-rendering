import { loadScript } from '@guardian/libs';

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
    }
}

const loadScripts = () => {
    const scripts = [loadScript('https://www.youtube.com/iframe_api')];
    return Promise.all(scripts);
};

const loadYouTubeAPI = (): Promise<typeof YT> => {
    /**
     * A promise that is resolves when the YouTube IFrame API is loaded
     * and ready with a reference to window.YT
     */
    const youTubeAPIPromise = new Promise<typeof YT>((resolve) => {
        if (
            window.YT &&
            window.YT.Player &&
            window.YT.Player instanceof Function
        ) {
            resolve(window.YT);
            return;
        }

        const previous = window.onYouTubeIframeAPIReady;

        loadScripts().then(() => {
            /**
             * The YouTube IFrame API will call `window.onYouTubeIframeAPIReady`
             * when it has downloaded and is ready
             */
            window.onYouTubeIframeAPIReady = () => {
                if (previous) {
                    previous();
                }

                resolve(window.YT);
            };
        });
    });

    return youTubeAPIPromise;
};

export { loadYouTubeAPI };
