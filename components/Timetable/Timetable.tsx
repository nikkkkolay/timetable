import { useState, useLayoutEffect } from "react";
import { ListTimetable } from "../ListTimetable/ListTimetable";
import { EmptyTimetable } from "../EmptyTimetable/EmptyTimetable";
import { MSkeleton } from "../MSkeleton/MSkeleton";
import { useStore } from "../../store/useStore";

export const Timetable = () => {
    const { hasErrors, schedule, fetchingTimetable } = useStore((state) => state);
    const [emptySchedule, checkEmptySchedule] = useState(false);

    useLayoutEffect(() => {
        checkEmptySchedule(schedule.length === 0);
    }, [schedule]);

    if (fetchingTimetable) {
        return <MSkeleton />;
    }

    return (
        <>
            {!hasErrors && emptySchedule && <EmptyTimetable />}
            {!hasErrors && !emptySchedule && <ListTimetable data={schedule} />}
        </>
    );
};
