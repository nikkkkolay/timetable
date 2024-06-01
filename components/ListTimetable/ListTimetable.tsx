import React from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { Card, List, Text } from "@ui-kitten/components";

interface ListProps {
    name: string;
    address: string;
    teacher: string;
}

const data = new Array(8).fill({
    name: "12:40 - 14:15 Психология саморазвития и социального взаимодействия  (Тест.)",
    address: "217А (Спортивная, 13)",
    teacher: "Буев С.А.",
});

export const ListTimetable = (): React.ReactElement => {
    const renderItemHeader = (headerProps: any, info: ListRenderItemInfo<ListProps>): React.ReactElement => (
        <View {...headerProps} style={styles.padding}>
            <Text category="s2">{`${info.item.name}`}</Text>
        </View>
    );

    const renderItemFooter = (footerProps: any, info: ListRenderItemInfo<ListProps>): React.ReactElement => (
        <Text category="p2" style={styles.padding} {...footerProps}>
            {`${info.item.address}`}
        </Text>
    );

    const renderItem = (info: ListRenderItemInfo<ListProps>): React.ReactElement => (
        <Card
            style={styles.item}
            status="basic"
            header={(headerProps) => renderItemHeader(headerProps, info)}
            footer={(footerProps) => renderItemFooter(footerProps, info)}
        >
            <Text category="p2">{`${info.item.teacher}`}</Text>
        </Card>
    );

    return <List style={styles.container} contentContainerStyle={styles.contentContainer} data={data} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
    container: {
        maxHeight: 520,
        marginTop: 10,
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    padding: {
        paddingVertical: 10,
        paddingHorizontal: 24,
    },
    contentContainer: {
        paddingHorizontal: 0,
    },
    item: {
        marginVertical: 4,
    },
});
