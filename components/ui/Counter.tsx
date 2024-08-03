import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Pressable, View, Text } from 'react-native';

export default function Counter({ value, onChange, maxValue }: { value: number; onChange: (value: number) => void; maxValue?: number }) {
    const { colors } = useTheme();
    const { primary, card, text } = colors;

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: primary, padding: 6, borderRadius: 22 }}>
            <Pressable
                onPress={() => onChange(Math.max(1, value - 1))}
                style={{ width: 32, height: 32, justifyContent: 'center', alignItems: 'center', borderRadius: 16, backgroundColor: card }}>
                <MaterialIcons name="remove" size={20} color={text} />
            </Pressable>
            <Text style={{ width: 28, textAlign: 'center', fontFamily: 'Roboto-Medium', color: text }}>
                {value.toString().padStart(2, '0')}
            </Text>
            <Pressable
                onPress={() => onChange(Math.min(maxValue ? maxValue : 1000, value + 1))}
                style={{ width: 32, height: 32, justifyContent: 'center', alignItems: 'center', borderRadius: 16, backgroundColor: card }}>
                <MaterialIcons name="add" size={20} color={text} />
            </Pressable>
        </View>
    );
}
