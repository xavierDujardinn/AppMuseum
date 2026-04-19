import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import {ImageBackground} from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {BG_LIST, formatTime} from "@/app/expos/carrie-fisher/utils";

interface TableauLucasProps {
    challengeId: number;
    onNext: () => void;
    elaspedTime: number;
}

const Scoreboard: React.FC<TableauLucasProps> = ({challengeId, onNext, elaspedTime}) => {
    // On ira mettre et chercher ces infos dans les sauvegardes
    // Pour l'instant c'est que du fake
    return (
        <View style={styles_starwars.scoreboardLucasContainer}>
            <ImageBackground
                source={BG_LIST[challengeId]}
                style={styles_starwars.scoreboardLucasBackgroundImage}
                contentFit="cover"
            />

            <View style={styles_starwars.scoreboardLucasOverlay}>
                <View style={styles_starwars.scoreboardLucasScoreBlock}>
                    <Text style={styles_starwars.scoreboardLucasTitle}>Tableau des scores :</Text>
                    <Text style={styles_starwars.scoreboardLucasSeparator}>--------------------</Text>

                    <Text style={[styles_starwars.scoreboardLucasScoreLine, styles_starwars.scoreboardLucasPlayerTime]}>
                        Ton temps : {formatTime(elaspedTime)}
                    </Text>

                    <Text style={styles_starwars.scoreboardLucasScoreLine}>Lucas : 5000</Text>
                    <Text style={styles_starwars.scoreboardLucasScoreLine}>Xavier : 4999</Text>
                    <Text style={styles_starwars.scoreboardLucasScoreLine}>Gatien : 3500</Text>
                    <Text style={styles_starwars.scoreboardLucasScoreLine}>Loïc : 3000</Text>
                    <Text style={styles_starwars.scoreboardLucasScoreLine}>Thokar : 2999</Text>
                    <Text style={styles_starwars.scoreboardLucasScoreLine}>Malo : 2000</Text>
                    <Text style={styles_starwars.scoreboardLucasScoreLine}>Durand : 1500</Text>
                    <Text style={styles_starwars.scoreboardLucasScoreLine}>Erdem : 1450</Text>
                    <Text style={styles_starwars.scoreboardLucasScoreLine}>Louis : 1000</Text>
                    <Text style={styles_starwars.scoreboardLucasScoreLine}>Marine : 100</Text>
                </View>

                <TouchableOpacity style={styles_starwars.scoreboardLucasNextButton} onPress={onNext}>
                    <Text style={styles_starwars.scoreboardLucasNextButtonText}>Suivant</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Scoreboard;