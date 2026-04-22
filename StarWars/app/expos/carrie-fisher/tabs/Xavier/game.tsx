import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import styles_starwars from "@/styles/expo/carrie-fisher/starwars";
import {ImageBackground} from "expo-image";
import {formatTime} from "@/app/expos/carrie-fisher/utils";
import Hint from "@/app/expos/carrie-fisher/tabs/hintModal";
import useTimer from "@/app/expos/carrie-fisher/hooks/useTimer";

interface GameProps {
    onWin: (time: number) => void;
}

const Game:React.FC<GameProps> = ({onWin}) => {
    const { elapsedTime, stopTimer } = useTimer(true);

    const handleWin = () => {
        stopTimer();
        onWin(elapsedTime)
    };

    return (
        <ImageBackground
        source={require('@/assets/images/expos/carrieFisher/death_star.png')}
        style={styles_starwars.menuBackgroundImage}
        >
            <View style={styles_starwars.playingLucasTopBar}>
                <Text style={styles_starwars.playingLucasTimerText}>Temps : {formatTime(elapsedTime)}</Text>

                <Hint challengeId={1} theme={'light'}/>
            </View>
            <View style={styles_starwars.challengeContainer}>
                <Text>Challenge très très dur </Text>

                <TouchableOpacity
                    style={styles_starwars.challengeButton}
                    onPress={handleWin}
                >
                    <Text style={styles_starwars.challengeButtonText}>Cliquez moi dessus !</Text>
                </TouchableOpacity>
            </View>


        </ImageBackground>
    );
}

export default Game;