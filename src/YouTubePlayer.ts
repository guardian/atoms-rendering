import type { AdsConfig } from '@guardian/commercial-core';
import { loadYouTubeAPI } from './loadYouTubeIframeApi';

type EmbedConfig = {
    embedConfig: {
        relatedChannels: string[];
        adsConfig: AdsConfig;
    };
};
type PlayerOptions = YT.PlayerOptions & EmbedConfig;

class YouTubePlayer {
    id: string;
    playerOptions: PlayerOptions;
    player: YT.Player | undefined;
    playerInitialized?: Promise<YT.Player>;

    constructor(id: string, playerOptions: PlayerOptions) {
        this.id = id;
        this.playerOptions = playerOptions;
        this.setup();
    }

    private async setup() {
        await loadYouTubeAPI();
        return this.getOrInitializePlayer(this.id, this.playerOptions);
    }

    private getOrInitializePlayer(id: string, playerOptions: PlayerOptions) {
        if (this.playerInitialized) {
            return this.playerInitialized;
        }
        this.playerInitialized = new Promise<YT.Player>((resolve) => {
            this.player = new YT.Player(id, playerOptions);
            resolve(this.player);
        });
        return this.playerInitialized;
    }

    async getPlayerState() {
        const player = await this.setup();
        return player.getPlayerState();
    }
    async stopVideo() {
        const player = await this.setup();
        player.stopVideo();
    }
}

export { YouTubePlayer };
