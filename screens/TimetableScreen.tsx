import { useState, useLayoutEffect, useEffect } from "react";
import { useAppState } from "@react-native-community/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header, Container, Timetable, Greeting, Error } from "../components";
import { useStore } from "../store/useStore";

export const TimetableScreen = () => {
    const { hasErrors, group, getCurrentSchedule, getAvailableDates, getGroup } = useStore((state) => state);
    const [emptyGroup, checkEmptyGroup] = useState(false);
    const currentAppState = useAppState();

    useLayoutEffect(() => {
        async function updateSchedule() {
            if (group.group_id !== 0) {
                await getCurrentSchedule(group.group_id);
                await getAvailableDates(group.group_id);
                await AsyncStorage.setItem("group", JSON.stringify(group));
            }
        }
        updateSchedule();
        checkEmptyGroup(group.group_id !== 0);
    }, [group.group_id]);

    useEffect(() => {
        if (currentAppState === "active") {
            async function getDates() {
                await getGroup(group.name);
            }
            getDates();
        }
    }, [currentAppState]);

    return (
        <Container>
            <Header />
            {!hasErrors && !emptyGroup && <Greeting />}
            {!hasErrors && emptyGroup && <Timetable />}
            {hasErrors && <Error />}
        </Container>
    );
};
