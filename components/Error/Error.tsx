import { View, StyleSheet } from "react-native";
import { Text, Button, Spinner } from "@ui-kitten/components";
import { useStore } from "../../store/useStore";

export const Error = () => {
    const { checkUpdateDate } = useStore((state) => state);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Сервис временно недоступен. Попробуйте позднее.</Text>
            <Button onPress={() => checkUpdateDate()}>Обновить</Button>
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
