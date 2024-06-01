import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Calendar, ModalSettings } from "../index";
import { Icon, Text, Button, IconElement } from "@ui-kitten/components";

const SettingsIcon = (): IconElement => <Icon style={styles.icon} name="edit-2-outline" />;
const CalendarIcon = (): IconElement => <Icon style={styles.icon} name="calendar-outline" />;

export const Header = () => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [calendarVisible, setCalendarVisible] = React.useState(false);

    return (
        <>
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require("./logo.png")} />
                </View>

                <View style={styles.buttonsContainer}>
                    <Button onPress={() => setModalVisible(!modalVisible)} style={styles.button} appearance="ghost" accessoryLeft={SettingsIcon}>
                        ВБАб22о-1
                    </Button>
                    <Button
                        onPress={() => setCalendarVisible(!calendarVisible)}
                        style={styles.button}
                        appearance="ghost"
                        accessoryLeft={CalendarIcon}
                    >
                        28.08.2023-03.09.2023
                    </Button>
                </View>
            </View>
            <ModalSettings visible={modalVisible} setVisible={setModalVisible} />
            {calendarVisible && <Calendar />}
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    logoContainer: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "#fff",
        marginBottom: 15,
    },
    buttonsContainer: {
        flexDirection: "column",
        gap: 10,
        width: "100%",
    },
    logo: {
        resizeMode: "center",
        height: 40,
        width: 200,
    },
    button: {
        width: "100%",
        height: 40,
    },
    icon: {
        width: 26,
        height: 26,
    },
});
