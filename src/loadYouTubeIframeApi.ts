import { loadScript } from '@guardian/libs';

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
    }
}

const loadScripts = () => {
    const scripts = [
        loadScript('https://www.youtube.com/iframe_api?ima=1'),
        loadScript('//imasdk.googleapis.com/js/sdkloader/ima3.js'),
    ];
    return Promise.all(scripts);
};

export default (): Promise<typeof YT> => {
    /**
     * A promise that is resolved when window.onYouTubeIframeAPIReady is called.
     * The promise is resolved with a reference to window.YT object.
     */
    const iframeAPIReady = new Promise<typeof YT>((resolve) => {
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
            // The API will call this function when page has finished downloading
            // the JavaScript for the player API.
            window.onYouTubeIframeAPIReady = () => {
                if (previous) {
                    previous();
                }

                resolve(window.YT);
            };
        });
    });

    return iframeAPIReady;
};
