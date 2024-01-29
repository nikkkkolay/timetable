import { ImageBackground, StyleSheet } from "react-native";
import { Calendar } from "../components";

const bg = { uri: "./assets/bg.png" };

export const Timetable = () => {
    return (
        <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
            <Calendar />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0",
    },
});
