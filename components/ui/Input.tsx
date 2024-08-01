import { useTheme } from '@react-navigation/native';
import Color from 'color';
import { TextInput, TextInputProps } from 'react-native';

export default function Input({ style, placeholderTextColor, ...props }: TextInputProps) {
    const { colors } = useTheme();
    const { text, card, border } = colors;

    return (
        <TextInput
            style={[
                { backgroundColor: card, borderWidth: 1, borderColor: border, color: text },
                { flex: 1, paddingHorizontal: 28, borderRadius: 9999, fontFamily: 'Roboto-Medium' },
                style,
            ]}
            placeholderTextColor={placeholderTextColor || Color(text).alpha(0.75).toString()}
            {...props}
        />
    );
}
