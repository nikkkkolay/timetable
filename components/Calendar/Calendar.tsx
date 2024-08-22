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

export const Calendar = () => {
    const { availableDates, group, range, rangeList, getSchedule, getAvailableDates, setRange, createRangeList } = useStore((state) => state);

    const maxRange = 14;
    const minDate = new Date(availableDates[0]);
    const maxDate = new Date(availableDates[availableDates.length - 1]);

    useEffect(() => {
        if (group && availableDates.length === 0) getAvailableDates(group.uid);
    }, [group]);

    useEffect(() => {
        if (rangeList.length > maxRange) {
            console.log("Это максимум");
        } else {
            const rangeStart = range.startDate && format({ date: range.startDate, format: "YYYY-MM-DD" });
            const rangeEnd = range.endDate && format({ date: range.endDate, format: "YYYY-MM-DD" });
            if (rangeStart && rangeEnd && group) {
                getSchedule(group.uid, rangeStart, rangeEnd);
            }
        }
    }, [rangeList]);

    const selectionRange = (range: any) => {
        setRange(range);
        const rangeStart = range.startDate && format({ date: range.startDate, format: "YYYY-MM-DD" });
        const rangeEnd = range.endDate && format({ date: range.endDate, format: "YYYY-MM-DD" });
        createRangeList(rangeStart, rangeEnd);
    };

    const renderDay = useCallback(
        (info: any, style: StyleType) => {
            const workDay = availableDates.includes(info.date);

            const emptySchedule = info.date < maxDate || info.date < new Date();

            const date = new Date(info.date).toLocaleString("ru-RU", { timeZone: "Europe/Moscow", day: "numeric" });

            return (
                <View style={[styles.dayContainer, style.container]}>
                    <Text style={style.text}>{date}</Text>
                    {!workDay && (
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
            min={minDate}
            max={maxDate}
            // renderDay={renderDay}
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
