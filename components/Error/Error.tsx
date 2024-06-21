import { View, StyleSheet } from "react-native";
import { Text, Button, Spinner } from "@ui-kitten/components";
import { useStore } from "../../store/useStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Error = () => {
    const { loading, hasErrors, group, getGroup, checkUpdateDate } = useStore((state) => state);

    if (loading) {
        return (
            <View style={styles.container}>
                <Spinner size="giant" />
            </View>
        );
    }

    const fetchData = async () => {
        const value = await AsyncStorage.getItem("group");
        if (value !== null) {
            await checkUpdateDate();
            if (!hasErrors) {
                await getGroup(JSON.parse(value).name);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Сервис временно недоступен. Попробуйте подключиться позднее.</Text>
            {group.group_id !== 0 && <Button onPress={fetchData}>Обновить</Button>}
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
