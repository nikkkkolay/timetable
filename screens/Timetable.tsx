import { View, ImageBackground, StyleSheet } from "react-native";
import { Header, Calendar, Container } from "../components";

const bg = { uri: "./assets/bg.png" };

export const Timetable = () => {
    return (
        <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
            <Container>
                <Header />
                <Calendar />
            </Container>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
});
