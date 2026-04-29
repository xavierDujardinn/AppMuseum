import ThemedText from '@/app/common/components/themedText';
import { useTranslation } from "@/app/common/hooks/languageContext"; // <- modifié
import useTimer from "@/app/expos/carrie-fisher/hooks/useTimer";
import Hint from '@/app/expos/carrie-fisher/tabs/hintModal';
import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import { formatTime } from "@/utils/expo/carrie-fisher/utils";
import { Image } from 'expo-image';
import { Magnetometer } from 'expo-sensors';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

interface PlayingLucasProps {
  onWin: (id: number, time: number) => void;
  onBack: () => void;
}

const HOLD_DURATION_MS = 3000;
const SUCCESS_TOLERANCE = 10;
const SENSOR_UPDATE_MS = 250;
const DISPLAY_UPDATE_MS = 450;
const SMOOTHING_FACTOR = 0.18;

const normalizeHeading = (deg: number) => {
  const normalized = deg % 360;
  return normalized < 0 ? normalized + 360 : normalized;
};

const magnetometerToHeading = (x: number, y: number) => {
  const angle = Math.atan2(y, x) * (180 / Math.PI);
  return normalizeHeading(angle >= 0 ? angle : angle + 360);
};

const angularDifference = (a: number, b: number) => {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
};

const smoothAngle = (current: number, target: number, factor: number) => {
  const delta = ((target - current + 540) % 360) - 180;
  return normalizeHeading(current + delta * factor);
};

const getHeatMessageKey = (diff: number) => {
  if (diff <= SUCCESS_TOLERANCE) return 'expo.lucas.feedback.freeze'; // <- modifié
  if (diff <= 18) return 'expo.lucas.feedback.boiling'; // <- modifié
  if (diff <= 40) return 'expo.lucas.feedback.hot'; // <- modifié
  if (diff <= 75) return 'expo.lucas.feedback.warm'; // <- modifié
  return 'expo.lucas.feedback.cold'; // <- modifié
};

const getCardinalDirectionKey = (angle: number) => {
  const normalized = normalizeHeading(angle);

  if (normalized >= 315 || normalized < 45) return 'expo.lucas.direction.north'; // <- modifié
  if (normalized >= 45 && normalized < 135) return 'expo.lucas.direction.east'; // <- modifié
  if (normalized >= 135 && normalized < 225) return 'expo.lucas.direction.south'; // <- modifié
  return 'expo.lucas.direction.west'; // <- modifié
};

const Playing_lucas: React.FC<PlayingLucasProps> = ({ onWin, onBack }) => {
  const { trad } = useTranslation(); // <- modifié
  const { elapsedTime, stopTimer } = useTimer(true);

  const [heading, setHeading] = useState(0);
  const [isSensorReady, setIsSensorReady] = useState(false);
  const [targetAngle] = useState(() => Math.floor(Math.random() * 360) + 1);
  const [holdRemainingMs, setHoldRemainingMs] = useState(HOLD_DURATION_MS);

  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdStartedAtRef = useRef<number | null>(null);
  const lastDisplayUpdateRef = useRef<number>(0);
  const hasWonRef = useRef(false);

  const handleWin = useCallback(() => {
    if (hasWonRef.current) return;
    hasWonRef.current = true;
    stopTimer();
    onWin(0, elapsedTime);
  }, [elapsedTime, onWin, stopTimer]);

  useEffect(() => {
    let subscription: { remove: () => void } | null = null;

    const setupMagnetometer = async () => {
      try {
        const available = await Magnetometer.isAvailableAsync();

        if (!available) {
          console.warn('Magnétomètre indisponible sur cet appareil');
          setIsSensorReady(false);
          return;
        }

        Magnetometer.setUpdateInterval(SENSOR_UPDATE_MS);

        subscription = Magnetometer.addListener(({ x, y }) => {
          const measuredHeading = normalizeHeading(magnetometerToHeading(x, y) - 90);

          const now = Date.now();
          if (now - lastDisplayUpdateRef.current < DISPLAY_UPDATE_MS) {
            return;
          }

          lastDisplayUpdateRef.current = now;

          setHeading((prev) => smoothAngle(prev, measuredHeading, SMOOTHING_FACTOR));
          setIsSensorReady(true);
        });
      } catch (error) {
        console.error('Erreur magnétomètre :', error);
        setIsSensorReady(false);
      }
    };

    setupMagnetometer();

    return () => {
      subscription?.remove();

      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const diff = useMemo(() => angularDifference(heading, targetAngle), [heading, targetAngle]);

  const message = useMemo(() => {
    if (!isSensorReady) {
      return trad('expo.lucas.magnetometerUnavailable'); // <- modifié
    }

    return trad(getHeatMessageKey(diff)); // <- modifié
  }, [diff, isSensorReady, trad]);

  const targetDirectionLabel = useMemo(
    () => trad(getCardinalDirectionKey(targetAngle)), // <- modifié
    [targetAngle, trad]
  );

  useEffect(() => {
    const isInSuccessZone = diff <= SUCCESS_TOLERANCE;

    if (isInSuccessZone) {
      if (!successTimeoutRef.current) {
        holdStartedAtRef.current = Date.now();

        successTimeoutRef.current = setTimeout(() => {
          handleWin();
        }, HOLD_DURATION_MS);
      }

      if (holdStartedAtRef.current) {
        const elapsedHold = Date.now() - holdStartedAtRef.current;
        setHoldRemainingMs(Math.max(0, HOLD_DURATION_MS - elapsedHold));
      }
    } else {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
        successTimeoutRef.current = null;
      }

      holdStartedAtRef.current = null;
      setHoldRemainingMs(HOLD_DURATION_MS);
    }
  }, [diff, handleWin]);

  const holdSeconds = Math.ceil(holdRemainingMs / 1000);

  return (
    <View style={styles_starwars.playingLucasContainer}>
      <Image
        source={require('@/assets/images/expos/carrieFisher/lucas/tatooine.png')}
        style={styles_starwars.playingLucasBackgroundImage}
        contentFit="cover"
      />

      <View style={styles_starwars.playingLucasOverlay}>
        <View style={styles_starwars.playingLucasTopBar}>
          <ThemedText style={styles_starwars.playingLucasTimerText} weight="bold">
            {trad('expo.lucas.time')} : {formatTime(elapsedTime)} {/* <- modifié */}
          </ThemedText>

          <Hint challengeId={0} theme={'dark'} />
        </View>

        <ThemedText style={styles_starwars.playingLucasTitle} weight="bold">
          {trad('expo.lucas.title')} {/* <- modifié */}
        </ThemedText>

        <ThemedText style={styles_starwars.playingLucasTitle}>
          {trad('expo.lucas.hintPrefix')} {targetDirectionLabel} {/* <- modifié */}
        </ThemedText>

        <View style={styles_starwars.playingLucasCompassButton}>
          <Image
            source={require('@/assets/images/expos/carrieFisher/lucas/bousolle.png')}
            style={[
              styles_starwars.playingLucasCompass,
              { transform: [{ rotate: `${-heading}deg` }] },
            ]}
            contentFit="contain"
          />
        </View>

        <ThemedText style={styles_starwars.playingLucasTitle}>
          {message}
        </ThemedText>

        {diff <= SUCCESS_TOLERANCE ? (
          <ThemedText style={styles_starwars.playingLucasTitle}>
            {trad('expo.lucas.holdStill')} {holdSeconds}s {/* <- modifié */}
          </ThemedText>
        ) : null}

        <TouchableOpacity style={styles_starwars.playingLucasBackButton} onPress={onBack}>
          <ThemedText style={styles_starwars.playingLucasBackButtonText} weight="bold">
            {trad('expo.common.backToChallenges')} {/* <- modifié */}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Playing_lucas;