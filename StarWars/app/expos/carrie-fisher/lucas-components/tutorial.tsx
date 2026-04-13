import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';

interface TutorialProps {
  onStart: () => void;
  onBack: () => void;
}

const tutorialText =
  "Pour cette épreuve, vous allez utiliser le magnétomètre, vous aurez besoin de bouger votre téléphone et d'avoir un espace dégagé autour de vous";

const Tutorial_lucas: React.FC<TutorialProps> = ({ onStart, onBack }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/expos/carrieFisher/space_background.jpg')}
        style={styles.backgroundImage}
        contentFit="cover"
      />

      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{tutorialText}</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={onStart}>
            <Text style={styles.textButton}>En avant!</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onBack}>
            <Text style={styles.textButton}>Retourner au choix de challenge</Text>
          </TouchableOpacity>
        </View>
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
    ...StyleSheet.absoluteFillObject,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  textWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },

  text: {
    width: '100%',
    color: '#FFD05A',
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Exo2',
    textShadow:
      '0px 0px 8px rgba(255, 230, 150, 1), ' +
      '0px 0px 18px rgba(255, 210, 110, 1), ' +
      '0px 0px 34px rgba(255, 180, 40, 1), ' +
      '0px 0px 52px rgba(255, 140, 0, 0.95)',
  } as any,

  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    borderWidth: 1.5,
    borderColor: 'red',
    borderStyle: 'solid',
    paddingVertical: 18,
    paddingHorizontal: 26,
    borderRadius: 25,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  textButton: {
    textAlign: 'center',
    fontFamily: 'Exo2-SemiBold',
    color: '#F0A820',
    fontSize: 22,
    textShadow: '0px 0px 8px rgba(240, 168, 32, 0.7)',
  } as any,
});

export default Tutorial_lucas;