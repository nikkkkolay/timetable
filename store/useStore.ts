import { api } from "../http";
import { create } from "zustand";
import { formatDate } from "../helpers";
import { IStore, ScheduleTypes } from "./useStore.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStore = create<IStore>((set, get) => ({
    modalSettingsIsActive: false,
    calendarIsActive: false,
    hasErrors: false,
    loading: false,
    fetchingTimetable: false,
    updateDate: "",
    faculties: [],
    courses: [],
    groups: [],
    availableDates: [],
    schedule: [],
    range: {},
    rangeList: [],
    group: null,
    maxRange: 21,

    setModalSettingsIsActive: (state) => {
        set({ modalSettingsIsActive: state });
    },

    setCalendarIsActive: (state) => {
        set({ calendarIsActive: state });
    },

    setRange: (range) => {
        set({ range: range });
    },

    setGroup: (group) => {
        set({ group: group });
    },

    createRangeList: (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);

        let currentDate = startDate;
        const days = [];

        while (currentDate <= endDate) {
            days.push(formatDate(currentDate));

            currentDate.setDate(currentDate.getDate() + 1);
        }

        set({ rangeList: days });
    },

    checkUpdateDate: async () => {
        set({ loading: true });
        try {
            const response = await api.get(`/`);
            if (response.status !== 200) {
                set({ hasErrors: true, loading: false, schedule: [], availableDates: [], range: {} });
            } else {
                set({ hasErrors: false, updateDate: response.data[0].download, loading: false });
            }
        } catch (err) {
            set({ hasErrors: true, loading: false, schedule: [], availableDates: [], range: {} });
        }
    },

    getFaculties: async () => {
        try {
            const response = await api.get(`/faculties`);
            set({
                faculties: response.data.map((fac: { fac_id: number; facultee: string }) => ({
                    id: fac.fac_id,
                    name: fac.facultee,
                })),
            });
        } catch (err) {
            set({ hasErrors: true, modalSettingsIsActive: false });
        }
    },

    getCourses: async () => {
        try {
            const response = await api.get(`/courses`);
            set({
                courses: response.data.map((course: { course_id: number; course: string }) => ({
                    id: course.course_id,
                    name: course.course,
                })),
            });
        } catch (err) {
            set({ hasErrors: true, modalSettingsIsActive: false });
        }
    },

    getGroups: async (fac_id, course_id) => {
        try {
            const response = await api.get(`/groups/${fac_id}/${course_id}`);
            set({
                groups: response.data.map((group: { UID: number; group: string; speciality: string; UID_mg: string }) => ({
                    uid: group.UID,
                    uid_mg: group.UID_mg ? group.UID_mg : null,
                    name: group.group,
                    specialty: group.speciality,
                })),
            });
        } catch (err) {
            set({ hasErrors: true, modalSettingsIsActive: false });
        }
    },

    getCurrentSchedule: async (uid) => {
        set({ fetchingTimetable: true });
        try {
            const response = await api.get(`/schedule-current/${uid}`);
            set({ schedule: response.data, fetchingTimetable: false });
        } catch (err) {
            await AsyncStorage.removeItem("group");
            set({ hasErrors: true, fetchingTimetable: false, calendarIsActive: false, group: null });
        }
    },

    getAvailableDates: async (uid) => {
        try {
            const response = await api.get(`/schedule-dates/${uid}/`);
            set({ availableDates: response.data });
        } catch (err) {
            set({ hasErrors: true, calendarIsActive: false });
        }
    },

    getSchedule: async (uid, start, end) => {
        set({ fetchingTimetable: true });
        try {
            const response = await api.get(`/schedule/${uid}/${start}/${end}`);

            const rangeList = get().rangeList;

            const daysOff = rangeList.filter((date) => !response.data.some((obj: ScheduleTypes) => obj.pair_date === date));

            const scheduleArr = [
                ...response.data,
                ...daysOff.map((item) => ({
                    pair_date: item,
                    pair_first: true,
                    pair: null,
                    pair_type: null,
                    teacher: null,
                    room: null,
                    disciplines: null,
                })),
            ];

            scheduleArr.sort((a: ScheduleTypes, b: ScheduleTypes) => new Date(a.pair_date).valueOf() - new Date(b.pair_date).valueOf());

            set({ schedule: scheduleArr, fetchingTimetable: false });
        } catch (err) {
            set({ hasErrors: true, fetchingTimetable: false, calendarIsActive: false });
        }
    },
}));
