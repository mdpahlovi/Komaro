import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function HomeLayout() {
    return (
        <Tabs screenOptions={{ tabBarLabelStyle: { fontFamily: 'Roboto-Regular' } }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: (props) => <MaterialIcons name="home" {...props} />,
                }}
            />
            <Tabs.Screen
                name="card"
                options={{
                    title: 'Card',
                    tabBarIcon: (props) => <MaterialIcons name="shopping-cart" {...props} />,
                }}
            />
            <Tabs.Screen
                name="payment"
                options={{
                    title: 'Payment',
                    tabBarIcon: (props) => <MaterialIcons name="account-balance-wallet" {...props} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: (props) => <MaterialIcons name="person" {...props} />,
                }}
            />
        </Tabs>
    );
}
