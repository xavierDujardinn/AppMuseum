import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
    Platform,
    ScrollView,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {LightSensor} from 'expo-sensors';
import HothBackdrop from '@/app/hub/components/HothBackdrop';
import styles from '@/styles/hub/common';
import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import useTimer from '@/app/expos/carrie-fisher/hooks/useTimer';
import {formatTime} from '@/utils/expo/carrie-fisher/utils';
import Hint from '@/app/expos/carrie-fisher/tabs/hintModal';
import ThemedText from '@/app/common/components/themedText';
import {useTranslation} from '@/app/common/hooks/languageContext';

interface ChallengeProps {
    onNavigate: (screen: 'home') => void;
}

const SCORE_LINES = [
    'Lucas : 5000',
    'Xavier : 4999',
    'Gatien : 3500',
    'Loic : 3000',
    'Thokar : 2999',
    'Malo : 2000',
    'Durand : 1500',
    'Erdem : 1450',
    'Louis : 1000',
    'Marine : 100',
];

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

function messageForGray(gray: number): string {
    if (gray > 205) {
        return 'Vous êtes baigné de lumière, cachez vous vite !';
    }
    if (gray > 118) {
        return 'Encore un petit effort, le prédateur arrive !';
    }
    return 'Presque… un peu plus sombre !';
}

const ChallengeShell: React.FC<{
    sceneHeight: number;
    children: React.ReactNode;
}> = ({sceneHeight, children}) => (
    <View style={[styles.challengeSceneShell, {minHeight: sceneHeight}]}>
        <HothBackdrop sceneHeight={sceneHeight}/>
        <View style={styles.challengeSceneForeground}>{children}</View>
    </View>
);

const LouisChallenge: React.FC<ChallengeProps> = ({onNavigate}) => {
    const {themeColors} = useTranslation();
    const [phase, setPhase] = useState<'game' | 'success' | 'story' | 'scores'>('game');
    const [lux, setLux] = useState<number | null>(null);
    const [sensorReady, setSensorReady] = useState(false);
    const [useNativeSensor, setUseNativeSensor] = useState(false);
    const [simulatedLux, setSimulatedLux] = useState(95);

    const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const {elapsedTime, stopTimer, startTimer} = useTimer(true);

    const {width, height} = useWindowDimensions();
    const contentWidth = Math.min(width - 28, 520);
    const sceneHeight = Math.max(height - 110, 520);

    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
    const factor = clamp(width / 390, 0.82, 1.25);
    const titleSize = clamp(Math.round(28 * factor), 22, 32);
    const textSize = clamp(Math.round(28 * factor), 18, 32);
    const scoreSize = clamp(Math.round(24 * factor), 18, 27);

    useEffect(() => {
        let sub: {remove: () => void} | undefined;

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
                    sub = LightSensor.addListener(({illuminance}) => {
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
        if (phase !== 'game') {
            return;
        }
        if (effectiveLux <= SUCCESS_LUX) {
            if (!successTimerRef.current) {
                successTimerRef.current = setTimeout(() => {
                    setPhase('success');
                    successTimerRef.current = null;
                }, SUCCESS_HOLD_MS);
            }
        } else if (successTimerRef.current) {
            clearTimeout(successTimerRef.current);
            successTimerRef.current = null;
        }
    }, [effectiveLux, phase]);

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

    const goToStory = () => setPhase('story');
    const goToScores = () => setPhase('scores');

    const scrollBody = (body: React.ReactNode) => (
        <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{flexGrow: 1, minHeight: sceneHeight}}
            keyboardShouldPersistTaps="handled"
        >
            <ChallengeShell sceneHeight={sceneHeight}>{body}</ChallengeShell>
        </ScrollView>
    );

    if (phase === 'game' || phase === 'success') {
        const showSimControls = Platform.OS !== 'android' || !useNativeSensor;
        const gameMessage =
            phase === 'success'
                ? "Vous avez réussi! Le prédateur est parti.\nTient, c'est quoi ça ?"
                : messageForGray(gray);

        return scrollBody(
            <>
                <View style={styles_starwars.playingLucasTopBar}>
                    <ThemedText style={styles_starwars.playingLucasTimerText} weight="bold">
                        {formatTime(elapsedTime)}
                    </ThemedText>
                    <Hint challengeId={2} theme={'light'} />
                </View>

                <ThemedText preserveColor style={[styles.challengeAlert, {fontSize: titleSize, marginTop: 8, marginBottom: 20, color: '#000000'}]}>
                    Cachez vous des prédateurs!
                </ThemedText>

                {!sensorReady && Platform.OS === 'android' ? (
                    <ThemedText preserveColor style={[styles.challengeMainText, {fontSize: textSize * 0.65, color: '#000000'}]}>Initialisation du capteur…</ThemedText>
                ) : null}

                <View style={[styles.challengeIndicatorFrame, {width: contentWidth}]}>
                    <View
                        style={[
                            styles.challengeIndicatorFill,
                            {backgroundColor: `rgb(${gray},${gray},${gray})`},
                        ]}
                    />
                </View>

                {showSimControls && sensorReady && phase === 'game' ? (
                    <View style={{width: contentWidth, marginTop: 14, marginBottom: 10}}>
                        <ThemedText preserveColor style={[styles.challengeSimLabel, {fontSize: textSize * 0.42, color: '#000000'}]}>
                            {Platform.OS === 'android' && !useNativeSensor
                                ? 'Capteur indisponible — luminosité simulée :'
                                : 'Luminosité simulée (pas de capteur sur cet appareil) :'}
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

                <View style={{flex: 1, justifyContent: 'flex-end', width: '100%', paddingBottom: 8}}>
                    <ThemedText preserveColor style={[styles.challengeMainText, {fontSize: textSize, lineHeight: textSize + 4, color: '#000000'}]}>
                        {gameMessage}
                    </ThemedText>
                </View>

                {phase === 'success' ? (
                    <TouchableOpacity onPress={goToStory} style={styles.challengePaperButton}>
                        <ThemedText style={styles.challengePaperButtonText}>Indice</ThemedText>
                    </TouchableOpacity>
                ) : null}
            </>,
        );
    }

    if (phase === 'story') {
        return scrollBody(
            <>
                <View style={[styles.challengeFactCard, {width: contentWidth, marginTop: 24}]}>
                    <ThemedText
                        preserveColor
                        style={[
                            styles.challengeFactText,
                            {
                                fontSize: clamp(Math.round(22 * factor), 16, 26),
                                lineHeight: clamp(Math.round(26 * factor), 20, 30),
                                color: '#000000',
                            },
                        ]}
                    >
                        Pendant le tournage des scènes de la base rebelle sur Hoth dans L&apos;Empire contre-attaque,
                        Carrie Fisher est arrivée sur le plateau de Finse en Norvège, dans un décor quasi polaire,
                        juste pour être avec l&apos;équipe, alors que ses scènes à elle étaient surtout filmées en
                        studio.
                    </ThemedText>
                </View>
                <TouchableOpacity style={styles.challengeOutlineButton} onPress={goToScores}>
                    <ThemedText preserveColor style={[styles.challengeOutlineButtonText, {fontSize: clamp(Math.round(20 * factor), 16, 24), color: '#000000'}]}>
                        Tableau des scores
                    </ThemedText>
                </TouchableOpacity>
            </>,
        );
    }

    return scrollBody(
        <>
            <View style={[styles.challengeScoresCard, {width: contentWidth, marginTop: 24}]}>
                <ThemedText preserveColor style={[styles.challengeScoresTitle, {fontSize: clamp(Math.round(28 * factor), 20, 34), color: '#000000'}]}>
                    Tableau des scores :
                </ThemedText>
                {SCORE_LINES.map((line) => (
                    <ThemedText preserveColor key={line} style={[styles.challengeScoreLine, {fontSize: scoreSize, lineHeight: scoreSize + 3, color: '#000000'}]}>
                        {line}
                    </ThemedText>
                ))}
            </View>
            <TouchableOpacity style={styles.challengeOutlineButton} onPress={() => onNavigate('home')}>
                <ThemedText preserveColor style={[styles.challengeOutlineButtonText, {fontSize: clamp(Math.round(20 * factor), 16, 24), color: '#000000'}]}>
                    Fin des épreuves
                </ThemedText>
            </TouchableOpacity>
        </>,
    );
};

export default LouisChallenge;
