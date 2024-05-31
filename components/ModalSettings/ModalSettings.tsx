import React from "react";
import { StyleSheet, View, ImageProps } from "react-native";
import { Button, Card, Modal, Text, Spinner } from "@ui-kitten/components";
import { SelectSettings } from "../SelectSettings/SelectSettings";

const LoadingIndicator = (props: ImageProps): React.ReactElement => (
    <View style={[props.style, styles.indicator]}>
        <Spinner size="small" />
    </View>
);

interface Props {
    visible: boolean;
    setVisible: (state: boolean) => void;
}

export const ModalSettings = ({ visible, setVisible }: Props): React.ReactElement => {
    return (
        <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={() => setVisible(false)}>
            <Card disabled={true}>
                <View style={styles.container}>
                    <Text style={styles.title}>Настройки</Text>
                    <SelectSettings />
                    <SelectSettings />
                    <SelectSettings />
                    <Button onPress={() => setVisible(!visible)} accessoryLeft={LoadingIndicator}>
                        Сохранить
                    </Button>
                </View>
            </Card>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    title: {
        fontWeight: "600",
        fontSize: 16,
        marginBottom: 12,
    },
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: 240,
    },
    indicator: {
        justifyContent: "center",
        alignItems: "center",
    },
});
