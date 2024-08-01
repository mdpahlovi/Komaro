import { BottomTabBar } from 'components/bottom-tabs';
import { Home, Heart, Bag, Profile } from 'components/icons';
import { HomeFilled, HeartFilled, BagFilled, ProfileFilled } from 'components/icons/filled';
import { Tabs } from 'expo-router';

export default function MainLayout() {
    return (
        <Tabs tabBar={(props) => <BottomTabBar {...props} />}>
            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (focused ? <HomeFilled color={color} /> : <Home color={color} />),
                }}
            />
            <Tabs.Screen
                name="love"
                options={{
                    title: 'Love',
                    tabBarIcon: ({ color, focused }) => (focused ? <HeartFilled color={color} /> : <Heart color={color} />),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ color, focused }) => (focused ? <BagFilled color={color} /> : <Bag color={color} />),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => (focused ? <ProfileFilled color={color} /> : <Profile color={color} />),
                }}
            />
        </Tabs>
    );
}
