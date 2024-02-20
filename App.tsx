import React, { useCallback, useEffect, useState } from "react";

import * as SplashScreen from "expo-splash-screen";

import { StyleSheet, ImageBackground, SafeAreaView, StatusBar, Platform } from "react-native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as theme } from "./custom-theme.json";
import { default as customMapping } from "./custom-mapping.json";
import * as Font from "expo-font";

import { Timetable } from "./screens/Timetable";

export default () => {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await Font.loadAsync({
                    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
                    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
                    "Montserrat-ExtraBold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
                });
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider mapping={eva.mapping} customMapping={{ ...eva.mapping, ...customMapping }} theme={{ ...eva.light, ...theme }}>
                <ImageBackground source={require("./assets/bg.png")} style={styles.backgroundImage}>
                    <StatusBar/>
                    <SafeAreaView style={styles.safeArea} onLayout={onLayoutRootView}>
                        <Timetable />
                    </SafeAreaView>
                </ImageBackground>
            </ApplicationProvider>
        </>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
});
