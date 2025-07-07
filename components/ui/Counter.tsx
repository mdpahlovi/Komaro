import { MaterialIcons } from '@expo/vector-icons';
import { useColors } from 'hooks/useColors';
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';

type CounterProps = { value: number; onChange: (value: number) => void; maxValue?: number; style?: StyleProp<ViewStyle> };

export default function Counter({ value, onChange, maxValue, style }: CounterProps) {
    const { primary: backgroundColor, card, text } = useColors();

    return (
        <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor, padding: 4, borderRadius: 22 }, style]}>
            <Pressable
                onPress={() => onChange(Math.max(1, value - 1))}
                style={{ width: 28, height: 28, justifyContent: 'center', alignItems: 'center', borderRadius: 16, backgroundColor: card }}>
                <MaterialIcons name="remove" size={20} color={text} />
            </Pressable>
            <Text style={{ padding: 4, textAlign: 'center', fontFamily: 'Roboto-Medium', color: text }}>
                {value.toString().padStart(2, '0')}
            </Text>
            <Pressable
                onPress={() => onChange(Math.min(maxValue ? maxValue : 1000, value + 1))}
                style={{ width: 28, height: 28, justifyContent: 'center', alignItems: 'center', borderRadius: 16, backgroundColor: card }}>
                <MaterialIcons name="add" size={20} color={text} />
            </Pressable>
        </View>
    );
}
