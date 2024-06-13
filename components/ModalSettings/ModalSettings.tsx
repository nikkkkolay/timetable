import React, { ReactElement, useEffect } from "react";
import { StyleSheet, View, ImageProps } from "react-native";
import { Button, Card, Modal, Text, Spinner } from "@ui-kitten/components";
import { SelectSettings } from "../SelectSettings/SelectSettings";
import { useStore } from "../../store/useStore";

const LoadingIndicator = (props: ImageProps): ReactElement => (
    <View style={[props.style, styles.indicator]}>
        <Spinner size="small" />
    </View>
);

export const ModalSettings = (): ReactElement => {
    const { modalSettingsIsActive, setModalSettingsIsActive, setFaculties, faculties } = useStore((state) => state);

    useEffect(() => {
        setFaculties();
    }, []);

    return (
        <Modal visible={modalSettingsIsActive} backdropStyle={styles.backdrop} onBackdropPress={() => setModalSettingsIsActive(false)}>
            <Card disabled={true}>
                <View style={styles.container}>
                    <Text style={styles.title}>Настройки</Text>
                    <View style={styles.wrapper}>
                        <SelectSettings placeholder={"Выберите институт"} options={faculties} />
                        {/* <SelectSettings placeholder={"Выберите курс"} disabled />
                        <SelectSettings placeholder={"Выберите группу"} disabled /> */}
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
