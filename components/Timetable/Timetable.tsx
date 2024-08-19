import { ListTimetable } from "../ListTimetable/ListTimetable";
import { EmptyTimetable } from "../EmptyTimetable/EmptyTimetable";
import { MSkeleton } from "../MSkeleton/MSkeleton";
import { useStore } from "../../store/useStore";

export const Timetable = () => {
    const { hasErrors, schedule, fetchingTimetable } = useStore((state) => state);

    if (fetchingTimetable) return <MSkeleton />;

    return (
        <>
            {!hasErrors && schedule.length === 0 && <EmptyTimetable />}
            {!hasErrors && schedule.length !== 0 && <ListTimetable data={schedule} />}
        </>
    );
};
