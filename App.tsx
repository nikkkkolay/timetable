import React, { useState } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text, I18nConfig, NativeDateService, RangeCalendar, Spinner } from "@ui-kitten/components";
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

const TimetableScreen = () => {
    const [date, setDate] = useState(new Date());
    const [range, setRange] = React.useState({});

    return (
        <Layout style={{ flex: 1, alignItems: "center" }}>
            <RangeCalendar range={range} onSelect={(nextRange) => setRange(nextRange)} dateService={localeDateService} />
            <Spinner status="primary" />
        </Layout>
    );
};

export default () => (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <TimetableScreen />
    </ApplicationProvider>
);
