import { StyleSheet } from "react-native";
import { useState } from "react";
import {
    Text,
    Layout,
    Tab,
    TabView,
} from "@ui-kitten/components";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
    Header,
    Calendar,
    Container,
    BottomSheetComponent,
    Tabs,
} from "../components";
import { IconSpeaker, IconStudent, IconLocation } from "../icons";

export const Timetable = () => {

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Container>
                <Header />
                <Calendar />
            </Container>
            <BottomSheetComponent>
                <Tabs>
                    <Tab icon={IconStudent} style={styles.tab}>
                        <Layout style={styles.tabContainer}>
                            <Text category="h5">USERS</Text>
                        </Layout>
                    </Tab>
                    <Tab icon={IconSpeaker} style={styles.tab}>
                        <Layout style={styles.tabContainer}>
                            <Text category="h5">USERS</Text>
                        </Layout>
                    </Tab>
                    <Tab icon={IconLocation} style={styles.tab}>
                        <Layout style={styles.tabContainer}>
                            <Text category="h5">USERS</Text>
                        </Layout>
                    </Tab>
                </Tabs>
            </BottomSheetComponent>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#008cfa",
        paddingBottom: 15,
        paddingTop: 15,
        height: "100%",
    },
    tab: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    tabActive: {
        backgroundColor: "#0084ee",
    },
});
