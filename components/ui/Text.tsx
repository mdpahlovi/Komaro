import { useTheme } from '@react-navigation/native';
import Color from 'color';
import { Text as RNText, StyleProp, TextProps, TextStyle } from 'react-native';

type TextVariant = 'default' | 'heading' | 'title' | 'body' | 'body-sm' | 'action' | 'action-link';

export default function Text({ style, variant = 'default', ...props }: { variant?: TextVariant } & TextProps) {
    const { colors } = useTheme();
    const { text, primary } = colors;

    const getTextStyle = (): StyleProp<TextStyle> => {
        switch (variant) {
            case 'default':
                return { fontSize: 14, fontFamily: 'Roboto-Regular', color: text };
            case 'heading':
                return { fontSize: 18, fontFamily: 'Roboto-Bold', color: text };
            case 'title':
                return { fontSize: 14, fontFamily: 'Roboto-Medium', textTransform: 'uppercase', color: text };
            case 'body':
                return { fontSize: 14, fontFamily: 'Roboto-Regular', color: Color(text).alpha(0.75).string() };
            case 'body-sm':
                return { fontSize: 12, fontFamily: 'Roboto-Regular', color: Color(text).alpha(0.75).string() };
            case 'action':
                return { fontSize: 10, fontFamily: 'Roboto-Regular', textTransform: 'uppercase', color: Color(text).alpha(0.5).string() };
            case 'action-link':
                return { fontSize: 10, fontFamily: 'Roboto-Regular', textTransform: 'uppercase', color: primary };
        }
    };

    return <RNText style={[getTextStyle(), style]} {...props} />;
}
