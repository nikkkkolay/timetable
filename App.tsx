import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as theme } from "./custom-theme.json";
import { default as customMapping } from "./custom-mapping.json";
import * as eva from "@eva-design/eva";
import * as Font from "expo-font";

import { TimetableScreen } from "./screens/TimetableScreen";
import { useStore } from "./store/useStore";

export default () => {
    const [appIsReady, setAppIsReady] = useState(false);
    const { checkUpdateDate, getGroup, modalSettingsIsActive } = useStore((state) => state);

    useLayoutEffect(() => {
        async function updateGroup() {
            const value = await AsyncStorage.getItem("group");
            if (value !== null) {
                await getGroup(JSON.parse(value).name);
            }
        }
        updateGroup();
        checkUpdateDate();
    }, []);

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
                    <StatusBar barStyle={"dark-content"} translucent backgroundColor={modalSettingsIsActive ? "rgba(0,0,0,0.3)" : "transparent"} />
                    <SafeAreaView style={styles.safeArea} onLayout={onLayoutRootView}>
                        <TimetableScreen />
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
