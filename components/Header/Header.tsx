import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Icon, Text } from "@ui-kitten/components";

export const Header = () => {
    return (
        <View style={styles.header}>
            <View style={styles.container}>
                <View>
                    <Icon style={styles.icon} name="calendar-outline" />
                </View>
                <Text style={styles.groupName}>ВБАб22о-1</Text>
                <Text>28.08.2023-03.09.2023</Text>
            </View>
            <Image style={styles.logo} source={require("./logo_rus_full_V.png")} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    container: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
    logo: {
        resizeMode: "center",
        height: 80,
        width: 90,
    },
    icon: {
        width: 32,
        height: 32,
        marginBottom: 8,
    },
    groupName: {
        fontWeight: "800",
    },
});
