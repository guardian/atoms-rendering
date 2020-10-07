var player;
var isPlayerReady = false;
function PlayVideo() {
    if (isPlayerReady) {
        player.playVideo();
    }
}
export const youtubeJS = (id: string): string => {
    return(
    function onPlayerReady(event) {
        isPlayerReady = true;
    }
    function onYouTubeIframeAPIReady() {
        // eslint-disable-next-line no-undef
        console.log('API READY');
        // eslint-disable-next-line no-undef
        player = new YT.Player(id, {
            events: {
                onReady: onPlayerReady,
            },
        });
    }
    )};
