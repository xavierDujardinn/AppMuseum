import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {LightSensor} from 'expo-sensors';
import styles from '../../../styles/hub/common';

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

/** Lux typique : pièce sombre ~1–30, intérieur ~100–500, jour ~1000+. */
const MIN_LUX = 1;
const MAX_LUX = 2500;
const SUCCESS_LUX = 35;
const SUCCESS_HOLD_MS = 550;

function luxToGray(lux: number): number {
    const t = Math.max(0, Math.min(1, (lux - MIN_LUX) / (MAX_LUX - MIN_LUX)));
    return Math.round(255 * t);
}

function messageForGray(gray: number): string {
    if (gray > 200) {
        return 'Vous êtes baigné de lumière, cachez vous vite !';
    }
    if (gray > 110) {
        return 'Encore un petit effort, le prédateur arrive !';
    }
    return 'Presque… un peu plus sombre !';
}

const Challenge: React.FC<ChallengeProps> = ({onNavigate}) => {
    const [phase, setPhase] = useState<'game' | 'success' | 'story' | 'scores'>('game');
    const [lux, setLux] = useState<number | null>(null);
    const [sensorReady, setSensorReady] = useState(false);
    const [useNativeSensor, setUseNativeSensor] = useState(false);
    const [simulatedLux, setSimulatedLux] = useState(MAX_LUX * 0.85);

    const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const {width, height} = useWindowDimensions();
    const isDesktop = width >= 900;
    const contentWidth = Math.min(width - 28, 520);

    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
    const factor = clamp(width / 390, 0.82, 1.25);
    const titleSize = clamp(Math.round(30 * factor), 24, 34);
    const textSize = clamp(Math.round(30 * factor), 20, 34);
    const scoreSize = clamp(Math.round(24 * factor), 18, 27);
    const topMargin = isDesktop ? 14 : 8;

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
            return clamp(lux, MIN_LUX, MAX_LUX * 1.2);
        }
        return clamp(simulatedLux, MIN_LUX, MAX_LUX);
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
        return () => {
            if (successTimerRef.current) {
                clearTimeout(successTimerRef.current);
            }
        };
    }, []);

    const renderTopDecor = useCallback(() => {
        return (
            <View style={[styles.challengeSky, {width: contentWidth, marginBottom: 10 + topMargin}]}>
                <View style={styles.challengeSun}/>
                <View style={styles.challengeMountainBack}/>
                <View style={styles.challengeMountainFront}/>
            </View>
        );
    }, [contentWidth, topMargin]);

    const goToStory = () => setPhase('story');
    const goToScores = () => setPhase('scores');

    if (phase === 'game' || phase === 'success') {
        const showSimControls = Platform.OS !== 'android' || !useNativeSensor;
        const gameMessage =
            phase === 'success'
                ? "Vous avez réussi! Le prédateur est parti.\nTient, c'est quoi ça ?"
                : messageForGray(gray);

        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={[styles.challengeContainer, {minHeight: height - 90}]}>
                    {renderTopDecor()}
                    <Text style={[styles.challengeAlert, {fontSize: titleSize, marginTop: -156}]}>
                        Cachez vous des prédateurs!
                    </Text>
                    <Text style={[styles.challengeIndicatorTitle, {fontSize: titleSize, lineHeight: titleSize + 4}]}>
                        Indicatif de luminosité (bêta)
                    </Text>

                    {!sensorReady && Platform.OS === 'android' ? (
                        <Text style={[styles.challengeMainText, {fontSize: textSize * 0.65}]}>Initialisation du capteur…</Text>
                    ) : null}

                    <View
                        style={[
                            styles.challengeIndicator,
                            {
                                width: contentWidth,
                                backgroundColor: `rgb(${gray},${gray},${gray})`,
                            },
                        ]}
                    />

                    <Text style={[styles.challengeLuxHint, {fontSize: Math.max(12, textSize * 0.42)}]}>
                        ~{Math.round(effectiveLux)} lx
                        {showSimControls ? ' (simulation)' : ''}
                    </Text>

                    {showSimControls && sensorReady && phase === 'game' ? (
                        <View style={{width: contentWidth, marginBottom: 12}}>
                            <Text style={[styles.challengeSimLabel, {fontSize: textSize * 0.45}]}>
                                {Platform.OS === 'android' && !useNativeSensor
                                    ? 'Capteur indisponible — réglez la luminosité simulée :'
                                    : 'Sur cet appareil, luminosité simulée (pas de capteur) :'}
                            </Text>
                            <Slider
                                minimumValue={MIN_LUX}
                                maximumValue={MAX_LUX}
                                value={simulatedLux}
                                onValueChange={setSimulatedLux}
                                minimumTrackTintColor="#7B6B95"
                                maximumTrackTintColor="#D9CFEA"
                                thumbTintColor="#4A4E69"
                            />
                        </View>
                    ) : null}

                    <Text style={[styles.challengeMainText, {fontSize: textSize, lineHeight: textSize + 4}]}>
                        {gameMessage}
                    </Text>

                    {phase === 'success' ? (
                        <TouchableOpacity onPress={goToStory} style={styles.challengePaperButton}>
                            <Text style={styles.challengePaperButtonText}>Indice</Text>
                        </TouchableOpacity>
                    ) : null}

                    <View style={styles.challengeWalker}/>
                </View>
            </ScrollView>
        );
    }

    if (phase === 'story') {
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={[styles.challengeContainer, {minHeight: height - 90}]}>
                    {renderTopDecor()}
                    <View style={[styles.challengeFactCard, {width: contentWidth}]}>
                        <Text
                            style={[
                                styles.challengeFactText,
                                {
                                    fontSize: clamp(Math.round(24 * factor), 18, 30),
                                    lineHeight: clamp(Math.round(28 * factor), 22, 34),
                                },
                            ]}
                        >
                            Pendant le tournage des scènes de la base rebelle sur Hoth dans L&apos;Empire contre-attaque,
                            Carrie Fisher est arrivée sur le plateau de Finse en Norvège, dans un décor quasi polaire,
                            juste pour être avec l&apos;équipe, alors que ses scènes à elle étaient surtout filmées en
                            studio.
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.challengeOutlineButton} onPress={goToScores}>
                        <Text style={[styles.challengeOutlineButtonText, {fontSize: clamp(Math.round(20 * factor), 16, 24)}]}>
                            Tableau des scores
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.challengeWalker}/>
                </View>
            </ScrollView>
        );
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={[styles.challengeContainer, {minHeight: height - 90}]}>
                {renderTopDecor()}
                <View style={[styles.challengeScoresCard, {width: contentWidth}]}>
                    <Text style={[styles.challengeScoresTitle, {fontSize: clamp(Math.round(30 * factor), 22, 36)}]}>
                        Tableau des scores :
                    </Text>
                    {SCORE_LINES.map((line) => (
                        <Text key={line} style={[styles.challengeScoreLine, {fontSize: scoreSize, lineHeight: scoreSize + 3}]}>
                            {line}
                        </Text>
                    ))}
                </View>
                <TouchableOpacity style={styles.challengeOutlineButton} onPress={() => onNavigate('home')}>
                    <Text style={[styles.challengeOutlineButtonText, {fontSize: clamp(Math.round(20 * factor), 16, 24)}]}>
                        Fin des épreuves
                    </Text>
                </TouchableOpacity>
                <View style={styles.challengeWalker}/>
            </View>
        </ScrollView>
    );
};

export default Challenge;
