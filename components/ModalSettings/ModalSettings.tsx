import React, { ReactElement, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Card, Modal, Text, Select, IndexPath, SelectItem } from "@ui-kitten/components";
import { ChoiceTypes } from "../../store/useStore.types";
import { useStore } from "../../store/useStore";

interface ISettings {
    fac_id: number;
    course_id: number;
}

export const ModalSettings = (): ReactElement => {
    const {
        setModalSettingsIsActive,
        setCalendarIsActive,
        getFaculties,
        getCourses,
        getGroups,
        setGroup,
        getCurrentSchedule,
        getAvailableDates,
        faculties,
        courses,
        groups,
        modalSettingsIsActive,
    } = useStore((state) => state);

    const groupSelect = useRef<any>();

    const [selectedIndexFaculty, setSelectedIndexFaculty] = useState<IndexPath>();
    const [selectedIndexCourse, setSelectedIndexCourse] = useState<IndexPath>();
    const [selectedIndexGroup, setSelectedIndexGroup] = useState<IndexPath>();

    const [selectedSettings, setSelectedSettings] = useState<ISettings | any>({});

    const settingsState = Object.keys(selectedSettings).length;

    const saveGroup = async () => {
        if (selectedIndexGroup) {
            const group = {
                group_id: groups[selectedIndexGroup.row].id,
                name: groups[selectedIndexGroup.row].name,
                specialty: groups[selectedIndexGroup.row].specialty,
            };
            await setModalSettingsIsActive(!modalSettingsIsActive);
            await AsyncStorage.setItem("group", JSON.stringify(group));
            const value = await AsyncStorage.getItem("group");
            if (value !== null) {
                await setCalendarIsActive(false);
                await setGroup(JSON.parse(value));
                // await getCurrentSchedule(JSON.parse(value).group_id);
                // await getAvailableDates(JSON.parse(value).group_id);
            }
        }
    };

    useEffect(() => {
        if (modalSettingsIsActive && !settingsState) {
            getFaculties();
            getCourses();
        }
    }, [modalSettingsIsActive]);

    useEffect(() => {
        if (selectedIndexFaculty) {
            setSelectedSettings((prev: ISettings) => ({ ...prev, fac_id: faculties[selectedIndexFaculty.row].id }));
        }

        if (selectedIndexCourse) {
            setSelectedSettings((prev: ISettings) => ({ ...prev, course_id: courses[selectedIndexCourse.row].id }));
        }
        if (selectedIndexGroup) {
            groupSelect.current?.clear();
        }
    }, [selectedIndexFaculty, selectedIndexCourse]);

    useEffect(() => {
        if (selectedSettings.fac_id && selectedSettings.course_id) {
            getGroups(selectedSettings.fac_id, selectedSettings.course_id);
        }
    }, [selectedSettings]);

    return (
        <Modal visible={modalSettingsIsActive} backdropStyle={styles.backdrop} onBackdropPress={() => setModalSettingsIsActive(false)}>
            <Card disabled={true}>
                <View style={styles.container}>
                    <Text style={styles.title}>Настройки</Text>
                    <View style={styles.wrapper}>
                        <Select
                            placeholder={"Выберите институт"}
                            value={selectedIndexFaculty && faculties[selectedIndexFaculty.row].name}
                            selectedIndex={selectedIndexFaculty}
                            onSelect={(index: any) => setSelectedIndexFaculty(index)}
                        >
                            {faculties && faculties.map((faculty: ChoiceTypes) => <SelectItem title={faculty.name} key={faculty.id} />)}
                        </Select>
                        <Select
                            placeholder={"Выберите курс"}
                            value={selectedIndexCourse && courses[selectedIndexCourse.row].name}
                            selectedIndex={selectedIndexCourse}
                            onSelect={(index: any) => setSelectedIndexCourse(index)}
                            disabled={!selectedIndexFaculty}
                        >
                            {courses && courses.map((course: ChoiceTypes) => <SelectItem title={course.name} key={course.id} />)}
                        </Select>
                        <Select
                            placeholder={"Выберите группу"}
                            value={selectedIndexGroup && groups[selectedIndexGroup.row].name}
                            selectedIndex={selectedIndexGroup}
                            onSelect={(index: any) => setSelectedIndexGroup(index)}
                            disabled={!selectedIndexCourse}
                            ref={groupSelect}
                        >
                            {groups && groups.map((group: ChoiceTypes) => <SelectItem title={group.name} key={group.id} />)}
                        </Select>

                        <Button style={styles.button} onPress={() => saveGroup()} disabled={!selectedIndexGroup}>
                            Сохранить
                        </Button>
                    </View>
                </View>
            </Card>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    title: {
        fontSize: 18,
        marginBottom: 8,
    },
    button: {
        marginTop: 5,
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        width: 250,
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    wrapper: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: "100%",
    },
    indicator: {
        justifyContent: "center",
        alignItems: "center",
    },
});
