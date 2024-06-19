import React, { ReactElement, useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Icon, Text, Button, IconElement, Tooltip } from "@ui-kitten/components";
import { Calendar, ModalSettings } from "../index";
import { useStore } from "../../store/useStore";

const SettingsIcon = (): IconElement => <Icon style={styles.icon} name="settings-2-outline" />;
const CalendarIcon = (): IconElement => <Icon style={styles.icon} name="calendar-outline" />;

export const Header = () => {
    const [visibleTooltip, setVisibleTooltip] = useState(false);
    const { modalSettingsIsActive, calendarIsActive, hasErrors, group, availableDates, setModalSettingsIsActive, setCalendarIsActive } = useStore(
        (state) => state
    );
    const hasGroup = group.group_id !== 0;

    const nameToggle = (): ReactElement => (
        <TouchableOpacity style={styles.nameContainer} onPress={() => setVisibleTooltip(true)}>
            <Text category="h6" style={styles.name} numberOfLines={1} ellipsizeMode="middle">
                {group.name}
            </Text>
            <Icon style={styles.info} name="info-outline" />
        </TouchableOpacity>
    );

    return (
        <>
            <View style={styles.header}>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require("./logo.png")} />
                    <Tooltip style={styles.tooltip} anchor={nameToggle} visible={visibleTooltip} onBackdropPress={() => setVisibleTooltip(false)}>
                        {group.specialty}
                    </Tooltip>
                </View>
                <View style={styles.buttonsContainer}>
                    {hasGroup && (
                        <Button
                            onPress={() => setModalSettingsIsActive(!modalSettingsIsActive)}
                            style={styles.button}
                            appearance="ghost"
                            accessoryLeft={SettingsIcon}
                            disabled={hasErrors || !availableDates.length}
                        />
                    )}
                    {hasGroup && (
                        <Button
                            onPress={() => setCalendarIsActive(!calendarIsActive)}
                            style={styles.button}
                            appearance="ghost"
                            accessoryLeft={CalendarIcon}
                            disabled={hasErrors || !availableDates.length}
                        />
                    )}
                </View>
            </View>
            <ModalSettings />
            {calendarIsActive && <Calendar />}
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        width: "100%",
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        gap: 5,
    },
    nameContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: -12,
        gap: 5,
    },
    buttonsContainer: {
        flexDirection: "row",
        gap: 10,
    },
    logo: {
        resizeMode: "center",
        height: 30,
        width: 30,
    },
    name: {
        maxWidth: 140,
    },
    tooltip: {
        maxWidth: 300,
    },
    button: {
        width: 40,
        height: 40,
    },
    icon: {
        width: 26,
        height: 26,
    },
    info: {
        width: 17,
        height: 17,
    },
});
