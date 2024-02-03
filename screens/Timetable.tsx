import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
    Header,
    Calendar,
    Container,
    BottomSheetComponent,
} from "../components";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const Timetable = () => {
    return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Container>
                    <Header />
                    <Calendar />
                </Container>
                <BottomSheetComponent>
                    <Container style={styles.contentContainer}>
                        <Text>Awesome 🎉</Text>
                    </Container>
                </BottomSheetComponent>
            </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#008cfa",
    },
});
