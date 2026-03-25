import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import Header from './header';
import {useSafeAreaInsets} from "react-native-safe-area-context";

const Main = () => {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            {/* We fill the top phone things for the header */}
            <View style={{ height: insets.top, backgroundColor: 'black' }} />

            <Header/>

            <View style={styles.content}>
                <Text style={styles.title}>Escape Museum</Text>
                <Text style={styles.subtitle}>
                    Découvrez nos{"\n"}expositions
                </Text>

                <TouchableOpacity style={styles.mainButton}>
                    <Text style={styles.mainButtonText}>Rejoindre une exposition</Text>
                </TouchableOpacity>

                <Image
                    source={require('../../../assets/images/escapemuseum.png')}
                    style={styles.middleImage}
                    resizeMode="contain"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2E9E4',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: 'Exo2-Bold',
        fontSize: 36,
        color: '#000',
        marginBottom: 40,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    subtitle: {
        fontFamily: 'Exo2-Bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 40,
    },
    mainButton: {
        backgroundColor: '#4A4E69',
        paddingVertical: 25,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
        marginBottom: 50,
    },
    mainButtonText: {
        fontFamily: 'Exo2-SemiBold',
        color: '#FFF',
        fontSize: 24,
    },
    middleImage: {
        width: '100%',
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
});

export default Main;