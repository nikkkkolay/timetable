import React, { ReactElement } from "react";
import { format } from "@formkit/tempo";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { Button, Card, List, Text } from "@ui-kitten/components";
import { useStore } from "../../store/useStore";

interface IEmpty {
    title: string;
    description: string;
}

const data = new Array(1).fill({
    description: "Сегодня нет учебных занятий",
});

export const EmptyTimetable = (): ReactElement => {
    const { calendarIsActive, setCalendarIsActive } = useStore((state) => state);

    const renderItemHeader = (info: ListRenderItemInfo<IEmpty>): ReactElement => (
        <View style={styles.week}>
            <Text style={styles.pair_date}>{format({ date: new Date(), format: "D", tz: "Europe/Moscow" })}</Text>
        </View>
    );

    const renderItem = (info: ListRenderItemInfo<IEmpty>): ReactElement => (
        <Card status="basic" header={() => renderItemHeader(info)}>
            <View style={styles.item}>
                <Text style={styles.text}>{info.item.description}</Text>
            </View>
        </Card>
    );

    return (
        <View>
            <List style={styles.container} contentContainerStyle={styles.contentContainer} data={data} renderItem={renderItem} />
            <Button style={styles.button} onPress={() => setCalendarIsActive(!calendarIsActive)}>
                {`${!calendarIsActive ? "Открыть" : "Закрыть"} календарь`}
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    week: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        backgroundColor: "#008cfa",
        alignItems: "center",
    },
    pair_date: {
        fontSize: 16,
        color: "#ffffff",
        textTransform: "capitalize",
    },
    contentContainer: {
        paddingHorizontal: 0,
    },
    item: {
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    text: {
        textAlign: "center",
    },
    button: {
        marginTop: 10,
    },
});
