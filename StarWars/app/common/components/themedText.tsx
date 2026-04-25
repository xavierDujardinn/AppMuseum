import { useTranslation } from '@/app/common/hooks/languageContext';
import React from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';

interface ThemedTextProps extends TextProps {
    style?: StyleProp<TextStyle>;
    weight?: 'regular' | 'semibold' | 'bold' | 'black';
}

const ThemedText: React.FC<ThemedTextProps> = ({ style, weight = 'regular', ...props }) => {
    const { fontScale, getFontFamily, themeColors } = useTranslation();
    const flatStyle = StyleSheet.flatten(style) || {};

    const adjustedStyle: TextStyle = {};

    if (typeof flatStyle.fontSize === 'number') {
        adjustedStyle.fontSize = flatStyle.fontSize * fontScale;
    }
    if (typeof flatStyle.lineHeight === 'number') {
        adjustedStyle.lineHeight = flatStyle.lineHeight * fontScale;
    }
    if (!flatStyle.color) {
        adjustedStyle.color = themeColors.text;
    }
    if (!flatStyle.fontFamily) {
        adjustedStyle.fontFamily = getFontFamily(weight);
    }

    return <Text {...props} style={[style, adjustedStyle]} />;
};

export default ThemedText;
