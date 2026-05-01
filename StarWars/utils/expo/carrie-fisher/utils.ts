import {verifyCode} from "@/utils/common/expoCodeVerifyer";

export const BG_LIST = [
    require('@/assets/images/expos/carrieFisher/lucas/tatooine.png'),
    require('@/assets/images/expos/carrieFisher/death_star.png'),
    require('@/assets/images/hoth_challenge_bg.png')
]

export const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const expoConfigData = verifyCode("REBEL");

export const EXPO_STORAGE_NAME: string = expoConfigData?.storage_name || "";