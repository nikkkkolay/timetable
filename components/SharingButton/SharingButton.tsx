import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { format } from "@formkit/tempo";
import { Button, Icon, IconElement } from "@ui-kitten/components";
import { useStore } from "../../store/useStore";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import XLSX from "xlsx-js-style";
import { ScheduleTypes } from "../../store/useStore.types";

const DownloadIcon = (): IconElement => <Icon style={styles.icon} name="share-outline" fill="#f2f5fa" />;

export const SharingButton = (): ReactElement => {
    const { fetchingTimetable, schedule, range, group } = useStore((state) => state);

    const rangeStart = range.startDate && format(range.startDate, "DD.MM.YYYY");
    const rangeEnd = range.endDate && format(range.endDate, "DD.MM.YYYY");

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

    const getDaysInRange = (startDate: any, endDate: any) => {
        const days = [];

        while (startDate <= endDate) {
            days.push(new Date(startDate));
            startDate.setDate(startDate.getDate());
        }

        return days;
    };

    const sheetCollector = (schedule: ScheduleTypes[], start: string | undefined, end: string | undefined, name: string) => {
        const headerTitle = `Расписание группы ${name} ${start === end ? `(${start})` : `(${start} - ${end})`}`;
        const descriptionText = "Даты не представленные в таблице являются свободными от занятий";

        const header = [
            {
                v: headerTitle,
                s: { font: { sz: 14, bold: true } },
            },
        ];
        const description = [
            {
                v: descriptionText,
            },
        ];
        const body = schedule.reduce((acc: any, item: any) => {
            if (item.pair_first) {
                const date = [
                    {
                        v: item.pair_date,
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
                    v: item.pair,
                    s: cellStyle,
                },
                {
                    v: item.teacher,
                    s: { ...cellStyle, alignment: { horizontal: "left", vertical: "top", wrapText: true } },
                },
                {
                    v: `${item.disciplines} (${item.pair_type})`,
                    s: { ...cellStyle, alignment: { horizontal: "left", vertical: "top", wrapText: true } },
                },
                {
                    v: item.room,
                    s: { ...cellStyle, alignment: { horizontal: "left", vertical: "top" } },
                },
            ];
            acc = [...acc, pair];
            return acc;
        }, []);

        return [header, description, ...body];
    };

    const ShareExcel = async () => {
        const sheet = sheetCollector(schedule, rangeStart, rangeEnd, group.name);
        const rangeArray = getDaysInRange(range.startDate, range.endDate);

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(sheet);
        ws["!cols"] = [{ wch: 20 }, { wch: 20 }, { wch: 50 }, { wch: 30 }];
        const fileTitle = `Расписание ${group.name}`;

        XLSX.utils.book_append_sheet(wb, ws, fileTitle, true);

        const base64 = XLSX.write(wb, { type: "base64" });
        const fileName = FileSystem.documentDirectory + `${fileTitle}.xlsx`;

        console.log(rangeArray);

        // FileSystem.writeAsStringAsync(fileName, base64, {
        //     encoding: FileSystem.EncodingType.Base64,
        // }).then(() => {
        //     Sharing.shareAsync(fileName);
        // });
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
