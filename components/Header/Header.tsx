import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export const Header = () => {
    return (
        <View style={styles.header}>
            <Text>Burger</Text>
            <Image source={require("./Logo.svg")} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
});
