import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
    size?: "low" | "middle";
};

export const Container = ({ children }: PropsWithChildren<Props>) => {
    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        width: "100%",
    },
});
