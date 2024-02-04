import { useState } from "react";
import { StyleSheet } from "react-native";
import { TabView, Spinner, Tab } from "@ui-kitten/components";
import { Container } from "../index";

import { IconSpeaker, IconStudent, IconLocation } from "../../icons";
import { LocationLayout, SpeakerLayout, StudentLayout } from "../TabLayout";

const tabs = [
    {
        id: 0,
        icon: IconStudent,
        layout: <StudentLayout />,
    },
    {
        id: 1,
        icon: IconSpeaker,
        layout: <SpeakerLayout />,
    },
    {
        id: 2,
        icon: IconLocation,
        layout: <LocationLayout />,
    },
];

export const TabViewComponent = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const shouldLoadComponent = (index: any): boolean => {
        return index === selectedIndex;
    };

    return (
        <Container style={styles.contentContainer}>
            <TabView
                selectedIndex={selectedIndex}
                shouldLoadComponent={shouldLoadComponent}
                onSelect={(index) => setSelectedIndex(index)}
                style={{ width: "100%", height: "100%" }}
            >
                {tabs &&
                    tabs.map((tab) => (
                        <Tab
                            key={tab.id}
                            icon={tab.icon}
                            style={[
                                styles.tab,
                                selectedIndex === tab.id
                                    ? styles.tabActive
                                    : null,
                            ]}
                        >
                            {tab.layout}
                        </Tab>
                    ))}
            </TabView>
        </Container>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#008cfa",
        paddingTop: 0,
    },
    tab: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    tabActive: {
        backgroundColor: "#0084ee",
    },
});
