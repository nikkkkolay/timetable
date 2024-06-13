import React, { useCallback, useEffect, useState } from "react";

import * as SplashScreen from "expo-splash-screen";

import { StyleSheet, ImageBackground, SafeAreaView, StatusBar } from "react-native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as theme } from "./custom-theme.json";
import { default as customMapping } from "./custom-mapping.json";
import * as Font from "expo-font";

import { Timetable } from "./screens/Timetable";
import { useStore } from "./store/useStore";

export default () => {
    const [appIsReady, setAppIsReady] = useState(false);
    const { checkUpdateDate } = useStore((state) => state);

    useEffect(() => {
        async function prepare() {
            try {
                await Font.loadAsync({
                    "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
                    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
                    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
                    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
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
        checkUpdateDate();
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
                    <StatusBar barStyle={"dark-content"} translucent backgroundColor="transparent" />
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
        paddingTop: StatusBar.currentHeight,
    },
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
});
