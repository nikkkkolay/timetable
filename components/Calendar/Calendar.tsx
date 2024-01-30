import { useState } from "react";
import { Text, I18nConfig, NativeDateService, RangeCalendar } from "@ui-kitten/components";

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

    return (
        <RangeCalendar
            style={{ width: "100%", paddingTop: 0, borderColor: "background: rgba(0,0,0, 0)" }}
            range={range}
            onSelect={(nextRange) => setRange(nextRange)}
            dateService={localeDateService}
        />
    );
};
