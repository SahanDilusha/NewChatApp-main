import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function Layout() {

    const [loaded, error] = useFonts({
        'CarosBold': require('../assets/fonts/CarosBold.otf'),
        'CarosLight': require('../assets/fonts/CarosLight.otf'),
        'CarosMedium': require('../assets/fonts/CarosMedium.otf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <>
            <StatusBar style="auto" />
            <Stack>
                <Stack.Screen
                    name="(tabs)" // Tabs navigator
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </>
    );
}
