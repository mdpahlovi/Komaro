import { useColors } from 'hooks/useColors';
import { Text as RNText, StyleProp, TextProps, TextStyle } from 'react-native';

type TextVariant = 'default' | 'heading' | 'title' | 'title-lg' | 'body' | 'body-sm' | 'action' | 'action-link';

export default function Text({ style, variant = 'default', ...props }: { variant?: TextVariant } & TextProps) {
    const { text, textLight, textLighter, primary } = useColors();

    const getTextStyle = (): StyleProp<TextStyle> => {
        switch (variant) {
            case 'default':
                return { fontSize: 14, fontFamily: 'Roboto-Regular', color: text };
            case 'heading':
                return { fontSize: 18, fontFamily: 'Roboto-Bold', color: text };
            case 'title-lg':
                return { fontSize: 16, lineHeight: 18, fontFamily: 'Roboto-Medium', color: text };
            case 'title':
                return { fontSize: 14, fontFamily: 'Roboto-Medium', textTransform: 'uppercase', color: text };
            case 'body':
                return { fontSize: 14, fontFamily: 'Roboto-Regular', color: textLight };
            case 'body-sm':
                return { fontSize: 12, fontFamily: 'Roboto-Regular', color: textLight };
            case 'action':
                return { fontSize: 10, fontFamily: 'Roboto-Regular', textTransform: 'uppercase', color: textLighter };
            case 'action-link':
                return { fontSize: 10, fontFamily: 'Roboto-Regular', textTransform: 'uppercase', color: primary };
        }
    };

    return <RNText style={[getTextStyle(), style]} {...props} />;
}
