import { StyleSheet } from "react-native";

import {
    Layout,
    Spinner,
    StyleService,
    useStyleSheet,
} from "@ui-kitten/components";

export const StudentLayout = () => {
    const styles = useStyleSheet(themedStyles);

    return (
        <Layout style={styles.tabContainer}>
            <Spinner size="giant" status="primary" />
        </Layout>
    );
};

const themedStyles = StyleService.create({
    tabContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "color-success-500",
        paddingBottom: 15,
        paddingTop: 15,
        marginTop: 15,
        borderRadius: 4,
    },
});
