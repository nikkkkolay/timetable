import { useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useStore } from "../../store/useStore";
import { Icon, IconElement, NativeDateService, RangeCalendar, Button, Text, StyleType } from "@ui-kitten/components";
import { i18n } from "./i18n";
import { format } from "@formkit/tempo";

const localeDateService = new NativeDateService("ru", {
    i18n,
    startDayOfWeek: 1,
});

const ArrowIcon = (): IconElement => <Icon style={styles.icon} name="chevron-right-outline" />;

const CalendarIcon = (arrowProps: any): IconElement => {
    return <Button onPress={arrowProps} style={styles.button} appearance="ghost" accessoryLeft={ArrowIcon}></Button>;
};

const formatDate = (date: string) => {
    let d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
};

export const Calendar = () => {
    const { availableDates, group, range, getSchedule, getAvailableDates, setRange } = useStore((state) => state);

    const startDate = new Date(availableDates[0]);
    const endDate = new Date(availableDates[availableDates.length - 1]);

    useEffect(() => {
        if (group && availableDates.length === 0) getAvailableDates(group.uid);
    }, [group]);

    const selectionRange = useCallback(
        (range: any) => {
            setRange(range);
            const rangeStart = range.startDate && format(range.startDate, "YYYY-MM-DD");
            const rangeEnd = range.endDate && format(range.endDate, "YYYY-MM-DD");
            if (rangeStart && rangeEnd && group) {
                getSchedule(group.uid, rangeStart, rangeEnd);
            }
        },
        [group, getSchedule, setRange]
    );

    const renderDay = useCallback(
        (info: any, style: StyleType) => {
            const workDay = availableDates.includes(formatDate(info.date));
            const emptySchedule = info.date < endDate || info.date < new Date();
            const date = new Date(info.date).getDate();

            return (
                <View style={[styles.dayContainer, style.container]}>
                    <Text style={style.text}>{date}</Text>
                    {!workDay && emptySchedule && (
                        <View style={styles.dayOff}>
                            <Icon name="checkmark-circle-2-outline" fill={`${!workDay}` && "#c8ceda"} />
                        </View>
                    )}
                </View>
            );
        },
        [availableDates]
    );

    return (
        <RangeCalendar
            range={range}
            renderArrowRight={(arrowProps) => CalendarIcon(arrowProps.onPress)}
            onSelect={(nextRange) => selectionRange(nextRange)}
            dateService={localeDateService}
            min={startDate}
            max={endDate}
            renderDay={renderDay}
        />
    );
};

const styles = StyleSheet.create({
    dayContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    icon: {
        width: 26,
        height: 26,
    },
    dayOff: {
        position: "absolute",
        right: 3,
        top: 3,
        width: 12,
        height: 12,
    },
    button: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },
});
