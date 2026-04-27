export const BG_LIST = [
    require('@/assets/images/expos/carrieFisher/lucas/tatooine.png'),
    require('@/assets/images/expos/carrieFisher/death_star.png'),
    require('@/assets/images/expos/carrieFisher/death_star.png')
]

export const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const EXPO_STORAGE_NAME = "carrieFisher";