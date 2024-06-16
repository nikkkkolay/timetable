import { useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header, Container, Timetable, Greeting, Error } from "../components";
import { useStore } from "../store/useStore";

export const TimetableScreen = () => {
    const { hasErrors, group, setGroup } = useStore((state) => state);
    const hasGroup = group.group_id !== 0;

    useLayoutEffect(() => {
        async function getGroup() {
            const value = await AsyncStorage.getItem("group");
            if (value !== null) setGroup(JSON.parse(value));
        }
        getGroup();
    }, []);

    return (
        <Container>
            <Header />
            {!hasErrors && hasGroup && <Timetable />}
            {!hasErrors && !hasGroup && <Greeting />}
            {hasErrors && <Error />}
        </Container>
    );
};
