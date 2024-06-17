import React, { ReactElement, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Icon, Text, Button, IconElement, Tooltip } from "@ui-kitten/components";
import { Calendar, ModalSettings } from "../index";
import { useStore } from "../../store/useStore";

const SettingsIcon = (): IconElement => <Icon style={styles.icon} name="settings-2-outline" />;
const CalendarIcon = (): IconElement => <Icon style={styles.icon} name="calendar-outline" />;

export const Header = () => {
    const [visibleTooltip, setVisibleTooltip] = useState(false);
    const { modalSettingsIsActive, calendarIsActive, hasErrors, group, setModalSettingsIsActive, setCalendarIsActive } = useStore((state) => state);
    const hasGroup = group.group_id !== 0;

    const nameToggle = (): ReactElement => (
        <Text category="h6" style={styles.name} numberOfLines={2} ellipsizeMode="middle" onPress={() => setVisibleTooltip(true)}>
            {group.name}
        </Text>
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
                            disabled={hasErrors}
                        />
                    )}
                    {hasGroup && (
                        <Button
                            onPress={() => setCalendarIsActive(!calendarIsActive)}
                            style={styles.button}
                            appearance="ghost"
                            accessoryLeft={CalendarIcon}
                            disabled={hasErrors}
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
        alignItems: "flex-end",
        flex: 1,
    },
    buttonsContainer: {
        flexDirection: "row",
        gap: 10,
    },
    logo: {
        resizeMode: "center",
        height: 40,
        width: 40,
    },
    name: {
        marginBottom: 1,
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
});
