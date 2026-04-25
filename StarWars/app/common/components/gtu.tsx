import { useTranslation } from "@/app/common/hooks/languageContext";
import ThemedText from "@/app/common/components/themedText";
import { getGtuText } from "@/app/common/scripts/gtuHandler";
import styles from '@/styles/hub/common';
import React, { useEffect, useState } from "react";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";

const Gtu: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [gtuText, setgtuText] = useState('');

    const {locale, trad, themeColors} = useTranslation();

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
    }, [locale, trad]);

    return(
        <>
        {/* general terms of use */}
        <View style={styles.footer}>
            <TouchableOpacity
                style={[styles.termsButton, { backgroundColor: themeColors.secondaryAccent }]}
                onPress={() => setModalVisible(true)}
            >
                <ThemedText style={[styles.termsText, { color: themeColors.textOnAccent }]} weight="semibold">{trad('gtu.title')}</ThemedText>
            </TouchableOpacity>
        </View>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContent, { backgroundColor: themeColors.surface }]}>

                    <View style={styles.modalHeader}>
                        <ThemedText style={[styles.modalTitle, { color: themeColors.text }]} weight="bold">{trad('gtu.title')}</ThemedText>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <ThemedText style={[styles.closeIcon, { color: themeColors.text }]} weight="bold">✕</ThemedText>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.scrollText}>
                        <ThemedText style={[styles.genericText, { color: themeColors.text }]} weight="bold">{gtuText}</ThemedText>
                    </ScrollView>

                </View>
            </View>
        </Modal>
    </>
    );
}

export default Gtu;