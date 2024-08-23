import { StyleSheet, View } from "react-native";
import { Text, Icon } from "@ui-kitten/components";
import { ListTimetable } from "../ListTimetable/ListTimetable";
import { EmptyTimetable } from "../EmptyTimetable/EmptyTimetable";
import { MSkeleton } from "../MSkeleton/MSkeleton";
import { useStore } from "../../store/useStore";

export const Timetable = () => {
    const { hasErrors, schedule, fetchingTimetable, rangeList, maxRange, calendarIsActive } = useStore((state) => state);

    if (fetchingTimetable) return <MSkeleton />;

    return (
        <>
            {rangeList.length > maxRange && calendarIsActive && (
                <View style={styles.container}>
                    <Icon style={styles.icon} name="bulb-outline" fill="#f9423a" />
                    <Text style={styles.text} category="s1">{`Максимальный диапазон — ${maxRange} дней`}</Text>
                </View>
            )}
            {!hasErrors && schedule.length === 0 && <EmptyTimetable />}
            {!hasErrors && schedule.length !== 0 && <ListTimetable data={schedule} />}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 10,
    },
    icon: {
        width: 24,
        height: 24,
    },
    text: {
        color: "#f9423a",
    },
});
