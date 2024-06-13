import { create } from "zustand";

interface Store {
    modalSettingsIsActive: boolean;
    setModalSettingsIsActive: (state: boolean) => void;
}

export const useStore = create<Store>((set) => ({
    modalSettingsIsActive: false,
    setModalSettingsIsActive: (state: boolean) => {
        set({ modalSettingsIsActive: state });
    },
}));
