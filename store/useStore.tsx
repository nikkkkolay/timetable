import { api } from "../http";
import { create } from "zustand";
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
    group: { group_id: 0, name: "", specialty: "" },
    currentSchedule: [],

    setModalSettingsIsActive: (state: boolean) => {
        set({ modalSettingsIsActive: state });
    },

    setCalendarIsActive: (state: boolean) => {
        set({ calendarIsActive: state });
    },

    checkUpdateDate: async () => {
        set({ loading: true });
        try {
            const response = await api.get(`/`);
            set({ updateDate: response.data[0].download, loading: false });
        } catch (err) {
            set({ hasErrors: true, loading: false });
        }
    },

    getFaculties: async () => {
        set({ loading: true });
        try {
            const response = await api.get(`/faculties`);
            set({
                faculties: response.data.map((fac: { fac_id: number; facultee: string }) => ({
                    id: fac.fac_id,
                    name: fac.facultee,
                })),
                loading: false,
            });
        } catch (err) {
            set({ hasErrors: true, loading: false });
        }
    },

    getCourses: async () => {
        const response = await api.get(`/courses`);
        set({
            courses: response.data.map((course: { course_id: number; course: string }) => ({
                id: course.course_id,
                name: course.course,
            })),
        });
    },

    getGroups: async (fac_id: number, course_id: number) => {
        set({ loading: true });
        try {
            const response = await api.get(`/groups/${fac_id}/${course_id}`);
            set({
                groups: response.data.map((group: { group_id: number; group: string; speciality: string }) => ({
                    id: group.group_id,
                    name: group.group,
                    specialty: group.speciality,
                })),
                loading: false,
            });
        } catch (err) {
            set({ hasErrors: true, loading: false });
        }
    },

    getCurrentSchedule: async (group_id: number) => {
        set({ fetchingTimetable: true });
        try {
            const response = await api.get(`/current-schedule/${group_id}`);
            set({ currentSchedule: response.data, fetchingTimetable: false });
        } catch (err) {
            set({ hasErrors: true, fetchingTimetable: false });
        }
    },

    setGroup: (group: GroupTypes) => {
        set({ group: group });
    },
}));
