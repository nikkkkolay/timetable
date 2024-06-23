import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { format } from "@formkit/tempo";
import { useStore } from "../../store/useStore";
import { Icon, IconElement, NativeDateService, RangeCalendar, Button, Text, StyleType } from "@ui-kitten/components";
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
    const { availableDates, group, range, hasErrors, getGroup, getSchedule, setRange } = useStore((state) => state);

    const startDate = new Date(availableDates[0]);
    const endDate = new Date(availableDates[availableDates.length - 1]);

    useEffect(() => {
        const rangeStart = range.startDate && format(range.startDate, "YYYY-MM-DD");
        const rangeEnd = range.endDate && format(range.endDate, "YYYY-MM-DD");
        if (rangeStart && rangeEnd && group.group_id) {
            getGroup(group.name);
            getSchedule(group.group_id, rangeStart, rangeEnd);
        }
        if (hasErrors) {
            setRange({ startDate: null, endDate: null });
        }
    }, [range, hasErrors]);

    const filter = (date: Date): boolean => {
        const check = availableDates.includes(format(date, "YYYY-MM-DD"));
        return check;
    };

    const renderDay = (info: any, style: StyleType) => {
        const workDay = filter(info.date);
        const emptySchedule = info.date < endDate || info.date < new Date();

        return (
            <View style={[styles.dayContainer, style.container]}>
                <Text style={style.text}>{info.date.getDate()}</Text>
                {!workDay && emptySchedule && (
                    <View style={styles.dayOff}>
                        <Icon name="checkmark-circle-2-outline" fill={`${!workDay}` && "#c8ceda"} />
                    </View>
                )}
            </View>
        );
    };

    return (
        <RangeCalendar
            range={range}
            renderArrowRight={(arrowProps) => CalendarIcon(arrowProps.onPress)}
            onSelect={(nextRange) => setRange(nextRange)}
            dateService={localeDateService}
            min={startDate}
            max={endDate}
            // boundingMonth={false}
            renderDay={renderDay}
            filter={filter}
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
        width: 10,
        height: 10,
    },
    button: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },
});
