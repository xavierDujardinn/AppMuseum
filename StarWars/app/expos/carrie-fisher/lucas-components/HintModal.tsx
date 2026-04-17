import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

interface HintModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  hint: string;
}

const HintModal: React.FC<HintModalProps> = ({
  visible,
  onClose,
  title,
  hint,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles_starwars.hintModalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles_starwars.hintModalContent}>
              <View style={styles_starwars.hintModalHeader}>
                <Text style={styles_starwars.hintModalTitle}>{title}</Text>

                <TouchableOpacity onPress={onClose}>
                  <Text style={styles_starwars.hintModalCloseIcon}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles_starwars.hintModalScrollText}>
                <Text style={styles_starwars.hintModalText}>{hint}</Text>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default HintModal;