import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Avatar, Button, Text } from 'components/ui';
import { View } from 'react-native';

export default function Header() {
    const { colors } = useTheme();

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <Avatar size={44} />
            <View style={{ flex: 1 }}>
                <Text variant="heading">Hi, James 👋</Text>
                <Text numberOfLines={1} variant="body">
                    Discover fashion that suit your style
                </Text>
            </View>
            <Button iconButton>
                <MaterialIcons name="notifications" size={24} color={colors.text} />
            </Button>
        </View>
    );
}
