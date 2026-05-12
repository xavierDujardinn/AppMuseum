import ThemedText from "@/app/common/components/themedText";
import { useTranslation } from "@/app/common/hooks/languageContext";
import { useUserSettings } from "@/app/common/hooks/userSettings";
import styles from "@/styles/hub/common";
import { verifyCode } from "@/utils/common/expoCodeVerifyer";
import React, { useRef, useState } from "react";
import { PermissionsAndroid, Platform, TouchableOpacity, View } from "react-native";
import { BleManager } from "react-native-ble-plx";

interface ConnectProps {
  onNavigate: (screen: "home" | "connect" | "code" | "expo", params?: any) => void;
}

let manager: BleManager | null = null;

const getManager = () => {
  if (manager) return manager;
  manager = new BleManager();
  return manager;
};

const Connect: React.FC<ConnectProps> = ({ onNavigate }) => {
  const { trad } = useTranslation();
  const { themeColors } = useUserSettings();

  const [status, setStatus] = useState("bluetooth");
  const [canScan, setCanScan] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopScan = () => {
    if (manager) {
      manager.stopDeviceScan();
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const askForPermissions = async () => {
    if (Platform.OS !== "android") return true;

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
        setStatus("error");
        return false;
      }

      return true;
    } catch (err) {
      console.warn(err);
      setStatus("error");
      return false;
    }
  };

  const handleBluetoothScan = async () => {
    if (!canScan || status === "scanning") return;

    setCanScan(false);
    setStatus("scanning");

    const permissionsGranted = await askForPermissions();

    if (!permissionsGranted) {
      setCanScan(true);
      return;
    }

    let bleManager: BleManager;

    try {
      bleManager = getManager();
    } catch (error) {
      console.error("BLE indisponible dans cet environnement:", error);
      setStatus("error");
      setCanScan(true);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      stopScan();
      setStatus("bluetooth");
      setCanScan(true);
    }, 5000);

    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error("Erreur scan BLE:", error);
        stopScan();
        setStatus("error");
        setCanScan(true);
        return;
      }

      const rawName = device?.name?.trim();
      if (!rawName) return;

      const parts = rawName.split("_");
      const prefix = parts[0]?.trim().toUpperCase();
      const code = parts[1]?.trim().toUpperCase();

      console.log("BLE name:", rawName);
      console.log("BLE prefix:", prefix);
      console.log("BLE code:", code);

      if (prefix !== "EXPO" || !code) return;

      const expoData = verifyCode(code);

      if (!expoData) return;

      stopScan();
      setStatus("found");
      setCanScan(true);
      onNavigate("expo", expoData);
    });
  };

  return (
    <View style={styles.content}>
      <ThemedText style={styles.title} weight="bold">
        {trad("connect.title")}
      </ThemedText>

      <ThemedText>{status}</ThemedText>

      <ThemedText style={styles.subtitle} weight="bold">
        {trad("connect.choose")}
      </ThemedText>

      <TouchableOpacity
        style={[styles.connectMainButton, { backgroundColor: themeColors.accent }]}
        onPress={handleBluetoothScan}
        disabled={!canScan}
      >
        <ThemedText
          style={[styles.connectMainButtonText, { color: themeColors.textOnAccent }]}
          weight="semibold"
        >
          {status === "scanning" ? "Recherche..." : trad("connect.bluetooth")}
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.connectThirdButton, { backgroundColor: themeColors.accent }]}
        onPress={() => onNavigate("code")}
      >
        <ThemedText
          style={[styles.connectMainButtonText, { color: themeColors.textOnAccent }]}
          weight="semibold"
        >
          {trad("connect.code")}
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.secondaryButton, { borderColor: themeColors.border }]}
        onPress={() => onNavigate("home")}
      >
        <ThemedText
          style={[styles.secondaryButtonText, { color: themeColors.text }]}
          weight="semibold"
        >
          {trad("common.back")}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default Connect;