import { useColors } from 'hooks/useColors';
import { View, ViewProps } from 'react-native';

export default function Skeleton({ style, variant = 'default', ...props }: { variant?: 'default' | 'primary' | 'outlined' } & ViewProps) {
    const { card, primary, border } = useColors();

    return (
        <View
            {...props}
            style={[
                { alignItems: 'center', justifyContent: 'center', borderRadius: 22 },
                variant === 'default' ? { backgroundColor: card, borderWidth: 1, borderColor: border } : null,
                variant === 'primary' ? { backgroundColor: primary } : null,
                variant === 'outlined' ? { borderWidth: 1, borderColor: border } : null,
                style,
            ]}
        />
    );
}
