import { View, StyleSheet } from "react-native";
import { Text, Button, Spinner } from "@ui-kitten/components";
import { useStore } from "../../store/useStore";

export const Greeting = () => {
    const { modalSettingsIsActive, loading, setModalSettingsIsActive } = useStore((state) => state);

    if (loading) {
        return (
            <View style={styles.container}>
                <Spinner size="giant" />
            </View>
        );
    }

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
        paddingBottom: 110,
    },
    text: {
        fontSize: 18,
        textAlign: "center",
    },
});
