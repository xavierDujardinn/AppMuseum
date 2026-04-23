import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import { Image } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {formatTime} from "@/app/expos/carrie-fisher/utils";
import Hint from '@/app/expos/carrie-fisher/tabs/hintModal';
import useTimer from "@/app/expos/carrie-fisher/hooks/useTimer";

interface PlayingLucasProps {
    onWin: (time: number) => void;
    onBack: () => void;
}

const Playing_lucas: React.FC<PlayingLucasProps> = ({onWin, onBack}) => {
    const { elapsedTime, stopTimer } = useTimer(true);

    const handleWin = () => {
        stopTimer();
        onWin(elapsedTime)
    };

    return (
        <View style={styles_starwars.playingLucasContainer}>
          <Image
            source={require('@/assets/images/expos/carrieFisher/lucas/tatooine.png')}
            style={styles_starwars.playingLucasBackgroundImage}
            contentFit="cover"
          />

          <View style={styles_starwars.playingLucasOverlay}>
            <View style={styles_starwars.playingLucasTopBar}>
              <Text style={styles_starwars.playingLucasTimerText}>Temps : {formatTime(elapsedTime)}</Text>

                <Hint challengeId={0} theme={'dark'}/>
            </View>

            <Text style={styles_starwars.playingLucasTitle}>
              Retrouvez R2D2, il a les plans de l'étoile de la mort ! VITE !
            </Text>

            <TouchableOpacity style={styles_starwars.playingLucasCompassButton} onPress={handleWin}>
              <Image
                source={require('@/assets/images/expos/carrieFisher/lucas/bousolle.png')}
                style={styles_starwars.playingLucasCompass}
                contentFit="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles_starwars.playingLucasBackButton} onPress={onBack}>
              <Text style={styles_starwars.playingLucasBackButtonText}>Retour au menu des challenges</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
};

export default Playing_lucas;