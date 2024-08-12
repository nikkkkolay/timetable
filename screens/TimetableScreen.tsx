import { useEffect } from "react";
import { Header, Container, Timetable, Greeting, Error } from "../components";
import { useStore } from "../store/useStore";

export const TimetableScreen = () => {
    const { hasErrors, group, getCurrentSchedule, getAvailableDates } = useStore((state) => state);
    const hasGroup = Object.keys(group).length !== 0;

    useEffect(() => {
        async function setData() {
            if (!hasErrors && hasGroup) {
                await getCurrentSchedule(group.uid);
                await getAvailableDates(group.uid);
            }
        }
        setData();
    }, [hasErrors]);

    return (
        <Container>
            <Header />
            {!hasErrors && !hasGroup && <Greeting />}
            {!hasErrors && hasGroup && <Timetable />}
            {hasErrors && <Error />}
        </Container>
    );
};
