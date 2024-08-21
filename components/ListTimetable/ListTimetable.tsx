import React, { ReactElement } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { Card, List, Text } from "@ui-kitten/components";
import { format } from "@formkit/tempo";
import { ScheduleTypes } from "../../store/useStore.types";
import { SharingButton } from "../SharingButton/SharingButton";
import { useStore } from "../../store/useStore";

export interface ITimetableProps {
    data: ScheduleTypes[];
}

export const ListTimetable = ({ data }: ITimetableProps): ReactElement => {
    const { range } = useStore((state) => state);

    const renderItemHeader = (info: ListRenderItemInfo<ScheduleTypes>): ReactElement => (
        <>
            {info.item.pair_first ? (
                <View style={styles.week}>
                    <Text style={styles.pair_date}>{format({ date: info.item.pair_date, format: "D MMMM (dddd)", tz: "Europe/Moscow" })}</Text>
                </View>
            ) : (
                <View style={styles.accent}></View>
            )}
            {info.item.pair && (
                <View style={styles.row}>
                    <Text style={styles.pair} category="s2">
                        {`${info.item.pair} (${info.item.pair_type})`}
                    </Text>
                </View>
            )}
        </>
    );

    const renderItemFooter = (info: ListRenderItemInfo<ScheduleTypes>): ReactElement => {
        return <View>{info.item.room && <Text style={styles.row}>{info.item.room}</Text>}</View>;
    };

    const renderCard = (info: ListRenderItemInfo<ScheduleTypes>): ReactElement => (
        <Card
            style={info.index === data.length - 1 ? styles.cardNoMargin : styles.card}
            status="basic"
            header={() => renderItemHeader(info)}
            footer={() => renderItemFooter(info)}
        >
            {info.item.disciplines ? (
                <View style={styles.row}>
                    <Text>{info.item.disciplines}</Text>
                    <Text style={styles.teacher}>{`— ${info.item.teacher}`}</Text>
                </View>
            ) : (
                <View style={styles.row}>
                    <Text style={styles.empty}>{"— Нет учебных занятий"}</Text>
                </View>
            )}
        </Card>
    );
    return (
        <>
            <List style={styles.container} contentContainerStyle={styles.contentContainer} data={data} renderItem={renderCard} />
            {range.endDate && <SharingButton />}
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
        textTransform: "capitalize",
    },
    teacher: {
        marginTop: 6,
    },
    empty: {
        marginTop: 6,
        marginBottom: 6,
    },
    contentContainer: {
        paddingHorizontal: 0,
    },
});
