import { useState } from "react";
import { Text, I18nConfig, NativeDateService, RangeCalendar } from "@ui-kitten/components";
import { View, StyleSheet } from "react-native";

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

export const Calendar = () => {
    const [range, setRange] = useState({});

    const renderDay = (date: any, info: any) => {
        // console.log(date.date);
        console.log(range.startDate);
        console.log(range.endDate);

        const style = info.selected ? styles.selectedDay : styles.defaultDay;
        return (
            <View style={style}>
                <Text>{99}</Text>
            </View>
        );
    };

    return <RangeCalendar range={range} renderDay={renderDay} onSelect={(nextRange) => setRange(nextRange)} dateService={localeDateService} />;
};

const styles = StyleSheet.create({
    defaultDay: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    selectedDay: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
    },
});
