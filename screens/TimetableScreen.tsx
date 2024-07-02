import { useEffect } from "react";
import { useAppState } from "@react-native-community/hooks";
import { Header, Container, Timetable, Greeting, Error } from "../components";
import { useStore } from "../store/useStore";
import { format } from "@formkit/tempo";

export const TimetableScreen = () => {
    const { hasErrors, group, range, getCurrentSchedule, getAvailableDates, getSchedule, checkUpdateDate } = useStore((state) => state);
    const currentAppState = useAppState();
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

    useEffect(() => {
        const rangeStart = range.startDate && format(range.startDate, "YYYY-MM-DD");
        const rangeEnd = range.endDate && format(range.endDate, "YYYY-MM-DD");
        if (currentAppState === "active") {
            async function getGroupId() {
                await checkUpdateDate();
                if (!hasErrors) {
                    if (rangeStart && rangeEnd && group.uid) {
                        getAvailableDates(group.uid);
                        getSchedule(group.uid, rangeStart, rangeEnd);
                    }
                }
            }
            getGroupId();
        }
    }, [currentAppState]);

    return (
        <Container>
            <Header />
            {!hasErrors && !hasGroup && <Greeting />}
            {!hasErrors && hasGroup && <Timetable />}
            {hasErrors && <Error />}
        </Container>
    );
};
