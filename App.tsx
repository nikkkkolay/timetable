import React from "react";
import { StyleSheet, ImageBackground, SafeAreaView, StatusBar, Platform } from "react-native";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { default as theme } from "./custom-theme.json";

import { Timetable } from "./screens/Timetable";

export default () => (
    <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
            <ImageBackground source={require("./assets/bg.png")} style={styles.backgroundImage}>
                <SafeAreaView style={styles.safeArea}>
                    <Timetable />
                </SafeAreaView>
            </ImageBackground>
        </ApplicationProvider>
    </>
);

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
