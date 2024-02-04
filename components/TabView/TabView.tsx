import { useState } from "react";
import {
    TabView,
    Tab,
    useStyleSheet,
    useTheme,
    StyleService,
} from "@ui-kitten/components";
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
    const styles = useStyleSheet(themedStyles);
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

const themedStyles = StyleService.create({
    contentContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "color-success-500",
        paddingTop: 0,
    },
    tab: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    tabActive: {
        backgroundColor: "color-success-200",
    },
});
