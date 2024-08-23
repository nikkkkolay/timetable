export type ChoiceTypes = {
    id: number;
    uid: string;
    name: string;
    specialty: string;
};

export type GroupTypes = {
    uid: string;
    name: string;
    specialty: string;
};

export type ScheduleTypes = {
    id?: number;
    pair_date: string;
    pair_first: boolean;
    pair: string;
    pair_type: string;
    room: string;
    teacher: string;
    disciplines: string;
};

export type RangeTypes = {
    startDate: Date | undefined;
    endDate: Date | undefined;
};

export interface IStore {
    loading: boolean;
    fetchingTimetable: boolean;
    hasErrors: boolean;
    modalSettingsIsActive: boolean;
    calendarIsActive: boolean;
    updateDate: string;
    faculties: ChoiceTypes[];
    courses: ChoiceTypes[];
    groups: ChoiceTypes[];
    availableDates: string[];
    schedule: ScheduleTypes[];
    group: GroupTypes | null;
    maxRange: number;
    range: RangeTypes | Record<string, never>;
    rangeList: string[];
    checkUpdateDate: () => void;
    getFaculties: () => void;
    getCourses: () => void;
    getCurrentSchedule: (uid: string) => void;
    getGroups: (fac_id: number, course_id: number) => void;
    getSchedule: (uid: string, start: string, end: string) => void;
    getAvailableDates: (uid: string) => void;
    setGroup: (group: GroupTypes) => void;
    setModalSettingsIsActive: (state: boolean) => void;
    setCalendarIsActive: (state: boolean) => void;
    setRange: (range: any) => void;
    createRangeList: (startDate: string, endDate: string) => void;
}
