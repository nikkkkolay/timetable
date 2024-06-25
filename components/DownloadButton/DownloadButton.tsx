import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon, IconElement } from "@ui-kitten/components";

import { useStore } from "../../store/useStore";

const DownloadIcon = (): IconElement => <Icon style={styles.icon} name="download-outline" fill="#f2f5fa" />;

export const DownloadButton = (): ReactElement => {
    const { fetchingTimetable } = useStore((state) => state);

    const downloadSchedule = () => {
        console.log(123);
    };

    return (
        <Button
            onPress={() => downloadSchedule()}
            style={styles.downloadButton}
            accessoryLeft={DownloadIcon}
            status="warning"
            disabled={fetchingTimetable}
        />
    );
};

const styles = StyleSheet.create({
    downloadButton: {
        position: "absolute",
        right: 15,
        bottom: 14,
        width: 40,
        height: 40,
        borderWidth: 0,
    },
    icon: {
        width: 26,
        height: 26,
    },
});
