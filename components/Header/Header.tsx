import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Calendar, ModalSettings } from "../index";
import { Icon, Text, Button, IconElement } from "@ui-kitten/components";

const SettingsIcon = (): IconElement => <Icon style={styles.icon} name="settings-outline" />;
const CalendarIcon = (): IconElement => <Icon style={styles.icon} name="calendar-outline" />;

export const Header = () => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [calendarVisible, setCalendarVisible] = React.useState(false);

    return (
        <>
            <View style={styles.header}>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require("./logo.png")} />
                    <Text style={styles.group} category="s1">
                        ВБАб22о-1
                    </Text>
                    <Text>28.08.2023-03.09.2023</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button onPress={() => setModalVisible(!modalVisible)} style={styles.button} appearance="ghost" accessoryLeft={SettingsIcon} />
                    <Button
                        onPress={() => setCalendarVisible(!calendarVisible)}
                        style={styles.button}
                        appearance="ghost"
                        accessoryLeft={CalendarIcon}
                    />
                </View>
            </View>
            <ModalSettings visible={modalVisible} setVisible={setModalVisible} />
            {calendarVisible && <Calendar />}
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
    },
    group: { marginBottom: 5 },
    buttonsContainer: {
        flexDirection: "column",
        gap: 10,
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
    },
    icon: {
        width: 24,
        height: 24,
    },
});
