import React from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import {useUserSettings} from "@/app/common/hooks/userSettings";

interface ThemedTextProps extends TextProps {
    style?: StyleProp<TextStyle>;
    weight?: 'regular' | 'semibold' | 'bold' | 'black';
    preserveColor?: boolean;
}

const ThemedText: React.FC<ThemedTextProps> = ({ style, weight = 'regular', preserveColor = false, ...props }) => {
    const { fontScale, getFontFamily, themeColors, settings } = useUserSettings();
    const flatStyle = StyleSheet.flatten(style) || {};
    const darkTextColors = ['#000', '#000000', '#111', '#111111', 'black'];
    const currentColor = typeof flatStyle.color === 'string' ? flatStyle.color.toLowerCase() : '';

    const adjustedStyle: TextStyle = {};

    if (typeof flatStyle.fontSize === 'number') {
        adjustedStyle.fontSize = flatStyle.fontSize * fontScale;
    }
    if (typeof flatStyle.lineHeight === 'number') {
        adjustedStyle.lineHeight = flatStyle.lineHeight * fontScale;
    }
    if (!preserveColor && (!flatStyle.color || (settings.highContrast && darkTextColors.includes(currentColor)))) {
        adjustedStyle.color = themeColors.text;
    }
    // Always apply selected app font family so preference is global.
    adjustedStyle.fontFamily = getFontFamily(weight);

    return <Text {...props} style={[style, adjustedStyle]} />;
};

export default ThemedText;
