import { ArrowRight } from 'components/icons';
import { useColors } from 'hooks/useColors';
import { View, Text, Pressable, PressableProps } from 'react-native';

export default function ActionButton({ style, children, ...props }: PressableProps) {
    const { primary, text, card: backgroundColor } = useColors();

    return (
        <Pressable
            {...props}
            style={[
                { backgroundColor: primary, borderRadius: 22, padding: 6, gap: 14 },
                { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
            ]}>
            <Text style={{ paddingLeft: 14, fontFamily: 'Roboto-Medium', color: text }}>{children as React.ReactNode}</Text>
            <View style={{ width: 32, height: 32, justifyContent: 'center', alignItems: 'center', borderRadius: 16, backgroundColor }}>
                <ArrowRight color="white" transform={[{ scale: 0.8 }]} />
            </View>
        </Pressable>
    );
}
