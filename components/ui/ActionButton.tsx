import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { View, Text, Pressable, PressableProps } from 'react-native';

type ActionButtonProps = { icon: keyof typeof MaterialIcons.glyphMap } & PressableProps;

export default function ActionButton({ style, children, icon, ...props }: ActionButtonProps) {
    const { colors } = useTheme();
    const { primary, text, card } = colors;

    return (
        <Pressable
            {...props}
            style={[
                { backgroundColor: primary, borderRadius: 64, padding: 6, gap: 16 },
                { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
            ]}>
            <Text style={{ paddingLeft: 14, fontFamily: 'Roboto-Medium', color: text }}>{children as React.ReactNode}</Text>
            <View style={{ padding: 7, borderRadius: 34, backgroundColor: card }}>
                <MaterialIcons name={icon} size={20} color={text} />
            </View>
        </Pressable>
    );
}
