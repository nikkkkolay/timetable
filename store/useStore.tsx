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

    setFaculties: async () => {
        const response = await api.get(`/faculties`);
        set({
            faculties: response.data.map((fac: { fac_id: number; facultee: string }) => ({
                id: fac.fac_id,
                name: fac.facultee,
            })),
        });
    },

    setCourses: async () => {
        const response = await api.get(`/courses`);
        set(() => ({ courses: response.data }));
    },

    setGroups: async (fac_id: number, course_id: number) => {
        const response = await api.get(`/groups/${fac_id}/${course_id}`);
        set(() => ({ groups: response.data }));
    },
}));
