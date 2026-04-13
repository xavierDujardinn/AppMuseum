import React from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

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
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{title}</Text>

                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.scrollText}>
                <Text style={styles.hintText}>{hint}</Text>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  modalContent: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: '#1c1c1c',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 18,
    borderWidth: 1.5,
    borderColor: '#F0A820',
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  modalTitle: {
    color: '#F0A820',
    fontSize: 20,
    fontFamily: 'Exo2-SemiBold',
  },

  closeIcon: {
    color: '#F0A820',
    fontSize: 24,
    paddingHorizontal: 6,
  },

  scrollText: {
    marginTop: 4,
  },

  hintText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Exo2',
  },
});

export default HintModal;