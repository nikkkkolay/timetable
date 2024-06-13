import { View, StyleSheet } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import { useStore } from "../../store/useStore";

export const Greeting = () => {
    const { modalSettingsIsActive, setModalSettingsIsActive } = useStore((state) => state);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Для начала работы перейдите в настройки и заполните форму</Text>
            <Button onPress={() => setModalSettingsIsActive(!modalSettingsIsActive)}>Настройки</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0)",
        paddingBottom: 120,
    },
    text: {
        fontSize: 18,
        textAlign: "center",
    },
});
