import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HintModal from './HintModal';

interface PlayingLucasProps {
  onWin: () => void;
  onBack: () => void;
}

const Playing_lucas: React.FC<PlayingLucasProps> = ({ onWin, onBack }) => {
  const [hintVisible, setHintVisible] = React.useState(false);

  const hintText =
    "Indice : R2D2 se trouve dans une zone où le magnétomètre semble indiquer une direction particulière. Pour l'instant, clique simplement sur la boussole pour valider l'épreuve.";

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/expos/carrieFisher/lucas/tatooine.png')}
        style={styles.backgroundImage}
        contentFit="cover"
      />

      <View style={styles.overlay}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.hintButton}
            onPress={() => setHintVisible(true)}
          >
            <Image
              source={require('@/assets/images/expos/carrieFisher/hint.png')}
              style={styles.hintIcon}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>
          Retrouvez R2D2, il a les plans de l'étoile de la mort ! VITE !
        </Text>

        <TouchableOpacity style={styles.compassButton} onPress={onWin}>
          <Image
            source={require('@/assets/images/expos/carrieFisher/lucas/bousolle.png')}
            style={styles.compass}
            contentFit="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Retour au menu des challenges</Text>
        </TouchableOpacity>
      </View>

      <HintModal
        visible={hintVisible}
        onClose={() => setHintVisible(false)}
        title="Indice"
        hint={hintText}
      />
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
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },

  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },

  hintButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  hintIcon: {
    width: 42,
    height: 42,
  },

  title: {
    color: '#C62828',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Exo2-Bold',
    marginTop: 10,
    textShadow: '0px 0px 8px rgba(255,255,255,0.25)',
  } as any,

  compassButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },

  compass: {
    width: 800,
    height: 800,
    transform: [{ rotate: '31deg' }],
  },

  backButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1.5,
    borderColor: 'red',
    borderStyle: 'solid',
    paddingVertical: 18,
    paddingHorizontal: 26,
    borderRadius: 25,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  backButtonText: {
    textAlign: 'center',
    fontFamily: 'Exo2-SemiBold',
    color: '#F0A820',
    fontSize: 22,
  },
});

export default Playing_lucas;