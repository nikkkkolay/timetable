import { StyleSheet } from "react-native";

import {
    Layout,
    Spinner,
    StyleService,
    useStyleSheet,
} from "@ui-kitten/components";

export const SpeakerLayout = () => {
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
        alignItems: "center",
        backgroundColor: "color-success-500",
        paddingBottom: 15,
        paddingTop: 15,
        marginTop: 200,
        borderRadius: 4,
    },
});
