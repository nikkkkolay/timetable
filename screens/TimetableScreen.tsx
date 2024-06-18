import { useState, useEffect, useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header, Container, Timetable, Greeting, Error } from "../components";
import { useStore } from "../store/useStore";

export const TimetableScreen = () => {
    const { hasErrors, group, getGroup } = useStore((state) => state);
    const [emptyGroup, checkEmptyGroup] = useState(false);

    useLayoutEffect(() => {
        async function updateGroup() {
            const value = await AsyncStorage.getItem("group");
            if (value !== null) {
                await getGroup(JSON.parse(value).name);
            }
        }
        updateGroup();
    }, []);

    useEffect(() => {
        checkEmptyGroup(group.group_id !== 0);
    }, [group]);

    return (
        <Container>
            <Header />
            {!hasErrors && emptyGroup && <Timetable />}
            {!hasErrors && !emptyGroup && <Greeting />}
            {hasErrors && <Error />}
        </Container>
    );
};
