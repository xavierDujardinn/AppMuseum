import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import { Image } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TutorialProps {
  onStart: () => void;
  onBack: () => void;
}

const tutorialText =
  "Pour cette épreuve, vous allez utiliser le magnétomètre, vous aurez besoin de bouger votre téléphone et d'avoir un espace dégagé autour de vous";

const Tutorial_lucas: React.FC<TutorialProps> = ({ onStart, onBack }) => {
  return (
    <View style={styles_starwars.tutorialLucasContainer}>
      <Image
        source={require('@/assets/images/expos/carrieFisher/space_background.jpg')}
        style={styles_starwars.tutorialLucasBackgroundImage}
        contentFit="cover"
      />

      <View style={styles_starwars.tutorialLucasOverlay}>
        <View style={styles_starwars.tutorialLucasContent}>
          <View style={styles_starwars.tutorialLucasTextWrapper}>
            <Text style={styles_starwars.tutorialLucasText}>{tutorialText}</Text>
          </View>

          <TouchableOpacity style={styles_starwars.tutorialLucasButton} onPress={onStart}>
            <Text style={styles_starwars.tutorialLucasButtonText}>En avant!</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles_starwars.tutorialLucasButton} onPress={onBack}>
            <Text style={styles_starwars.tutorialLucasButtonText}>Retourner au choix de challenge</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Tutorial_lucas;