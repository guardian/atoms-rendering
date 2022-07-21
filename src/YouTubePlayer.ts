import type { AdsConfig } from '@guardian/commercial-core';
import { log } from '@guardian/libs';
import { loadYouTubeAPI } from './loadYouTubeIframeApi';

type EmbedConfig = {
    embedConfig: {
        relatedChannels: string[];
        adsConfig: AdsConfig;
        enableIma: boolean;
    };
};

type PlayerOptions = YT.PlayerOptions & EmbedConfig;

class YouTubePlayer {
    playerPromise: Promise<YT.Player>;

    constructor(id: string, playerOptions: PlayerOptions) {
        this.playerPromise = this.setPlayer(id, playerOptions);
    }

    private async setPlayer(id: string, playerOptions: PlayerOptions) {
        const YTAPI = await loadYouTubeAPI(playerOptions.embedConfig.enableIma);
        const playerPromise = new Promise<YT.Player>((resolve, reject) => {
            try {
                const player = new YTAPI.Player(id, playerOptions);
                resolve(player);
            } catch (e) {
                this.logError(e as Error);
                reject(e);
            }
        });
        return playerPromise;
    }

    private logError(e: Error) {
        log('dotcom', `YouTubePlayer failed to load: ${e}`);
    }

    getPlayerState(): Promise<YT.PlayerState | void> {
        return this.playerPromise
            .then((player) => {
                return player.getPlayerState();
            })
            .catch(this.logError);
    }

    stopVideo(): Promise<void> {
        return this.playerPromise
            .then((player) => {
                player.stopVideo();
            })
            .catch(this.logError);
    }
}

export { YouTubePlayer };
