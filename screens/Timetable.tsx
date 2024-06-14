import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header, Container, ListTimetable, Greeting, Error } from "../components";
import { useStore } from "../store/useStore";

export const Timetable = () => {
    const { hasErrors, setGroup, group } = useStore((state) => state);
    const hasGroup = Object.keys(group).length !== 0;

    useEffect(() => {
        async function getGroup() {
            const value = await AsyncStorage.getItem("group");
            if (value !== null) setGroup(JSON.parse(value));
        }
        getGroup();
    }, []);

    return (
        <Container>
            <Header />
            {!hasErrors && hasGroup && <ListTimetable />}
            {!hasErrors && !hasGroup && <Greeting />}
            {hasErrors && <Error />}
        </Container>
    );
};
