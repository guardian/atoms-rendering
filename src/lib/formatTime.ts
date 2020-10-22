export const formatTime = (videoDurationInSeconds: number) => {
    const minutes = Math.floor(videoDurationInSeconds / 60);
    const seconds = videoDurationInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};
