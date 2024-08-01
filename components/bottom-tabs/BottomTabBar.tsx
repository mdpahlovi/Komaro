import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { MissingIcon } from '@react-navigation/elements';
import { CommonActions, NavigationContext, NavigationRouteContext, useLinkBuilder, useTheme } from '@react-navigation/native';
import { View } from 'react-native';

import BottomTabItem from './BottomTabItem';

export default function BottomTabBar({ state, navigation, descriptors, insets }: BottomTabBarProps) {
    const { colors } = useTheme();
    const buildLink = useLinkBuilder();

    return (
        <>
            <View style={{ height: 56 / 2 }} />
            <View
                style={[
                    { position: 'absolute', left: 0, right: 0, bottom: 0, borderRadius: 9999 },
                    { marginHorizontal: 16, height: 56, backgroundColor: colors.card },
                ]}>
                <View role="tablist" style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    {state.routes.map((route, index) => {
                        const focused = index === state.index;
                        const { options } = descriptors[route.key];

                        const onPress = () => {
                            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });

                            if (!focused && !event.defaultPrevented) {
                                navigation.dispatch({ ...CommonActions.navigate({ name: route.name, merge: true }), target: state.key });
                            }
                        };

                        const onLongPress = () => navigation.emit({ type: 'tabLongPress', target: route.key });

                        return (
                            <NavigationContext.Provider key={route.key} value={descriptors[route.key].navigation}>
                                <NavigationRouteContext.Provider value={route}>
                                    <BottomTabItem
                                        label={options.title!}
                                        focused={focused}
                                        onPress={onPress}
                                        onLongPress={onLongPress}
                                        to={buildLink(route.name, route.params)}
                                        icon={options.tabBarIcon ?? (({ color, size }) => <MissingIcon color={color} size={size} />)}
                                        badge={options.tabBarBadge}
                                    />
                                </NavigationRouteContext.Provider>
                            </NavigationContext.Provider>
                        );
                    })}
                </View>
            </View>
        </>
    );
}
