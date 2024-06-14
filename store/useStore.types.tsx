export type ChoiceTypes = {
    id: number;
    name: string;
};

export type GroupTypes = {
    id_group: number;
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
    group: GroupTypes | {};
    checkUpdateDate: () => void;
    getFaculties: () => void;
    getCourses: () => void;
    getGroups: (fac_id: number, course_id: number) => void;
    setGroup: (group: GroupTypes) => void;
    setModalSettingsIsActive: (state: boolean) => void;
}
