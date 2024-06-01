import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { ModalSettings } from "../index";
import { Icon, Text, Button, IconElement } from "@ui-kitten/components";

const SettingsIcon = (): IconElement => <Icon style={styles.icon} name="settings-outline" />;
const CalendarIcon = (): IconElement => <Icon style={styles.icon} name="calendar-outline" />;

export const Header = () => {
    const [modalVisible, setModalVisible] = React.useState(false);

    return (
        <>
            <View style={styles.header}>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require("./logo.png")} />
                    <Text category="s1">ВБАб22о-1</Text>
                    <Text>28.08.2023-03.09.2023</Text>
                </View>
                <View>
                    <Button onPress={() => setModalVisible(!modalVisible)} style={styles.button} appearance="ghost" accessoryLeft={SettingsIcon} />
                    <Button style={styles.button} appearance="ghost" accessoryLeft={CalendarIcon} disabled />
                </View>
            </View>
            <ModalSettings visible={modalVisible} setVisible={setModalVisible} />
        </>
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
        height: 40,
        width: 180,
        marginBottom: 10,
    },
    button: {
        width: 38,
        height: 38,
        marginBottom: 10,
    },
    icon: {
        width: 24,
        height: 24,
    },
});
