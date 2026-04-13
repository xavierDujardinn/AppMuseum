import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FunfactLucasProps {
  onScoreboard: () => void;
}

const Funfact_lucas: React.FC<FunfactLucasProps> = ({ onScoreboard }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/expos/carrieFisher/lucas/tatooine.png')}
        style={styles.backgroundImage}
        contentFit="cover"
      />

      <View style={styles.overlay}>
        <Image
          source={require('@/assets/images/expos/carrieFisher/lucas/funfact.png')}
          style={styles.funfactImage}
          contentFit="contain"
        />

        <TouchableOpacity style={styles.scoreButton} onPress={onScoreboard}>
          <Text style={styles.scoreButtonText}>Tableau des scores</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },

  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 120,
    paddingBottom: 35,
    paddingHorizontal: 18,
  },

  funfactImage: {
    width: '92%',
    height: 800,
  },

  scoreButton: {
    width: '88%',
    minHeight: 82,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#E35A3B',
    backgroundColor: 'rgba(186, 153, 102, 0.20)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scoreButtonText: {
    color: '#F0A820',
    fontSize: 20,
    fontFamily: 'Exo2-SemiBold',
    textAlign: 'center',
  },
});

export default Funfact_lucas;