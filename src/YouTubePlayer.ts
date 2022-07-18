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
    playerPromise: Promise<YT.Player>;

    constructor(id: string, playerOptions: PlayerOptions) {
        this.playerPromise = this.setPlayer(id, playerOptions);
    }

    private async setPlayer(id: string, playerOptions: PlayerOptions) {
        const YTAPI = await loadYouTubeAPI();
        const playerPromise = new Promise<YT.Player>((resolve) => {
            const player = new YTAPI.Player(id, playerOptions);
            resolve(player);
        });
        return playerPromise;
    }

    async getPlayerState() {
        const player = await this.playerPromise;
        return player.getPlayerState();
    }

    async stopVideo() {
        const player = await this.playerPromise;
        player.stopVideo();
    }
}

export { YouTubePlayer };
