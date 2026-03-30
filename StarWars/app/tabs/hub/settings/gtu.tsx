import React, {useEffect, useState} from "react";
import {getGtuText} from "@/scripts/gtuHandler";
import {Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from '../../../../styles/hub/common'

const Gtu: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [gtuText, setgtuText] = useState('');

    useEffect(() => {
        // load gtu file when component is loading
        const loadGtuText = async () => {
            try {
                const content = await getGtuText();
                setgtuText(content);
            }
            catch(e){
                console.error(`Error while loading GTU : ${e}`);
                setgtuText(`Erreur, réessayez plus tard.`);
            }
        }
        loadGtuText();
    }, []);

    return(
        <>
        {/* general terms of use */}
        <View style={styles.footer}>
            <TouchableOpacity
                style={styles.termsButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.termsText}>Conditions d'utilisation</Text>
            </TouchableOpacity>
        </View>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>

                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Conditions d'utilisation</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeIcon}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.scrollText}>
                        <Text style={styles.genericText}>
                            {gtuText}
                        </Text>
                    </ScrollView>

                </View>
            </View>
        </Modal>
    </>
    );
}

export default Gtu;