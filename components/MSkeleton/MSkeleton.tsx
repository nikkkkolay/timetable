import React, { ReactElement } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { Card, List, Text } from "@ui-kitten/components";
import { Skeleton } from "moti/skeleton";

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

const SkeletonCommonProps = {
    colorMode: "light",
    transition: {
        type: "timing",
        duration: 2000,
    },
    backgroundColor: "#f2f5fa",
    colors: ["#edeff3", "#f2f5fa"],
} as any;

export const MSkeleton = (): ReactElement => {
    const renderSkeletonHeader = (info: ListRenderItemInfo<IEmpty>): ReactElement => (
        <>
            {info.index === 0 ? (
                <View style={styles.week}>
                    <Skeleton show width={"100%"} {...SkeletonCommonProps} backgroundColor={"#008cfa"} colors={["#41a9fd", "#f6f6f6"]}>
                        <Text>{info.item.header}</Text>
                    </Skeleton>
                </View>
            ) : (
                <View style={styles.accent}></View>
            )}
            <View style={styles.row}>
                <Skeleton show width={"100%"} {...SkeletonCommonProps}>
                    <Text>{info.item.time}</Text>
                </Skeleton>
            </View>
        </>
    );

    const renderSkeletonFooter = (info: ListRenderItemInfo<IEmpty>): ReactElement => {
        return (
            <View style={styles.item}>
                <Skeleton show width={"100%"} {...SkeletonCommonProps}>
                    <Text>{info.item.footer}</Text>
                </Skeleton>
            </View>
        );
    };

    const renderSkeleton = (info: ListRenderItemInfo<IEmpty>): ReactElement => (
        <Card style={styles.card} status="basic" header={() => renderSkeletonHeader(info)} footer={() => renderSkeletonFooter(info)}>
            <View style={styles.item}>
                <Skeleton show width={"100%"} {...SkeletonCommonProps}>
                    <Text>{info.item.body}</Text>
                </Skeleton>
                <Skeleton show width={"70%"} {...SkeletonCommonProps}>
                    <Text>{info.item.body}</Text>
                </Skeleton>
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
    contentContainer: {
        paddingHorizontal: 0,
    },
    card: {
        marginBottom: 8,
    },
    item: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        gap: 10,
    },
    accent: {
        backgroundColor: "#f2f5fa",
        paddingVertical: 2,
    },
});
