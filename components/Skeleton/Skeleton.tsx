import React, { ReactElement } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { Card, List, Text } from "@ui-kitten/components";

interface IEmpty {
    header: string;
    time: string;
    body: string;
    footer: string;
}

const data = new Array(3).fill({
    header: " ",
    time: " ",
    body: " ",
    footer: " ",
});

export const Skeleton = (): ReactElement => {
    const renderSkeletonHeader = (info: ListRenderItemInfo<IEmpty>): ReactElement => (
        <>
            {info.index === 0 ? (
                <View style={styles.week}>
                    <Text style={styles.pair_date}>{info.item.header}</Text>
                </View>
            ) : (
                <View style={styles.accent}></View>
            )}
            <View style={styles.row}>
                <Text>{info.item.time}</Text>
            </View>
        </>
    );

    const renderSkeletonFooter = (info: ListRenderItemInfo<IEmpty>): ReactElement => <Text style={styles.row}>{info.item.footer}</Text>;

    const renderSkeleton = (info: ListRenderItemInfo<IEmpty>): ReactElement => (
        <Card style={styles.card} status="basic" header={() => renderSkeletonHeader(info)} footer={() => renderSkeletonFooter(info)}>
            <View style={styles.item}>
                <Text>{info.item.body}</Text>
            </View>
        </Card>
    );

    return <List style={styles.container} contentContainerStyle={styles.contentContainer} data={data} renderItem={renderSkeleton} />;
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
    row: {
        paddingVertical: 10,
        paddingHorizontal: 24,
    },
    pair_date: {
        color: "#ffffff",
    },
    contentContainer: {
        paddingHorizontal: 0,
    },
    card: {
        marginVertical: 4,
    },
    item: {
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    accent: {
        backgroundColor: "#f2f5fa",
        paddingVertical: 2,
    },
});
