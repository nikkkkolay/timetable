import { View, Text, StyleSheet } from "react-native";
import { Header, Calendar, Container, BottomSheetComponent } from "../components";

export const Timetable = () => {
    return (
        <>
            <Container>
                <View>
                    <Header />
                    <Calendar />
                </View>
            </Container>
            <BottomSheetComponent>
                <View style={styles.contentContainer}>
                    <Text>Awesome 🎉</Text>
                </View>
            </BottomSheetComponent>
        </>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#008cfa",
    },
});
