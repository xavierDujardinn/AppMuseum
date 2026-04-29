import ThemedText from '@/app/common/components/themedText';
import { useTranslation } from '@/app/common/hooks/languageContext';
import { useUserSettings } from '@/app/common/hooks/userSettings';
import useTimer from '@/app/expos/carrie-fisher/hooks/useTimer';
import Hint from '@/app/expos/carrie-fisher/tabs/hintModal';
import HothBackdrop from '@/app/hub/components/HothBackdrop';
import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import styles from '@/styles/hub/common';
import { formatTime } from '@/utils/expo/carrie-fisher/utils';
import Slider from '@react-native-community/slider';
import { LightSensor } from 'expo-sensors';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Platform,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

interface ChallengeProps {
  onWin: (id: number, time: number) => void;
  onBack: () => void;
}

const SLIDER_MIN_LUX = 1;
const SLIDER_MAX_LUX = 450;

const LUX_FLOOR = 3;
const LUX_FULL_WHITE = 115;
const LUX_CURVE_GAMMA = 0.82;

const SUCCESS_LUX = 18;
const SUCCESS_HOLD_MS = 550;

function luxToGray(lux: number): number {
  const span = LUX_FULL_WHITE - LUX_FLOOR;
  const u = Math.max(0, Math.min(1, (lux - LUX_FLOOR) / span));
  return Math.round(255 * Math.pow(u, LUX_CURVE_GAMMA));
}

function messageKeyForGray(gray: number): string {
  if (gray > 205) {
    return 'expo.louis.game.tooBright';
  }
  if (gray > 118) {
    return 'expo.louis.game.almost';
  }
  return 'expo.louis.game.good';
}

const ChallengeShell: React.FC<{
  sceneHeight: number;
  children: React.ReactNode;
}> = ({ sceneHeight, children }) => (
  <View style={[styles.challengeSceneShell, { minHeight: sceneHeight }]}>
    <HothBackdrop sceneHeight={sceneHeight} />
    <View style={styles.challengeSceneForeground}>{children}</View>
  </View>
);

const LouisChallenge: React.FC<ChallengeProps> = ({ onWin, onBack }) => {
  const { themeColors } = useUserSettings();
  const { trad } = useTranslation();

  const [phase, setPhase] = useState<'game' | 'success'>('game');
  const [lux, setLux] = useState<number | null>(null);
  const [sensorReady, setSensorReady] = useState(false);
  const [useNativeSensor, setUseNativeSensor] = useState(false);
  const [simulatedLux, setSimulatedLux] = useState(95);

  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasWonRef = useRef(false);

  const { elapsedTime, stopTimer, startTimer } = useTimer(true);

  const { width, height } = useWindowDimensions();
  const contentWidth = Math.min(width - 28, 520);
  const sceneHeight = Math.max(height - 110, 520);

  const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));

  const factor = clamp(width / 390, 0.82, 1.25);
  const titleSize = clamp(Math.round(28 * factor), 22, 32);
  const textSize = clamp(Math.round(28 * factor), 18, 32);

  useEffect(() => {
    let sub: { remove: () => void } | undefined;

    (async () => {
      if (Platform.OS !== 'android') {
        setSensorReady(true);
        return;
      }

      try {
        const available = await LightSensor.isAvailableAsync();

        if (available) {
          setUseNativeSensor(true);
          LightSensor.setUpdateInterval(200);

          sub = LightSensor.addListener(({ illuminance }) => {
            setLux(illuminance);
          });
        }
      } catch {
        setUseNativeSensor(false);
      } finally {
        setSensorReady(true);
      }
    })();

    return () => {
      sub?.remove();
    };
  }, []);

  const effectiveLux = useMemo(() => {
    if (Platform.OS === 'android' && useNativeSensor && lux !== null) {
      return Math.max(SLIDER_MIN_LUX, lux);
    }

    return clamp(simulatedLux, SLIDER_MIN_LUX, SLIDER_MAX_LUX);
  }, [lux, simulatedLux, useNativeSensor]);

  const gray = useMemo(() => luxToGray(effectiveLux), [effectiveLux]);

  useEffect(() => {
    if (phase !== 'game' || hasWonRef.current) {
      return;
    }

    if (effectiveLux <= SUCCESS_LUX) {
      if (!successTimerRef.current) {
        successTimerRef.current = setTimeout(() => {
          hasWonRef.current = true;
          stopTimer();
          setPhase('success');
          successTimerRef.current = null;
        }, SUCCESS_HOLD_MS);
      }
    } else if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
      successTimerRef.current = null;
    }
  }, [effectiveLux, phase, stopTimer]);

  useEffect(() => {
    if (phase === 'game') {
      startTimer();
    } else {
      stopTimer();
    }
  }, [phase, startTimer, stopTimer]);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const handleContinueAfterSuccess = () => {
    onWin(2, elapsedTime);
  };

  const scrollBody = (body: React.ReactNode) => (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1, minHeight: sceneHeight }}
      keyboardShouldPersistTaps="handled"
    >
      <ChallengeShell sceneHeight={sceneHeight}>{body}</ChallengeShell>
    </ScrollView>
  );

  const showSimControls = Platform.OS !== 'android' || !useNativeSensor;
  const gameMessageKey = messageKeyForGray(gray);

  if (phase === 'success') {
    return scrollBody(
      <>
        <View style={styles_starwars.playingLouisTopBar}>
          <ThemedText style={styles_starwars.playingLouisTimerText} weight="bold">
            {formatTime(elapsedTime)}
          </ThemedText>
          <Hint challengeId={2} theme="light" />
        </View>

        <ThemedText
          preserveColor
          style={[
            styles.challengeAlert,
            {
              fontSize: titleSize,
              marginTop: 8,
              marginBottom: 20,
              color: '#000000',
            },
          ]}
        >
          {trad('expo.louis.success.title')}
        </ThemedText>

        <View style={{ flex: 1, justifyContent: 'center', width: '100%' }}>
          <ThemedText
            preserveColor
            style={[
              styles.challengeMainText,
              {
                fontSize: textSize,
                lineHeight: textSize + 4,
                color: '#000000',
              },
            ]}
          >
            {trad('expo.louis.success.body')}
          </ThemedText>
        </View>

        <TouchableOpacity
          style={styles.challengePaperButton}
          onPress={handleContinueAfterSuccess}
        >
          <ThemedText style={styles.challengePaperButtonText}>
            {trad('expo.louis.success.continue')}
          </ThemedText>
        </TouchableOpacity>
      </>
    );
  }

  return scrollBody(
    <>
      <View style={styles_starwars.playingLouisTopBar}>
        <ThemedText style={styles_starwars.playingLouisTimerText} weight="bold">
          {formatTime(elapsedTime)}
        </ThemedText>
        <Hint challengeId={2} theme="light" />
      </View>

      <ThemedText
        preserveColor
        style={[
          styles.challengeAlert,
          {
            fontSize: titleSize,
            marginTop: 8,
            marginBottom: 20,
            color: '#000000',
          },
        ]}
      >
        {trad('expo.louis.title')}
      </ThemedText>

      {!sensorReady && Platform.OS === 'android' ? (
        <ThemedText
          preserveColor
          style={[
            styles.challengeMainText,
            { fontSize: textSize * 0.65, color: '#000000' },
          ]}
        >
          {trad('expo.louis.initializing')}
        </ThemedText>
      ) : null}

      <View style={[styles.challengeIndicatorFrame, { width: contentWidth }]}>
        <View
          style={[
            styles.challengeIndicatorFill,
            { backgroundColor: `rgb(${gray},${gray},${gray})` },
          ]}
        />
      </View>

      {showSimControls && sensorReady ? (
        <View style={{ width: contentWidth, marginTop: 14, marginBottom: 10 }}>
          <ThemedText
            preserveColor
            style={[
              styles.challengeSimLabel,
              { fontSize: textSize * 0.42, color: '#000000' },
            ]}
          >
            {Platform.OS === 'android' && !useNativeSensor
              ? trad('expo.louis.sim.sensorUnavailable')
              : trad('expo.louis.sim.noSensor')}
          </ThemedText>

          <Slider
            minimumValue={SLIDER_MIN_LUX}
            maximumValue={SLIDER_MAX_LUX}
            value={simulatedLux}
            onValueChange={setSimulatedLux}
            minimumTrackTintColor={themeColors.accent}
            maximumTrackTintColor={themeColors.border}
            thumbTintColor={themeColors.secondaryAccent}
          />
        </View>
      ) : null}

      <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%', paddingBottom: 8 }}>
        <ThemedText
          preserveColor
          style={[
            styles.challengeMainText,
            {
              fontSize: textSize,
              lineHeight: textSize + 4,
              color: '#000000',
            },
          ]}
        >
          {trad(gameMessageKey)}
        </ThemedText>
      </View>

      <TouchableOpacity style={styles.challengeOutlineButton} onPress={onBack}>
        <ThemedText
          preserveColor
          style={[
            styles.challengeOutlineButtonText,
            {
              fontSize: clamp(Math.round(20 * factor), 16, 24),
              color: '#000000',
            },
          ]}
        >
          {trad('expo.common.backToChallenges')}
        </ThemedText>
      </TouchableOpacity>
    </>
  );
};

export default LouisChallenge;