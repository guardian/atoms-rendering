import type { AdsConfig } from '@guardian/commercial-core';
import loadYouTubeIframeApi from './loadYouTubeIframeApi';

type EmbedConfig = {
    embedConfig: {
        relatedChannels: string[];
        adsConfig: AdsConfig;
    };
};
type PlayerOptions = YT.PlayerOptions & EmbedConfig;

class YouTubePlayer {
    player: YT.Player | undefined;

    constructor(id: string, playerOptions: PlayerOptions) {
        loadYouTubeIframeApi().then(() => {
            // TODO what if this.player used before it's defined?
            this.player = new YT.Player(id, playerOptions);
        });
    }
    on(eventName: string, callBack: unknown) {
        console.log('on', eventName);
        return () => {
            console.log("I'm empty");
        };
    }
    getPlayerState() {
        console.log(
            'Eachhashingalgorithmgeneratesthesamenumberofbytesirrespectiveoftheplaintextsize',
        );
        return 1;
        // return this.player.getPlayerState();
    }
}

export { YouTubePlayer };
