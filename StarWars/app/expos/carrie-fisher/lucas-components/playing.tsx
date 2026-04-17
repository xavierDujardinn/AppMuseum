import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import { Image } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import HintModal from './HintModal';

interface PlayingLucasProps {
  onWin: () => void;
  onBack: () => void;
  elapsedTime: number;
  isHintOpen: boolean;
  onOpenHint: () => void;
  onCloseHint: () => void;
  formatTime: (seconds: number) => string;
}

const Playing_lucas: React.FC<PlayingLucasProps> = ({
  onWin,
  onBack,
  elapsedTime,
  isHintOpen,
  onOpenHint,
  onCloseHint,
  formatTime,
}) => {
  const hintText =
    "Indice : R2D2 se trouve dans une zone où le magnétomètre semble indiquer une direction particulière. Pour l'instant, clique simplement sur la boussole pour valider l'épreuve.";

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

          <TouchableOpacity
            style={styles_starwars.playingLucasHintButton}
            onPress={onOpenHint}
          >
            <Image
              source={require('@/assets/images/expos/carrieFisher/hint.png')}
              style={styles_starwars.playingLucasHintIcon}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles_starwars.playingLucasTitle}>
          Retrouvez R2D2, il a les plans de l'étoile de la mort ! VITE !
        </Text>

        <TouchableOpacity style={styles_starwars.playingLucasCompassButton} onPress={onWin}>
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

      <HintModal
        visible={isHintOpen}
        onClose={onCloseHint}
        title="Indice"
        hint={hintText}
      />
    </View>
  );
};

export default Playing_lucas;