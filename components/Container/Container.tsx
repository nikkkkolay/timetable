import { CSSProperties, PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
    size?: "low" | "middle";
    style?: CSSProperties | any;
};

export const Container = ({ children, style }: PropsWithChildren<Props>) => {
    return <View style={[style, styles.container]}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: "100%",
    },
});
