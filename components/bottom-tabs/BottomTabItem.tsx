import { Link } from '@react-navigation/native';
import TabBarIcon from 'components/bottom-tabs/TabBarIcon';
import type { BottomTabBarItemProps } from 'components/bottom-tabs/type';
import { useColors } from 'hooks/useColors';
import type { GestureResponderEvent, Role } from 'react-native';
import { Platform, Pressable, Text } from 'react-native';

export default function BottomTabBarItem({ focused, label, icon, badge, href, onPress, onLongPress }: BottomTabBarItemProps) {
    const { primary } = useColors();

    return (
        <Button
            href={href}
            onPress={onPress}
            onLongPress={onLongPress}
            role={Platform.select({ ios: 'button', default: 'tab' })}
            accessibilityState={{ selected: focused }}
            style={[
                { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, margin: 6, paddingHorizontal: 16 },
                focused ? { backgroundColor: primary, borderRadius: 9999 } : null,
            ]}>
            <TabBarIcon focused={focused} badge={badge} renderIcon={icon} />
            {focused ? <Text style={{ color: 'white', fontFamily: 'Roboto-Medium' }}>{label}</Text> : null}
        </Button>
    );
}

// TabBarButton Component
interface ButtonProps {
    children: React.ReactNode;
    style?: any;
    onPress?: (event: GestureResponderEvent) => void;
    onLongPress?: (event: GestureResponderEvent) => void;
    href?: string;
    role?: Role;
    accessibilityState?: any;
}

function Button({ children, style, onPress, onLongPress, href, role, accessibilityState }: ButtonProps) {
    if (Platform.OS === 'web' && href) {
        // React Native Web doesn't forward `onClick` if we use `TouchableWithoutFeedback`.
        // We need to use `onClick` to be able to prevent default browser handling of links.
        return (
            <Link
                action={{ type: 'NAVIGATE' }}
                href={href}
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
            <Pressable role={role} onPress={onPress} onLongPress={onLongPress} style={style} accessibilityState={accessibilityState}>
                {children}
            </Pressable>
        );
    }
}
