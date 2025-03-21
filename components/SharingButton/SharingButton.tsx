import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { format } from "@formkit/tempo";
import { Button, Icon, IconElement } from "@ui-kitten/components";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import XLSX from "xlsx-js-style";
import { useStore } from "../../store/useStore";
import { ScheduleTypes } from "../../store/useStore.types";

const DownloadIcon = (): IconElement => <Icon style={styles.icon} name="share-outline" fill="#f2f5fa" />;

export const SharingButton = (): ReactElement => {
    const { fetchingTimetable, schedule, range, group } = useStore((state) => state);

    const setHeightRows = (sheet: ScheduleTypes[]) =>
        sheet.map(() => ({
            hpt: 30,
        }));

    const sheetCollector = (schedule: ScheduleTypes[], start: any, end: any, name: string) => {
        const rangeStart = format(start, "DD.MM.YYYY");
        const rangeEnd = format(end, "DD.MM.YYYY");

        const headerTitle = `Расписание группы ${name} ${rangeStart === rangeEnd ? `(${rangeStart})` : `(${rangeStart} - ${rangeEnd})`}`;

        const header = [
            {
                v: headerTitle,
                s: { font: { sz: 14, bold: true } },
            },
        ];

        const body = schedule.reduce((acc: ScheduleTypes[] | any, item: ScheduleTypes) => {
            if (item.pair_first) {
                const date = [
                    {
                        v: format(item.pair_date, "D MMMM (dddd)"),
                        s: {
                            fill: { fgColor: { theme: 4 } },
                            font: { sz: 12, bold: true, color: { rgb: "FFFFFF" } },
                            border: { borderStyle },
                            alignment: { horizontal: "center", vertical: "center" },
                        },
                    },
                ];
                acc = [...acc, [], date];
            }

            const pair = [
                {
                    v: item.pair ? item.pair : "Нет учебных занятий",
                    s: cellStyle,
                },
                {
                    v: `${item.disciplines ? item.disciplines : ""} ${item.pair_type ? item.pair_type : "---"}`,
                    s: { ...cellStyle, alignment: { horizontal: "left", vertical: "top", wrapText: true } },
                },
                {
                    v: item.teacher ? item.teacher : "---",
                    s: { ...cellStyle, alignment: { horizontal: "left", vertical: "top", wrapText: true } },
                },
                {
                    v: item.room ? item.room : "---",
                    s: { ...cellStyle, alignment: { horizontal: "left", vertical: "top" } },
                },
            ];
            acc = [...acc, pair];
            return acc;
        }, []);

        return [header, ...body];
    };

    const shareExcel = async () => {
        if (!group) return;

        const dateStart = range.startDate && format(range.startDate, "DD.MM.YYYY");
        const dateEnd = range.endDate && format(range.endDate, "DD.MM.YYYY");
        const groupName = group.name;
        const sheet = sheetCollector(schedule, range.startDate, range.endDate, groupName);

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(sheet);
        ws["!cols"] = [{ wch: 30 }, { wch: 50 }, { wch: 30 }, { wch: 30 }];
        ws["!rows"] = setHeightRows(sheet);

        const fileTitle = `${groupName} ${dateStart === dateEnd ? `(${dateStart})` : `(${dateStart} - ${dateEnd})`}`;

        XLSX.utils.book_append_sheet(wb, ws, groupName, true);

        const base64 = XLSX.write(wb, { type: "base64" });
        const fileName = FileSystem.documentDirectory + `${fileTitle}.xlsx`;

        FileSystem.writeAsStringAsync(fileName, base64, {
            encoding: FileSystem.EncodingType.Base64,
        }).then(() => {
            Sharing.shareAsync(fileName);
        });
    };

    return <Button onPress={() => shareExcel()} style={styles.button} accessoryLeft={DownloadIcon} status="warning" disabled={fetchingTimetable} />;
};

const styles = StyleSheet.create({
    button: {
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

const borderStyle = {
    top: { style: "thin", color: "f4f4f4" },
    bottom: { style: "thin", color: "f4f4f4" },
    left: { style: "thin", color: "f4f4f4" },
    right: { style: "thin", color: "f4f4f4" },
};

const cellStyle = {
    alignment: { wrapText: true, vertical: "center", horizontal: "center" },
    border: borderStyle,
};
