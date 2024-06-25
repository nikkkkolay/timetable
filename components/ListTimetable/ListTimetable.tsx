import React, { ReactElement } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { Card, List, Text } from "@ui-kitten/components";
import { ScheduleTypes } from "../../store/useStore.types";
import { DownloadButton } from "../DownloadButton/DownloadButton";

export interface ITimetableProps {
    data: ScheduleTypes[];
}

export const ListTimetable = ({ data }: ITimetableProps): ReactElement => {
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
            <DownloadButton />
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
});
