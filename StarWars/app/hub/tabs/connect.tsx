import { useTranslation } from "@/app/common/hooks/languageContext";
import ThemedText from "@/app/common/components/themedText";
import { verifyCode } from "@/app/common/scripts/expoCodeVerifyer";
import styles from '@/styles/hub/common';
import React, { useState } from 'react';
import { PermissionsAndroid, Platform, TouchableOpacity, View } from "react-native";
import { BleManager } from 'react-native-ble-plx';


interface ConnectProps {
    onNavigate: (screen: 'home' | 'connect' | 'code' | 'expo', params?: any) => void;
}

let manager: BleManager | null = null;
const getManager = () => {
    if (manager) return manager;
    manager = new BleManager();
    return manager;
};

const Connect: React.FC<ConnectProps> = ({onNavigate}) =>{
    const {trad, themeColors} = useTranslation();

    const [status, setStatus] = useState('bluetooth')
    const [canScan, setCanScan] = useState(true);

    const askFromPermissions = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                ]);

                const allGranted = Object.values(granted).every(
                    (result) => result === PermissionsAndroid.RESULTS.GRANTED
                );

                if (!allGranted) {
                    console.log("Détail des permissions :", granted);
                    setStatus('error');
                    return false;
                }
                else{
                    return true;
                }
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
    }

    const handleBluetoothScan = async () => {
        if (!canScan || status === 'scanning') return;
        setCanScan(false);

        const permissionsGranted = await askFromPermissions();

        if (permissionsGranted && (status !== 'error' || 'found')) {
            let bleManager: BleManager;
            try {
                bleManager = getManager();
            } catch (error) {
                console.log("BLE indisponible dans cet environnement:", error);
                setStatus('error');
                setCanScan(true);
                return;
            }

            await bleManager.startDeviceScan(null, null, (error, device) => {
                setStatus('scanning');
                if (error) {
                    console.log(error);
                    setStatus('error');
                    return;
                }
                if (device && device.name) {
                    let name = device.name?.split('_');

                    if (name[0] === 'EXPO') {
                        console.log(device);
                        bleManager.stopDeviceScan();
                        setStatus('found');

                        const expoData = verifyCode(name[1]);

                        if (expoData) {
                            onNavigate('expo', expoData);
                        }
                    }
                }
            });
        }

        setTimeout(() => {
            if (manager) {
                manager.stopDeviceScan();
            }
            setStatus('bluetooth');
            setCanScan(true);
        }, 5000)
    }

    return(
        <View style={styles.content}>
            <ThemedText style={styles.title} weight="bold">{trad('connect.title')}</ThemedText>
            <ThemedText>{status}</ThemedText>
            <ThemedText style={styles.subtitle} weight="bold">{trad('connect.choose')}</ThemedText>

            <TouchableOpacity
                style={[styles.connectMainButton, { backgroundColor: themeColors.accent }]}
                onPress={handleBluetoothScan}
                disabled={!canScan}
            >
                <ThemedText style={[styles.connectMainButtonText, { color: themeColors.textOnAccent }]} weight="semibold">{status === 'scanning' ? "Recherche..." : trad('connect.bluetooth')}</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.connectThirdButton, { backgroundColor: themeColors.secondaryAccent }]}
                onPress={() => onNavigate('code')}
            >
                <ThemedText style={[styles.connectMainButtonText, { color: themeColors.textOnAccent }]} weight="semibold">{trad('connect.code')}</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.secondaryButton, { borderColor: themeColors.border }]}
                onPress={() => onNavigate('home')}
            >
                <ThemedText style={[styles.secondaryButtonText, { color: themeColors.text }]} weight="semibold">{trad('common.back')}</ThemedText>
            </TouchableOpacity>
        </View>
    );
}

export default Connect;