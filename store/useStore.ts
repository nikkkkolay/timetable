import { api } from "../http";
import { create } from "zustand";
import { format } from "@formkit/tempo";
import { IStore, ScheduleTypes } from "./useStore.types";
import { getDatesInRange } from "./helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStore = create<IStore>((set) => ({
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
    group: {},

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
                groups: response.data.map((group: { UID: number; group: string; speciality: string }) => ({
                    uid: group.UID,
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
            set({ hasErrors: true, fetchingTimetable: false, calendarIsActive: false, group: {} });
        }
    },

    getAvailableDates: async (uid) => {
        try {
            const response = await api.get(`/schedule-dates/${uid}/`);
            const availableDates = response.data.reduce((acc: [], item: string) => {
                return [...acc, format(item, "YYYY-MM-DD")];
            }, []);
            set({ availableDates: availableDates });
        } catch (err) {
            set({ hasErrors: true, calendarIsActive: false });
        }
    },

    getSchedule: async (uid, start, end) => {
        set({ fetchingTimetable: true });
        try {
            const rangeStart = start && format(start, "YYYY-MM-DD");
            const rangeEnd = end && format(end, "YYYY-MM-DD");
            const response = await api.get(`/schedule/${uid}/${rangeStart}/${rangeEnd}`);
            const rangeArray = getDatesInRange(start, end);

            const daysOff = rangeArray.filter((date) => !response.data.some((obj: any) => obj.pair_date === date));

            const scheduleArr = [
                ...response.data,
                ...daysOff.map((item) => ({
                    pair_date: item,
                    pair_first: true,
                    pair: "Нет учебных занятий",
                    pair_type: "---",
                    teacher: "---",
                    room: "---",
                    disciplines: "---",
                })),
            ];

            scheduleArr.sort((a: ScheduleTypes, b: ScheduleTypes) => new Date(a.pair_date).valueOf() - new Date(b.pair_date).valueOf());

            set({ schedule: scheduleArr, fetchingTimetable: false });
        } catch (err) {
            set({ hasErrors: true, fetchingTimetable: false, calendarIsActive: false });
        }
    },
}));
