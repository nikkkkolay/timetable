export type ChoiceTypes = {
    id: number;
    uid: string;
    uid_mg: string | null;
    name: string;
    specialty: string;
};

export type GroupTypes = {
    uid: string;
    uid_mg: string | null;
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
    getCurrentSchedule: (uid: string, uid_mg: string | null) => void;
    getGroups: (fac_id: number, course_id: number) => void;
    getSchedule: (start: string, end: string, uid: string, uid_mg: string | null) => void;
    getAvailableDates: (uid: string, uid_mg: string | null) => void;
    setGroup: (group: GroupTypes) => void;
    setModalSettingsIsActive: (state: boolean) => void;
    setCalendarIsActive: (state: boolean) => void;
    setRange: (range: any) => void;
    createRangeList: (startDate: string, endDate: string) => void;
}
