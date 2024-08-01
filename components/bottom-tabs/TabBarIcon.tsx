import { useTheme } from '@react-navigation/native';
import Color from 'color';
import { Text } from 'components/ui';
import { View } from 'react-native';

type RenderIconProps = { focused: boolean; color: string; size: number };
type TabBarIconProps = { focused: boolean; badge?: string | number; renderIcon: (props: RenderIconProps) => React.ReactNode };
type BadgeProps = { visible: boolean; children?: string | number };

export default function TabBarIcon({ focused, badge, renderIcon }: TabBarIconProps) {
    const size = 24;
    const { colors } = useTheme();
    const textLight = Color(colors.text).alpha(0.75).string();

    // We render the icon twice at the same position on top of each other:
    // active and inactive one, so we can fade between them.
    return (
        <View style={[{ position: 'relative', width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }]}>
            <View style={[{ position: 'absolute' }, { opacity: focused ? 1 : 0 }]}>{renderIcon({ focused, size, color: 'white' })}</View>
            <View style={[{ position: 'absolute' }, { opacity: focused ? 0 : 1 }]}>{renderIcon({ focused, size, color: textLight })}</View>
            <Badge visible={badge !== undefined}>{badge}</Badge>
        </View>
    );
}

// TabBarBadge Component
function Badge({ children, visible, ...rest }: BadgeProps) {
    const { colors } = useTheme();

    return (
        <Text
            variant="body"
            numberOfLines={1}
            style={[
                { position: 'absolute', right: -4, top: -4, width: 16, height: 16, color: 'white', backgroundColor: colors.notification },
                { borderRadius: 8, fontSize: 10, alignSelf: 'flex-end', textAlign: 'center', overflow: 'hidden', opacity: visible ? 1 : 0 },
            ]}
            {...rest}>
            {children}
        </Text>
    );
}
