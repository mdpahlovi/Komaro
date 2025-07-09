import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await Font.loadAsync({
                    'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf'),
                    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
                    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
                    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
                    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
                    'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
                });
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(() => {
        if (appIsReady) {
            SplashScreen.hide();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <GestureHandlerRootView onLayout={onLayoutRootView}>
                    <BottomSheetModalProvider>
                        <Stack screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="index" />
                            <Stack.Screen name="details/[id]" />
                            <Stack.Screen
                                name="checkout"
                                options={{ headerShown: true, title: 'Checkout', headerTitleStyle: { fontFamily: 'Roboto-Bold' } }}
                            />
                        </Stack>
                    </BottomSheetModalProvider>
                </GestureHandlerRootView>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
