import { View, StyleSheet, Linking } from "react-native";
import { Text, Button, Spinner } from "@ui-kitten/components";
import { useStore } from "../../store/useStore";

export const Error = () => {
    const { loading } = useStore((state) => state);

    const url = "https://www.mauniver.ru/student/timetable/new/";

    if (loading) {
        return (
            <View style={styles.container}>
                <Spinner size="giant" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Сервис временно недоступен. Воспользуйтесь расписанием на сайте университета.</Text>
            <Button onPress={() => Linking.openURL(url)}>Смотреть на сайте</Button>
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
