import React, { ReactElement } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { Card, List, Text, Button, Icon, IconElement } from "@ui-kitten/components";
import { ScheduleTypes } from "../../store/useStore.types";
import { useStore } from "../../store/useStore";

export interface ITimetableProps {
    data: ScheduleTypes[];
}

const DownloadIcon = (): IconElement => <Icon style={styles.icon} name="download-outline" fill="#f2f5fa" />;

export const ListTimetable = ({ data }: ITimetableProps): ReactElement => {
    const { fetchingTimetable } = useStore((state) => state);

    const downloadSchedule = () => {
        console.log(123);
    };

    const renderItemHeader = (info: ListRenderItemInfo<ScheduleTypes>): ReactElement => (
        <>
            {info.item.pair_first ? (
                <View style={styles.week}>
                    <Text style={styles.pair_date}>{info.item.pair_date}</Text>
                </View>
            ) : (
                <View style={styles.accent}></View>
            )}
            <View style={styles.row}>
                <Text style={styles.pair} category="s2">{`${info.item.pair} (${info.item.pair_type})`}</Text>
            </View>
        </>
    );

    const renderItemFooter = (info: ListRenderItemInfo<ScheduleTypes>): ReactElement => <Text style={styles.row}>{info.item.room}</Text>;

    const renderCard = (info: ListRenderItemInfo<ScheduleTypes>): ReactElement => {
        console.log(info.index);

        return (
            <Card
                style={info.index === data.length - 1 ? styles.cardNoMargin : styles.card}
                status="basic"
                header={() => renderItemHeader(info)}
                footer={() => renderItemFooter(info)}
            >
                <View style={styles.row}>
                    <Text style={styles.disciplines}>{info.item.disciplines}</Text>
                    <Text>{`— ${info.item.teacher}`}</Text>
                </View>
            </Card>
        );
    };

    return (
        <>
            <List style={styles.container} contentContainerStyle={styles.contentContainer} data={data} renderItem={renderCard} />
            <Button
                onPress={() => downloadSchedule()}
                style={styles.downloadButton}
                accessoryLeft={DownloadIcon}
                status="warning"
                disabled={fetchingTimetable}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    card: {
        marginBottom: 8,
    },
    cardNoMargin: {
        marginBottom: 4,
    },
    row: {
        paddingVertical: 10,
        paddingHorizontal: 24,
    },
    week: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        backgroundColor: "#008cfa",
        alignItems: "center",
    },
    accent: {
        backgroundColor: "#f2f5fa",
        paddingVertical: 2,
    },
    pair: {
        fontSize: 15,
    },
    pair_date: {
        fontSize: 16,
        color: "#ffffff",
    },
    disciplines: {
        marginBottom: 6,
    },
    contentContainer: {
        paddingHorizontal: 0,
    },
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
