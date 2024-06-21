import { useState, useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import { ListTimetable, EmptyTimetable, MSkeleton } from "../index";
import { useStore } from "../../store/useStore";

export const Timetable = () => {
    const { schedule, fetchingTimetable } = useStore((state) => state);
    const [emptySchedule, checkEmptySchedule] = useState(false);

    useLayoutEffect(() => {
        checkEmptySchedule(schedule.length === 0);
    }, [schedule]);

    if (fetchingTimetable) {
        return <MSkeleton />;
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
