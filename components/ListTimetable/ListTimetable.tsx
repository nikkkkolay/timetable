import React, { ReactElement } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { Card, List, Text } from "@ui-kitten/components";
import { ScheduleTypes } from "../../store/useStore.types";

export interface ITimetableProps {
    data: ScheduleTypes[];
}

export const ListTimetable = ({ data }: ITimetableProps): ReactElement => {
    const renderItemHeader = (info: ListRenderItemInfo<ScheduleTypes>): ReactElement => (
        <>
            {info.item.id == 0 ? (
                <View style={styles.week}>
                    <Text style={styles.pair_date}>{info.item.pair_date}</Text>
                </View>
            ) : (
                <View style={styles.accent}></View>
            )}
            <View style={styles.padding}>
                <Text>{`${info.item.pair} (${info.item.pair_type})`}</Text>
            </View>
        </>
    );

    const renderItemFooter = (info: ListRenderItemInfo<ScheduleTypes>): ReactElement => <Text style={styles.padding}>{info.item.room}</Text>;

    const renderItem = (info: ListRenderItemInfo<ScheduleTypes>): ReactElement => (
        <Card style={styles.item} status="basic" header={() => renderItemHeader(info)} footer={() => renderItemFooter(info)}>
            <Text style={styles.disciplines}>{info.item.disciplines}</Text>
            <Text>{`— ${info.item.teacher}`}</Text>
        </Card>
    );

    return <List style={styles.container} contentContainerStyle={styles.contentContainer} data={data} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    padding: {
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
    pair_date: {
        color: "#ffffff",
    },
    disciplines: {
        marginBottom: 6,
    },
    contentContainer: {
        paddingHorizontal: 0,
    },
    item: {
        marginVertical: 4,
    },
});
