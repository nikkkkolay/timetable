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

    const formattedMaxDate = format({ date: availableDates[availableDates.length - 1], format: "YYYY-MM-DDTHH:mm:ss", tz: "Europe/Moscow" });
    const formattedMinDate = format({ date: availableDates[0], format: "YYYY-MM-DDTHH:mm:ss", tz: "Europe/Moscow" });

    const selectionRange = (range: any) => {
        setRange(range);
        const rangeStart = range.startDate && format({ date: range.startDate, format: "YYYY-MM-DD", tz: "Europe/Moscow" });
        const rangeEnd = range.endDate && format({ date: range.endDate, format: "YYYY-MM-DD", tz: "Europe/Moscow" });

        if (rangeStart && rangeEnd && group) {
            createRangeList(rangeStart, rangeEnd);
            getSchedule(group.uid, rangeStart, rangeEnd);
        }
    };

    const renderDay = useCallback(
        (info: any, style: StyleType) => {
            const workDay = availableDates.includes(info.date);
            // console.log(maxDate);

            // const emptySchedule = info.date < maxDate || info.date < new Date();
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

    useEffect(() => {
        if (group && availableDates.length === 0) getAvailableDates(group.uid);
    }, [group]);

    return (
        <RangeCalendar
            range={range}
            renderArrowRight={(arrowProps) => CalendarIcon(arrowProps.onPress)}
            onSelect={(nextRange) => selectionRange(nextRange)}
            dateService={localeDateService}
            min={new Date(formattedMinDate)}
            max={new Date(formattedMaxDate)}
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
