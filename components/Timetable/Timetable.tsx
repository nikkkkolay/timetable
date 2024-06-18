import { useEffect, useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet } from "react-native";
import { Spinner } from "@ui-kitten/components";
import { ListTimetable, EmptyTimetable } from "../index";
import { useStore } from "../../store/useStore";

export const Timetable = () => {
    const { schedule, group, fetchingTimetable, getCurrentSchedule } = useStore((state) => state);
    const [emptySchedule, checkEmptySchedule] = useState(false);

    useEffect(() => {
        async function updateSchedule() {
            await getCurrentSchedule(group.group_id);
            await AsyncStorage.setItem("group", JSON.stringify(group));
        }
        updateSchedule();
    }, []);

    useEffect(() => {
        checkEmptySchedule(schedule.length === 0);
    }, [schedule]);

    if (fetchingTimetable) {
        return (
            <View style={styles.container}>
                <Spinner size="giant" />
            </View>
        );
    }

    return (
        <>
            {emptySchedule && <EmptyTimetable />}
            {!emptySchedule && <ListTimetable data={schedule} />}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0)",
        paddingBottom: 120,
    },
});
