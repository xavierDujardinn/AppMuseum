import { useTranslation } from "@/app/common/hooks/languageContext";
import { verifyCode } from "@/app/common/scripts/expoCodeVerifyer";
import styles from '@/styles/hub/common';
import React, { useState } from 'react';
import { PermissionsAndroid, Platform, Text, TouchableOpacity, View } from "react-native";
import { BleManager } from 'react-native-ble-plx';


interface ConnectProps {
    onNavigate: (screen: 'home' | 'connect' | 'code' | 'expo', params?: any) => void;
}

const manager = new BleManager();

const Connect: React.FC<ConnectProps> = ({onNavigate}) =>{
    const {trad} = useTranslation();

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
            await manager.startDeviceScan(null, null, (error, device) => {
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
                        manager.stopDeviceScan();
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
            manager.stopDeviceScan();
            setStatus('bluetooth');
            setCanScan(true);
        }, 5000)
    }

    return(
        <View style={styles.content}>
            <Text style={styles.title}>{trad('connect.title')}</Text>
            <Text>{status}</Text>
            <Text style={styles.subtitle}>{trad('connect.choose')}</Text>

            <TouchableOpacity
                style={styles.connectMainButton}
                onPress={handleBluetoothScan}
                disabled={!canScan}
            >
                <Text style={styles.connectMainButtonText}>{status === 'scanning' ? "Recherche..." : trad('connect.bluetooth')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.connectThirdButton}
                onPress={() => onNavigate('code')}
            >
                <Text style={styles.connectMainButtonText}>{trad('connect.code')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => onNavigate('home')}
            >
                <Text style={styles.secondaryButtonText}>{trad('common.back')}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Connect;