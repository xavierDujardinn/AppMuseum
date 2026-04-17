import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import { Image } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TableauLucasProps {
  onNext: () => void;
  elapsedTime: number;
  formatTime: (seconds: number) => string;
}

const Scoreboard_lucas: React.FC<TableauLucasProps> = ({
  onNext,
  elapsedTime,
  formatTime
}) => {
  return (
    <View style={styles_starwars.scoreboardLucasContainer}>
      <Image
        source={require('@/assets/images/expos/carrieFisher/lucas/tatooine.png')}
        style={styles_starwars.scoreboardLucasBackgroundImage}
        contentFit="cover"
      />

      <View style={styles_starwars.scoreboardLucasOverlay}>
        <View style={styles_starwars.scoreboardLucasScoreBlock}>
          <Text style={styles_starwars.scoreboardLucasTitle}>Tableau des scores :</Text>
          <Text style={styles_starwars.scoreboardLucasSeparator}>--------------------</Text>

          <Text style={[styles_starwars.scoreboardLucasScoreLine, styles_starwars.scoreboardLucasPlayerTime]}>
            Ton temps : {formatTime(elapsedTime)}
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

export default Scoreboard_lucas;