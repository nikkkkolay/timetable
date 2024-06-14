export type ChoiceTypes = {
    id: number;
    name: string;
};

export interface IStore {
    loading: boolean;
    hasErrors: boolean;
    modalSettingsIsActive: boolean;
    updateDate: string;
    faculties: [ChoiceTypes] | [];
    courses: [ChoiceTypes] | [];
    groups: [ChoiceTypes] | [];
    checkUpdateDate: () => void;
    getFaculties: () => void;
    getCourses: () => void;
    getGroups: (fac_id: number, course_id: number) => void;
    setModalSettingsIsActive: (state: boolean) => void;
}
