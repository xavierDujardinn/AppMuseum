import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TableauLucasProps {
  onNext: () => void;
}

const Scoreboard_lucas: React.FC<TableauLucasProps> = ({ onNext }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/expos/carrieFisher/lucas/tatooine.png')}
        style={styles.backgroundImage}
        contentFit="cover"
      />

      <View style={styles.overlay}>
        <View style={styles.scoreBlock}>
          <Text style={styles.title}>Tableau des scores :</Text>
          <Text style={styles.separator}>--------------------</Text>

          <Text style={styles.scoreLine}>Lucas : 5000</Text>
          <Text style={styles.scoreLine}>Xavier : 4999</Text>
          <Text style={styles.scoreLine}>Gatien : 3500</Text>
          <Text style={styles.scoreLine}>Loïc : 3000</Text>
          <Text style={styles.scoreLine}>Thokar : 2999</Text>
          <Text style={styles.scoreLine}>Malo : 2000</Text>
          <Text style={styles.scoreLine}>Durand : 1500</Text>
          <Text style={styles.scoreLine}>Erdem : 1450</Text>
          <Text style={styles.scoreLine}>Louis : 1000</Text>
          <Text style={styles.scoreLine}>Marine : 100</Text>
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextButtonText}>Suivant</Text>
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
    paddingTop: 150,
    paddingBottom: 35,
    paddingHorizontal: 20,
  },

  scoreBlock: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#111',
    fontSize: 70,
    fontFamily: 'Exo2-Bold',
    textAlign: 'center',
    marginBottom: 6,
  },

  separator: {
    color: '#111',
    fontSize: 70,
    fontFamily: 'Exo2-Bold',
    textAlign: 'center',
    marginBottom: 8,
  },

  scoreLine: {
    color: '#111',
    fontSize: 55,
    fontFamily: 'Exo2-Bold',
    textAlign: 'center',
    marginBottom: 2,
  },

  nextButton: {
    width: '88%',
    minHeight: 82,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#E35A3B',
    backgroundColor: 'rgba(186, 153, 102, 0.20)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nextButtonText: {
    color: '#F0A820',
    fontSize: 20,
    fontFamily: 'Exo2-SemiBold',
    textAlign: 'center',
  },
});

export default Scoreboard_lucas;