import { useState } from "react";
import { NativeDateService, RangeCalendar } from "@ui-kitten/components";
import { i18n } from "./i18n";

const localeDateService = new NativeDateService("ru", {
    i18n,
    startDayOfWeek: 1,
});

export const Calendar = () => {
    const [range, setRange] = useState({});

    return <RangeCalendar range={range} onSelect={(nextRange) => setRange(nextRange)} dateService={localeDateService} />;
};
