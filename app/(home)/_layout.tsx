import { BottomTabBar } from 'components/bottom-tabs';
import { Home, Heart, Bag, Profile } from 'components/icons';
import { HomeFilled, HeartFilled, BagFilled, ProfileFilled } from 'components/icons/filled';
import { Tabs } from 'expo-router';
import { useCartState } from 'hooks/useCartState';
import { useLovedProductsState } from 'hooks/useLovedProductState';

export default function MainLayout() {
    const { items } = useCartState();
    const { lovedProducts } = useLovedProductsState();

    return (
        <Tabs tabBar={(props) => <BottomTabBar {...props} />} screenOptions={{ headerTitleStyle: { fontFamily: 'Roboto-Bold' } }}>
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
                    tabBarBadge: lovedProducts?.length ? lovedProducts?.length : undefined,
                    tabBarIcon: ({ color, focused }) => (focused ? <HeartFilled color={color} /> : <Heart color={color} />),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: 'Cart',
                    tabBarBadge: items?.length ? items?.length : undefined,
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
