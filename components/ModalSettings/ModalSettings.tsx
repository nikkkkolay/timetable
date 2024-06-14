import React, { ReactElement, useEffect, useState } from "react";
import { StyleSheet, View, ImageProps } from "react-native";
import { Button, Card, Modal, Text, Spinner, Select, IndexPath, SelectItem } from "@ui-kitten/components";
import { ChoiceTypes } from "../../store/useStore.types";
import { useStore } from "../../store/useStore";

const LoadingIndicator = (props: ImageProps): ReactElement => (
    <View style={[props.style, styles.indicator]}>
        <Spinner size="small" />
    </View>
);

export const ModalSettings = (): ReactElement => {
    const { modalSettingsIsActive, setModalSettingsIsActive, getFaculties, getCourses, faculties, courses } = useStore((state) => state);

    const [selectedIndexFaculty, setSelectedIndexFaculty] = useState<IndexPath>();
    const [selectedIndexCourse, setSelectedIndexCourse] = useState<IndexPath>();
    const [selectedIndexGroup, setSselectedIndexGroup] = useState<IndexPath>();

    const [selectedFaculty, setSelecteFaculty] = useState<ChoiceTypes>();
    const [selectedCourse, setSelecteCourse] = useState<ChoiceTypes>();

    useEffect(() => {
        getFaculties();
        getCourses();
    }, []);

    useEffect(() => {
        if (selectedIndexFaculty) {
            setSelecteFaculty({
                name: faculties[selectedIndexFaculty.row].name,
                id: faculties[selectedIndexFaculty.row].id,
            });
        }

        if (selectedIndexCourse) {
            setSelecteCourse({
                name: courses[selectedIndexCourse.row].name,
                id: courses[selectedIndexCourse.row].id,
            });
        }
    }, [selectedIndexFaculty, selectedIndexCourse]);

    console.log(selectedCourse, selectedFaculty);

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
                            {faculties.map((faculty: ChoiceTypes) => (
                                <SelectItem title={faculty.name} key={faculty.id} />
                            ))}
                        </Select>
                        <Select
                            placeholder={"Выберите курс"}
                            value={selectedIndexCourse && courses[selectedIndexCourse.row].name}
                            selectedIndex={selectedIndexCourse}
                            onSelect={(index: any) => setSelectedIndexCourse(index)}
                            disabled={!selectedFaculty}
                        >
                            {courses.map((course: ChoiceTypes) => (
                                <SelectItem title={course.name} key={course.id} />
                            ))}
                        </Select>
                        <Button
                            style={styles.button}
                            onPress={() => setModalSettingsIsActive(!modalSettingsIsActive)}
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
