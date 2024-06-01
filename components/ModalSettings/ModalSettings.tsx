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
                    <Text style={styles.title} category="h6">
                        Настройки
                    </Text>
                    <View style={styles.wrapper}>
                        <SelectSettings />
                        <SelectSettings />
                        <SelectSettings />
                        <Button
                            style={styles.button}
                            onPress={() => setVisible(!visible)}
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    title: {
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
