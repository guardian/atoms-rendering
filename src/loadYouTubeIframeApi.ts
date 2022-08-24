import { loadScript } from '@guardian/libs';

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
    }
}

let _scriptsPromise: Promise<(Event | undefined)[]>;
let _youtubeAPIReadyPromise: Promise<typeof YT>;

const loadScripts = () => {
    /**
     * Since loadScripts can be called multiple times on the same page for pages with more than one video,
     * only attempt to load the scripts if this is the first call and return the same promise otherwise.
     */
    if (_scriptsPromise) {
        return _scriptsPromise;
    }
    const scripts = [
        // keep array multi-line
        loadScript('https://www.youtube.com/iframe_api'),
    ];
    _scriptsPromise = Promise.all(scripts);
    return _scriptsPromise;
};

/**
 * The YouTube IFrame API will call `window.onYouTubeIframeAPIReady`
 * when it has downloaded and is ready
 */
const youtubeAPIReady = () => {
    /**
     * Since youtubeAPIReady can be called multiple times on the same page for pages with more than one video,
     * only overwrite window.onYouTubeIframeAPIReady if this is the first call and return the same promise otherwise.
     */
    if (_youtubeAPIReadyPromise) {
        return _youtubeAPIReadyPromise;
    }

    _youtubeAPIReadyPromise = new Promise((resolve) => {
        window.onYouTubeIframeAPIReady = () => {
            resolve(window.YT);
        };
    });
    return _youtubeAPIReadyPromise;
};

const loadYouTubeAPI = (): Promise<typeof YT> => {
    /* If another part of the code has already loaded youtube api, return early. */
    if (window.YT && window.YT.Player && window.YT.Player instanceof Function) {
        return Promise.resolve(window.YT);
    }

    /* Create youtubeAPIReady promise before loading scripts so that
     * window.onYouTubeIframeAPIReady is guaranteed to be defined
     * by the time the youtube script calls it.
     */
    const youtubeAPIReadyPromise = youtubeAPIReady();

    return loadScripts().then(() => {
        return youtubeAPIReadyPromise;
    });
};

export { loadYouTubeAPI };
