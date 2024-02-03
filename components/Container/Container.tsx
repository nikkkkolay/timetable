import { Layout } from "@ui-kitten/components";
import { CSSProperties, PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
    size?: "low" | "middle";
    style?: CSSProperties;
};

export const Container = ({ children, style }: PropsWithChildren<Props>) => {
    return <View style={[style, styles.container]}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        width: "100%",
        // backgroundColor: "rgba(0,0,0, 0)",
    },
});
