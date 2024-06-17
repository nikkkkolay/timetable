import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Spinner } from "@ui-kitten/components";
import { ListTimetable, EmptyTimetable } from "../index";
import { useStore } from "../../store/useStore";

export const Timetable = () => {
    const { currentSchedule, group, fetchingTimetable, getCurrentSchedule, getGroup } = useStore((state) => state);
    const hasGroup = group.group_id !== 0;

    useEffect(() => {
        getGroup(group.name);
    }, []);

    useEffect(() => {
        if (hasGroup) getCurrentSchedule(group.group_id);
    }, [group]);

    if (fetchingTimetable) {
        return (
            <View style={styles.container}>
                <Spinner size="giant" />
            </View>
        );
    }

    return (
        <>
            {!currentSchedule.length && <EmptyTimetable />}
            {currentSchedule && <ListTimetable data={currentSchedule} />}
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
