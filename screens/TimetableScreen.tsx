import { useEffect } from "react";
import { Header, Container, Timetable, Greeting, Error } from "../components";
import { useStore } from "../store/useStore";

export const TimetableScreen = () => {
    const { hasErrors, group, getCurrentSchedule, getAvailableDates } = useStore((state) => state);

    useEffect(() => {
        async function setData() {
            if (!hasErrors && group) {
                await getCurrentSchedule(group.uid, group.uid_mg);
                await getAvailableDates(group.uid, group.uid_mg);
            }
        }
        setData();
    }, [hasErrors]);

    return (
        <Container>
            <Header />
            {!hasErrors && !group && <Greeting />}
            {!hasErrors && group && <Timetable />}
            {hasErrors && <Error />}
        </Container>
    );
};
