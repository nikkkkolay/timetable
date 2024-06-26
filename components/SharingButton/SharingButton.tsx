import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { format } from "@formkit/tempo";
import { Button, Icon, IconElement } from "@ui-kitten/components";
import { useStore } from "../../store/useStore";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import XLSX from "xlsx-js-style";

const DownloadIcon = (): IconElement => <Icon style={styles.icon} name="share-outline" fill="#f2f5fa" />;

export const SharingButton = (): ReactElement => {
    const { fetchingTimetable, schedule, range, group } = useStore((state) => state);

    const rangeStart = range.startDate && format(range.startDate, "DD.MM.YYYY");
    const rangeEnd = range.endDate && format(range.endDate, "DD.MM.YYYY");
    const headerTitle = `Расписание группы ${group.name} (${rangeStart} - ${rangeEnd})`;

    const header = [
        {
            v: headerTitle,
            s: { font: { sz: 14, bold: true } },
        },
    ];
    const date = [{ v: "10-10-2024", s: { font: { sz: 12, bold: true } } }];
    const pair = [{ v: "1" }, { v: "10.00-12.00" }, { v: "Ольга И.В." }, { v: "Автоматизация" }];

    const ShareExcel = async () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([header, date, pair, pair, pair]);

        XLSX.utils.book_append_sheet(wb, ws, `Расписание ${group.name}`, true);

        const base64 = XLSX.write(wb, { type: "base64" });
        const fileName = FileSystem.documentDirectory + `Расписание ${group.name}.xlsx`;

        FileSystem.writeAsStringAsync(fileName, base64, {
            encoding: FileSystem.EncodingType.Base64,
        }).then(() => {
            Sharing.shareAsync(fileName);
        });
    };

    return (
        <Button
            onPress={() => ShareExcel()}
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
