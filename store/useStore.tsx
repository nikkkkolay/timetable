import { api } from "../http";
import { create } from "zustand";
import { IStore } from "./useStore.types";

export const useStore = create<IStore>((set) => ({
    modalSettingsIsActive: false,
    hasErrors: false,
    loading: false,
    updateDate: "",
    faculties: [],
    courses: [],
    groups: [],

    setModalSettingsIsActive: (state: boolean) => {
        set({ modalSettingsIsActive: state });
    },

    checkUpdateDate: async () => {
        set(() => ({ loading: true }));
        try {
            const response = await api.get(`/`);
            set(() => ({ updateDate: response.data[0].download, loading: false }));
        } catch (err) {
            set(() => ({ hasErrors: true, loading: false }));
        }
    },

    getFaculties: async () => {
        const response = await api.get(`/faculties`);
        set({
            faculties: response.data.map((fac: { fac_id: number; facultee: string }) => ({
                id: fac.fac_id,
                name: fac.facultee,
            })),
        });
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
        const response = await api.get(`/groups/${fac_id}/${course_id}`);
        set({
            groups: response.data.map((group: { group_id: number; group: string }) => ({
                id: group.group_id,
                name: group.group,
            })),
        });
    },
}));
