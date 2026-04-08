import React, {useMemo, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
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

const Challenge: React.FC<ChallengeProps> = ({onNavigate}) => {
    const [step, setStep] = useState(0);
    const {width, height} = useWindowDimensions();
    const isDesktop = width >= 900;
    const contentWidth = Math.min(width - 28, 520);

    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
    const factor = clamp(width / 390, 0.82, 1.25);
    const titleSize = clamp(Math.round(30 * factor), 24, 34);
    const textSize = clamp(Math.round(30 * factor), 20, 34);
    const scoreSize = clamp(Math.round(24 * factor), 18, 27);
    const topMargin = isDesktop ? 14 : 8;

    const indicatorStyle = useMemo(() => {
        if (step === 0) return styles.challengeIndicatorLight;
        if (step === 1) return styles.challengeIndicatorMid;
        return styles.challengeIndicatorDark;
    }, [step]);

    const renderTopDecor = () => (
        <View style={[styles.challengeSky, {width: contentWidth, marginBottom: 10 + topMargin}]}>
            <View style={styles.challengeSun}/>
            <View style={styles.challengeMountainBack}/>
            <View style={styles.challengeMountainFront}/>
        </View>
    );

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));

    if (step <= 2) {
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={[styles.challengeContainer, {minHeight: height - 90}]}>
                    {renderTopDecor()}
                    <Text style={[styles.challengeAlert, {fontSize: titleSize, marginTop: -156}]}>Cachez vous des prédateurs!</Text>
                    <Text style={[styles.challengeIndicatorTitle, {fontSize: titleSize, lineHeight: titleSize + 4}]}>Indicatif de luminosité (bêta)</Text>
                    <View style={[styles.challengeIndicator, indicatorStyle, {width: contentWidth}]}/>

                    {step === 0 && (
                        <Text style={[styles.challengeMainText, {fontSize: textSize, lineHeight: textSize + 4}]}>Vous êtes baigné de lumière, cachez vous vite !</Text>
                    )}
                    {step === 1 && (
                        <Text style={[styles.challengeMainText, {fontSize: textSize, lineHeight: textSize + 4}]}>Encore un petit effort, le prédateur arrive !</Text>
                    )}
                    {step === 2 && (
                        <>
                            <Text style={[styles.challengeMainText, {fontSize: textSize, lineHeight: textSize + 4}]}>Vous avez réussi! Le prédateur est parti.{"\n"}Tient, c&apos;est quoi ça ?</Text>
                            <TouchableOpacity onPress={nextStep} style={styles.challengePaperButton}>
                                <Text style={styles.challengePaperButtonText}>Indice</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {step < 2 && (
                        <TouchableOpacity style={styles.challengeGhostButton} onPress={nextStep}>
                            <Text style={styles.challengeGhostButtonText}>Suivant</Text>
                        </TouchableOpacity>
                    )}
                    <View style={styles.challengeWalker}/>
                </View>
            </ScrollView>
        );
    }

    if (step === 3) {
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={[styles.challengeContainer, {minHeight: height - 90}]}>
                    {renderTopDecor()}
                    <View style={[styles.challengeFactCard, {width: contentWidth}]}>
                        <Text style={[styles.challengeFactText, {fontSize: clamp(Math.round(24 * factor), 18, 30), lineHeight: clamp(Math.round(28 * factor), 22, 34)}]}>
                            Pendant le tournage des scènes de la base rebelle sur Hoth dans L&apos;Empire contre-attaque,
                            Carrie Fisher est arrivée sur le plateau de Finse en Norvège, dans un décor quasi polaire,
                            juste pour être avec l&apos;équipe, alors que ses scènes à elle étaient surtout filmées en studio.
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.challengeOutlineButton} onPress={nextStep}>
                        <Text style={[styles.challengeOutlineButtonText, {fontSize: clamp(Math.round(20 * factor), 16, 24)}]}>Tableau des scores</Text>
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
                    <Text style={[styles.challengeScoresTitle, {fontSize: clamp(Math.round(30 * factor), 22, 36)}]}>Tableau des scores :</Text>
                    {SCORE_LINES.map((line) => (
                        <Text key={line} style={[styles.challengeScoreLine, {fontSize: scoreSize, lineHeight: scoreSize + 3}]}>{line}</Text>
                    ))}
                </View>
                <TouchableOpacity style={styles.challengeOutlineButton} onPress={() => onNavigate('home')}>
                    <Text style={[styles.challengeOutlineButtonText, {fontSize: clamp(Math.round(20 * factor), 16, 24)}]}>Fin des épreuves</Text>
                </TouchableOpacity>
                <View style={styles.challengeWalker}/>
            </View>
        </ScrollView>
    );
};

export default Challenge;
