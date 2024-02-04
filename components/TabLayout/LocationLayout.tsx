import { StyleSheet } from "react-native";

import { Layout, Spinner } from "@ui-kitten/components";

export const LocationLayout = () => {
    return (
        <Layout style={styles.tabContainer}>
            <Spinner size="giant" status="primary" />
        </Layout>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#008cfa",
        paddingBottom: 15,
        paddingTop: 15,
        marginTop: 15,
        borderRadius: 4,
    },
});
