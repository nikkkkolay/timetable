import React, { ReactElement, useEffect, useState } from "react";
import { StyleSheet, View, ImageProps } from "react-native";
import { Button, Card, Modal, Text, Spinner, Select, IndexPath, SelectItem } from "@ui-kitten/components";
import { ChoiceTypes } from "../../store/useStore.types";
import { useStore } from "../../store/useStore";

interface ISettings {
    fac_id: number;
    course_id: number;
}

const LoadingIndicator = (props: ImageProps): ReactElement => (
    <View style={[props.style, styles.indicator]}>
        <Spinner size="small" />
    </View>
);

export const ModalSettings = (): ReactElement => {
    const { setModalSettingsIsActive, getFaculties, getCourses, getGroups, faculties, courses, groups, modalSettingsIsActive, hasErrors } = useStore(
        (state) => state
    );

    const [selectedIndexFaculty, setSelectedIndexFaculty] = useState<IndexPath>();
    const [selectedIndexCourse, setSelectedIndexCourse] = useState<IndexPath>();
    const [selectedIndexGroup, setSelectedIndexGroup] = useState<IndexPath>();

    const [selectedSettings, setSelectedSettings] = useState<ISettings | any>({});

    const settingsState = Object.keys(selectedSettings).length;

    const saveGroup = async () => {
        setModalSettingsIsActive(!modalSettingsIsActive);
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
                            disabled={!settingsState}
                        >
                            {courses && courses.map((course: ChoiceTypes) => <SelectItem title={course.name} key={course.id} />)}
                        </Select>
                        <Select
                            placeholder={"Выберите группу"}
                            value={selectedIndexGroup && groups[selectedIndexGroup.row].name}
                            selectedIndex={selectedIndexGroup}
                            onSelect={(index: any) => setSelectedIndexGroup(index)}
                            disabled={!selectedSettings.course_id}
                        >
                            {groups && groups.map((group: ChoiceTypes) => <SelectItem title={group.name} key={group.id} />)}
                        </Select>

                        <Button
                            style={styles.button}
                            onPress={() => saveGroup}
                            // accessoryLeft={LoadingIndicator}
                        >
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
        marginBottom: 12,
    },
    button: {
        marginTop: 10,
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        width: 250,
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
