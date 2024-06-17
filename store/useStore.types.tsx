export type ChoiceTypes = {
    id: number;
    name: string;
    specialty: string;
};

export type GroupTypes = {
    group_id: number;
    name: string;
    specialty: string;
};

export type ScheduleTypes = {
    id: number;
    pair_date: string;
    pair: string;
    pair_type: string;
    room: string;
    teacher: string;
    disciplines: string;
};

export interface IStore {
    loading: boolean;
    fetchingTimetable: boolean;
    hasErrors: boolean;
    modalSettingsIsActive: boolean;
    calendarIsActive: boolean;
    updateDate: string;
    faculties: [ChoiceTypes] | [];
    courses: [ChoiceTypes] | [];
    groups: [ChoiceTypes] | [];
    group: GroupTypes;
    currentSchedule: [ScheduleTypes] | [];
    checkUpdateDate: () => void;
    getFaculties: () => void;
    getCourses: () => void;
    getGroups: (fac_id: number, course_id: number) => void;
    getGroup: (name: string) => void;
    getCurrentSchedule: (group_id: number) => void;
    setGroup: (group: GroupTypes) => void;
    setModalSettingsIsActive: (state: boolean) => void;
    setCalendarIsActive: (state: boolean) => void;
}
