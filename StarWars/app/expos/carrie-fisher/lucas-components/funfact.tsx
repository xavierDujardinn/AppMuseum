import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import { Image } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface FunfactLucasProps {
  onScoreboard: () => void;
}

const Funfact_lucas: React.FC<FunfactLucasProps> = ({ onScoreboard }) => {
  return (
    <View style={styles_starwars.funfactLucasContainer}>
      <Image
        source={require('@/assets/images/expos/carrieFisher/lucas/tatooine.png')}
        style={styles_starwars.funfactLucasBackgroundImage}
        contentFit="cover"
      />

      <View style={styles_starwars.funfactLucasOverlay}>
        <Image
          source={require('@/assets/images/expos/carrieFisher/lucas/funfact.png')}
          style={styles_starwars.funfactLucasImage}
          contentFit="contain"
        />

        <TouchableOpacity style={styles_starwars.funfactLucasScoreButton} onPress={onScoreboard}>
          <Text style={styles_starwars.funfactLucasScoreButtonText}>Tableau des scores</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Funfact_lucas;