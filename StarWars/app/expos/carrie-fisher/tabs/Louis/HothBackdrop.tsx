import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Image} from 'expo-image';

type Props = {
    sceneHeight: number;
};

const HothBackdrop: React.FC<Props> = ({sceneHeight}) => (
    <View
        style={[StyleSheet.absoluteFillObject, {minHeight: sceneHeight}]}
        pointerEvents="none"
    >
        <Image
            source={require('../../../../../assets/images/hoth_challenge_bg.png')}
            style={[StyleSheet.absoluteFillObject, {minHeight: sceneHeight}]}
            contentFit="cover"
            transition={0}
        />
    </View>
);

export default HothBackdrop;
