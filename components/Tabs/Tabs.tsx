import { PropsWithChildren, useState } from "react";
import { StyleSheet } from "react-native";
import { TabView, Layout } from "@ui-kitten/components";
import { Container } from "../Container/Container";

export const Tabs = ({ children }: PropsWithChildren) => {
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
                style={{ width: "100%" }}
            >
                {children}
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
});
