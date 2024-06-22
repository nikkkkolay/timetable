import { api } from "../http";
import { create } from "zustand";
import { format } from "@formkit/tempo";
import { IStore, GroupTypes } from "./useStore.types";

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
    group: { group_id: 0, name: "", specialty: "" },
    schedule: [],

    setModalSettingsIsActive: (state: boolean) => {
        set({ modalSettingsIsActive: state });
    },

    setCalendarIsActive: (state: boolean) => {
        set({ calendarIsActive: state });
    },

    checkUpdateDate: async () => {
        set({ loading: true, hasErrors: false });
        try {
            const response = await api.get(`/`);
            set({ updateDate: response.data[0].download, loading: false });
        } catch (err) {
            set({ hasErrors: true, loading: false });
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

    getGroups: async (fac_id: number, course_id: number) => {
        try {
            const response = await api.get(`/groups/${fac_id}/${course_id}`);
            set({
                groups: response.data.map((group: { group_id: number; group: string; speciality: string }) => ({
                    id: group.group_id,
                    name: group.group,
                    specialty: group.speciality,
                })),
            });
        } catch (err) {
            set({ hasErrors: true, modalSettingsIsActive: false });
        }
    },

    getCurrentSchedule: async (group_id: number) => {
        set({ fetchingTimetable: true });
        try {
            const response = await api.get(`/current-schedule/${group_id}`);
            set({ schedule: response.data, fetchingTimetable: false });
        } catch (err) {
            set({ hasErrors: true, fetchingTimetable: false, calendarIsActive: false });
        }
    },

    getGroup: async (name: string) => {
        set({ loading: true, hasErrors: false });
        try {
            const response = await api.get(`/groups/${name}`);
            set({ group: { specialty: response.data.speciality, group_id: response.data.group_id, name: response.data.group }, loading: false });
        } catch (err) {
            set({ hasErrors: true, loading: false });
        }
    },

    getAvailableDates: async (group_id: number) => {
        try {
            const response = await api.get(`/available-dates/${group_id}/`);
            const availableDates = response.data.reduce((acc: [], item: string) => {
                return [...acc, format(item, "YYYY-MM-DD")];
            }, []);
            set({ availableDates: availableDates, hasErrors: false });
        } catch (err) {
            set({ hasErrors: true, calendarIsActive: false });
        }
    },

    setGroup: (group: GroupTypes) => {
        set({ group: group });
    },
}));
