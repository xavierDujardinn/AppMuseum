import React, {useEffect, useState} from "react";
import {getGtuText} from "@/scripts/gtuHandler";
import {Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from '../../../styles/hub/common';
import {useTranslation} from "@/app/hooks/languageContext";

const Gtu: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [gtuText, setgtuText] = useState('');

    const {locale, trad} = useTranslation();

    useEffect(() => {
        // load gtu file when component is loading
        const loadGtuText = async () => {
            try {
                const content = await getGtuText(locale);
                setgtuText(content);
            }
            catch(e){
                console.error(`${trad('cgu.error')} : ${e}`);
                setgtuText(trad('cgu.later'));
            }
        }
        loadGtuText();
    }, [locale]);

    return(
        <>
        {/* general terms of use */}
        <View style={styles.footer}>
            <TouchableOpacity
                style={styles.termsButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.termsText}>{trad('gtu.title')}</Text>
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
                        <Text style={styles.modalTitle}>{trad('gtu.title')}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeIcon}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.scrollText}>
                        <Text style={styles.genericText}>{gtuText}</Text>
                    </ScrollView>

                </View>
            </View>
        </Modal>
    </>
    );
}

export default Gtu;