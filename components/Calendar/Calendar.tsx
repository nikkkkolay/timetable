import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useStore } from "../../store/useStore";
import { Icon, IconElement, NativeDateService, RangeCalendar, Button } from "@ui-kitten/components";
import { i18n } from "./i18n";

const localeDateService = new NativeDateService("ru", {
    i18n,
    startDayOfWeek: 1,
});

const ArrowIcon = (): IconElement => <Icon style={styles.icon} name="chevron-right-outline" />;

const CalendarIcon = (arrowProps: any): IconElement => {
    return <Button onPress={arrowProps} style={styles.button} appearance="ghost" accessoryLeft={ArrowIcon}></Button>;
};

export const Calendar = () => {
    const [range, setRange] = useState({});
    const { availableDates } = useStore((state) => state);

    const yesterday = new Date(availableDates[0]);
    const tomorrow = new Date(availableDates[1]);

    useEffect(() => {
        console.log(availableDates);
    }, []);

    // useEffect(() => {
    //     console.log(range.startDate, range.endDate);
    // }, [range]);

    return (
        <RangeCalendar
            range={range}
            renderArrowRight={(arrowProps) => CalendarIcon(arrowProps.onPress)}
            onSelect={(nextRange) => setRange(nextRange)}
            dateService={localeDateService}
            min={yesterday}
            max={tomorrow}
        />
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },
    button: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },
});
