import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import {getGtuText} from "@/scripts/gtuHandler";

const Settings: React.FC = () => {
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

    return (
        <>
            <View style={styles.content}>
                <Text style={styles.title}>Paramètres</Text>
            </View>

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
);}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingTop: 40,
    },
    title: {
        fontFamily: 'Exo2-Bold',
        fontSize: 36,
        color: '#000',
        marginBottom: 40,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    footer: {
        paddingBottom: 20,
        alignItems: 'center',
    },
    termsButton: {
        backgroundColor: '#A094A1',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 20,
        marginBottom: 10,
    },
    termsText: {
        color: '#FFF',
        fontFamily: 'Exo2-SemiBold',
        fontSize: 14,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000080',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        padding: 20,
        width: '100%',
        maxHeight: '80%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#D1C7C1',
        paddingBottom: 10,
    },
    modalTitle: {
        fontFamily: 'Exo2-Bold',
        fontSize: 20,
        color: '#4A4E69',
    },
    closeIcon: {
        fontSize: 24,
        color: '#4A4E69',
        fontWeight: 'bold',
    },
    scrollText: {
        marginVertical: 10,
    },
    genericText: {
        fontFamily: 'Exo2-Bold',
        fontSize: 24,
        textAlign: 'center',
    },
});

export default Settings;