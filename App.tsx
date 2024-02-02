import React, { useState } from "react";
import AppLoading from "expo-app-loading";

import { StyleSheet, ImageBackground, SafeAreaView, StatusBar, Platform } from "react-native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as theme } from "./custom-theme.json";
import { default as customMapping } from "./custom-mapping.json";
import * as Font from "expo-font";

import { Timetable } from "./screens/Timetable";

const loadFonts = () => {
    return Font.loadAsync({
        "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
        "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
        "Montserrat-ExtraBold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
    });
};

export default () => {
    const [fontsLoaded, setFontsLoded] = useState(false);

    if (!fontsLoaded) {
        return <AppLoading startAsync={loadFonts} onFinish={() => setFontsLoded(true)} onError={console.warn} />;
    }

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider mapping={eva.mapping} customMapping={{ ...eva.mapping, ...customMapping }} theme={{ ...eva.light, ...theme }}>
                <ImageBackground source={require("./assets/bg.png")} style={styles.backgroundImage}>
                    <SafeAreaView style={styles.safeArea}>
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
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
});
