import { View, StyleSheet, Linking } from "react-native";
import { Text, Button } from "@ui-kitten/components";

export const Error = () => {
    const url = "https://www.mauniver.ru/student/timetable/new/";

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
        paddingBottom: 120,
    },
    text: {
        fontSize: 18,
        textAlign: "center",
    },
});
