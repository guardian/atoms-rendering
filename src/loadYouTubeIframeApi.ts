import { loadScript, log } from '@guardian/libs';

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
    }
}

let scriptsPromise: Promise<(Event | undefined)[]>;
let youtubeAPIReadyPromise: Promise<typeof YT>;

const loadScripts = (enableIma = false) => {
    /**
     * Since loadScripts can be called multiple times on the same page for pages with more than one video,
     * only attempt to load the scripts if this is the first call and return a promise if we're on a subsequent call.
     */
    if (scriptsPromise) {
        log('dotcom', 'loadYT: returning load script promise');
        return scriptsPromise;
    }

    let scripts;
    if (enableIma) {
        log('dotcom', 'loadYT: loading YT & IMA script');
        scripts = [
            loadScript('https://www.youtube.com/iframe_api?ima=1'),
            loadScript('//imasdk.googleapis.com/js/sdkloader/ima3.js'),
        ];
    } else {
        log('dotcom', 'loadYT: loading YT script');
        scripts = [loadScript('https://www.youtube.com/iframe_api')];
    }

    scriptsPromise = Promise.all(scripts);
    return scriptsPromise;
};

/**
 * The YouTube IFrame API will call `window.onYouTubeIframeAPIReady`
 * when it has downloaded and is ready
 */
const youtubeAPIReady = () => {
    /**
     * Since youtubeAPIReady can be called multiple times on the same page for pages with more than one video,
     * only overwrite window.onYouTubeIframeAPIReady if this is the first call and return a promise
     * if we're on a subsequent call.
     */
    if (youtubeAPIReadyPromise) {
        log('dotcom', 'loadYT: returning YTAPI promise');
        return youtubeAPIReadyPromise;
    }
    youtubeAPIReadyPromise = new Promise((resolve) => {
        log('dotcom', 'loadYT: creating YTAPI promise');
        window.onYouTubeIframeAPIReady = () => {
            log('dotcom', 'loadYT: resolving YTAPI promise');
            resolve(window.YT);
        };
    });
    return youtubeAPIReadyPromise;
};

const loadYouTubeAPI = (enableIma = false): Promise<typeof YT> => {
    // if another part of the code has already loaded youtube api, return early
    if (window.YT && window.YT.Player && window.YT.Player instanceof Function) {
        log('dotcom', 'loadYT: returning window.YT');
        return Promise.resolve(window.YT);
    }

    return loadScripts(enableIma).then(() => {
        log('dotcom', 'loadYT: returning youtubeAPIReady()');
        return youtubeAPIReady();
    });
};

export { loadYouTubeAPI };
