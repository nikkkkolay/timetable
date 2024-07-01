import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { format } from "@formkit/tempo";
import { Button, Icon, IconElement } from "@ui-kitten/components";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import XLSX from "xlsx-js-style";
import { useStore } from "../../store/useStore";
import { ScheduleTypes } from "../../store/useStore.types";
import { getDatesInRange } from "./helpers";

const DownloadIcon = (): IconElement => <Icon style={styles.icon} name="share-outline" fill="#f2f5fa" />;

export const SharingButton = (): ReactElement => {
    const { fetchingTimetable, schedule, range, group } = useStore((state) => state);

    const sheetCollector = (schedule: ScheduleTypes[], start: any, end: any, name: string) => {
        const rangeStart = format(start, "DD.MM.YYYY");
        const rangeEnd = format(end, "DD.MM.YYYY");
        const rangeArray = getDatesInRange(start, end);

        const daysOff = rangeArray.filter((el) => !schedule.find((item) => el === item.pair_date));

        const scheduleArr = [
            ...schedule,
            ...daysOff.map((item) => ({
                pair: "---",
                pair_date: item,
                pair_first: true,
                pair_type: "---",
                teacher: "---",
                room: "---",
                disciplines: "Нет учебных занятий",
            })),
        ];

        scheduleArr.sort((a: any, b: any) => Number(a.pair_date.split(" ")[0] > Number(b.pair_date.split(" ")[0])));

        const headerTitle = `Расписание группы ${name} ${rangeStart === rangeEnd ? `(${rangeStart})` : `(${rangeStart} - ${rangeEnd})`}`;

        const header = [
            {
                v: headerTitle,
                s: { font: { sz: 14, bold: true } },
            },
        ];

        const body = scheduleArr.reduce((acc: any, item: any) => {
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
                    v: `${item.disciplines} (${item.pair_type})`,
                    s: { ...cellStyle, alignment: { horizontal: "left", vertical: "top", wrapText: true } },
                },
                {
                    v: item.teacher,
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

        return [header, ...body];
    };

    const shareExcel = async () => {
        const dateStart = range.startDate && format(range.startDate, "DD.MM.YYYY");
        const dateEnd = range.endDate && format(range.endDate, "DD.MM.YYYY");
        const sheet = sheetCollector(schedule, range.startDate, range.endDate, group.name);

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(sheet);
        ws["!cols"] = [{ wch: 30 }, { wch: 50 }, { wch: 20 }, { wch: 30 }];
        const fileTitle = `${group.name} ${dateStart === dateEnd ? `(${dateStart})` : `(${dateStart} - ${dateEnd})`}`;

        XLSX.utils.book_append_sheet(wb, ws, group.name, true);

        const base64 = XLSX.write(wb, { type: "base64" });
        const fileName = FileSystem.documentDirectory + `${fileTitle}.xlsx`;

        FileSystem.writeAsStringAsync(fileName, base64, {
            encoding: FileSystem.EncodingType.Base64,
        }).then(() => {
            Sharing.shareAsync(fileName);
        });
    };

    return (
        <Button
            onPress={() => shareExcel()}
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
