import { useColors } from 'hooks/useColors';
import { TextInput, TextInputProps } from 'react-native';

export default function Input({ size = 'default', style, ...props }: { size?: 'default' | 'small' } & TextInputProps) {
    const { text, textLight, card, border, primary } = useColors();

    return (
        <TextInput
            style={[
                { height: size === 'small' ? 36 : 44, backgroundColor: card, borderWidth: 1, borderColor: border, color: text },
                { flex: 1, paddingHorizontal: 20, borderRadius: 9999, fontFamily: 'Roboto-Medium' },
                style,
            ]}
            placeholderTextColor={textLight}
            cursorColor={primary}
            {...props}
        />
    );
}
