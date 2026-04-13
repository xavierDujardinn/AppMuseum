import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';

interface WinProps {
  onCardPress: () => void;
  onBackToMenu: () => void;
}

const Win_lucas: React.FC<WinProps> = ({ onCardPress, onBackToMenu }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/expos/carrieFisher/lucas/tatooine.png')}
        style={styles.backgroundImage}
        contentFit="cover"
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>
          Bravo vous avez retrouvé{"\n"}R2D2 !
        </Text>

        <Image
          source={require('@/assets/images/expos/carrieFisher/lucas/R2D2.png')}
          style={styles.r2d2}
          contentFit="contain"
        />

        <TouchableOpacity style={styles.cardButton} onPress={onCardPress}>
          <Image
            source={require('@/assets/images/expos/carrieFisher/carte.png')}
            style={styles.card}
            contentFit="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
          <Text style={styles.backButtonText}>
            Retour au menu des challenges
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },

  overlay: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 90,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },

  title: {
    color: '#C62828',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Exo2-Bold',
    marginBottom: 20,
    textShadow: '0px 0px 8px rgba(255,255,255,0.2)',
  } as any,

  r2d2: {
    width: 260,
    height: 360,
    marginTop: 10,
    marginBottom: 10,
  },

  cardButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10,
    marginBottom: 20,
  },

  card: {
    width: 110,
    height: 90,
  },

  backButton: {
    marginTop: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
    borderWidth: 1.5,
    borderColor: 'red',
    borderStyle: 'solid',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButtonText: {
    textAlign: 'center',
    fontFamily: 'Exo2-SemiBold',
    color: '#F0A820',
    fontSize: 20,
  },
});

export default Win_lucas;