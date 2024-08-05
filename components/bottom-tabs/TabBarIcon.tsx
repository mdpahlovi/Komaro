import { Text } from 'components/ui';
import { View } from 'react-native';

import { useColors } from '@/hooks/useColors';

type RenderIconProps = { focused: boolean; color: string; size: number };
type TabBarIconProps = { focused: boolean; badge?: string | number; renderIcon: (props: RenderIconProps) => React.ReactNode };

export default function TabBarIcon({ focused, badge, renderIcon }: TabBarIconProps) {
    const size = 24;
    const { textLight, notification } = useColors();

    // We render the icon twice at the same position on top of each other:
    // active and inactive one, so we can fade between them.
    return (
        <View style={[{ position: 'relative', width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }]}>
            <View style={{ position: 'absolute', opacity: focused ? 1 : 0 }}>{renderIcon({ focused, size, color: 'white' })}</View>
            <View style={{ position: 'absolute', opacity: focused ? 0 : 1 }}>{renderIcon({ focused, size, color: textLight })}</View>
            <View
                style={[
                    { position: 'absolute', right: -4, top: -4, width: 16, height: 16, backgroundColor: notification },
                    { borderRadius: 8, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', opacity: badge ? 1 : 0 },
                ]}>
                <Text style={{ fontSize: 10, lineHeight: 13 }}>{badge}</Text>
            </View>
        </View>
    );
}
