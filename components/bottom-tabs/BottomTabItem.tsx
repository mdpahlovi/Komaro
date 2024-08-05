import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Link } from '@react-navigation/native';
import TabBarIcon from 'components/bottom-tabs/TabBarIcon';
import type { BottomTabBarItemProps } from 'components/bottom-tabs/type';
import { useColors } from 'hooks/useColors';
import { Platform, Pressable, Text } from 'react-native';

export default function BottomTabBarItem({ focused, label, icon, badge, to, onPress, onLongPress }: BottomTabBarItemProps) {
    const { primary } = useColors();

    return Button({
        to,
        onPress,
        onLongPress,
        role: Platform.select({ ios: 'button', default: 'tab' }),
        accessibilityState: { selected: focused },
        style: [
            { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, margin: 6, paddingHorizontal: 16 },
            focused ? { backgroundColor: primary, borderRadius: 9999 } : null,
        ],
        children: (
            <>
                <TabBarIcon focused={focused} badge={badge} renderIcon={icon} />
                {focused ? <Text style={{ color: 'white', fontFamily: 'Roboto-Medium' }}>{label}</Text> : null}
            </>
        ),
    });
}

// TabBarButton Component
function Button({ children, style, onPress, to, role, ...rest }: BottomTabBarButtonProps) {
    if (Platform.OS === 'web' && to) {
        // React Native Web doesn't forward `onClick` if we use `TouchableWithoutFeedback`.
        // We need to use `onClick` to be able to prevent default browser handling of links.
        return (
            <Link
                {...rest}
                to={to}
                style={[{ display: 'flex' }, style]}
                onPress={(e: any) => {
                    if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && (e.button == null || e.button === 0)) {
                        e.preventDefault();
                        onPress?.(e);
                    }
                }}>
                {children}
            </Link>
        );
    } else {
        return (
            <Pressable {...rest} role={role} onPress={onPress} style={style}>
                {children}
            </Pressable>
        );
    }
}
