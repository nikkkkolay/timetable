import { useState, useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header, Container, Timetable, Greeting, Error } from "../components";
import { useStore } from "../store/useStore";

export const TimetableScreen = () => {
    const { hasErrors, group, getCurrentSchedule, getAvailableDates, setRange } = useStore((state) => state);
    const [emptyGroup, checkEmptyGroup] = useState(false);

    useLayoutEffect(() => {
        async function updateSchedule() {
            if (group.group_id !== 0) {
                await setRange({ startDate: null, endDate: null });
                await getCurrentSchedule(group.group_id);
                await getAvailableDates(group.group_id);
                await AsyncStorage.setItem("group", JSON.stringify(group));
            }
        }
        updateSchedule();
        checkEmptyGroup(group.group_id !== 0);
    }, [group.group_id]);

    return (
        <Container>
            <Header />
            {!hasErrors && !emptyGroup && <Greeting />}
            {!hasErrors && emptyGroup && <Timetable />}
            {hasErrors && <Error />}
        </Container>
    );
};
