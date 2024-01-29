import React, { useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Text, I18nConfig, NativeDateService, RangeCalendar, Spinner } from "@ui-kitten/components";
import { default as theme } from "./custom-theme.json";

const i18n: I18nConfig = {
    dayNames: {
        short: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        long: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    },
    monthNames: {
        short: ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        long: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    },
};

const localeDateService = new NativeDateService("ru", { i18n, startDayOfWeek: 1 });

const bg = { uri: "./assets/bg.png" };

const TimetableScreen = () => {
    const [date, setDate] = useState(new Date());
    const [range, setRange] = React.useState({});

    return (
        <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
            <Text status="warning">Success</Text>
            <RangeCalendar
                style={{ width: "100%", borderColor: "background: rgba(0,0,0, 0)" }}
                range={range}
                onSelect={(nextRange) => setRange(nextRange)}
                dateService={localeDateService}
            />
            <Spinner status="warning" />
        </ImageBackground>
    );
};

export default () => (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <TimetableScreen />
    </ApplicationProvider>
);

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
