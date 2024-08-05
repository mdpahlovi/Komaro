import { useColors } from 'hooks/useColors';
import { TextInput, TextInputProps } from 'react-native';

export default function Input({ style, placeholderTextColor, ...props }: TextInputProps) {
    const { text, textLight, card, border } = useColors();

    return (
        <TextInput
            style={[
                { backgroundColor: card, borderWidth: 1, borderColor: border, color: text },
                { flex: 1, paddingHorizontal: 20, borderRadius: 9999, fontFamily: 'Roboto-Medium' },
                style,
            ]}
            placeholderTextColor={placeholderTextColor || textLight}
            {...props}
        />
    );
}
