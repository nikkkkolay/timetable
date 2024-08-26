import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, IconElement, NativeDateService, RangeCalendar, Button, Text, StyleType, CalendarRange } from "@ui-kitten/components";
import { useStore } from "../../store/useStore";
import { formatDate } from "../../helpers";
import { i18n } from "./i18n";

export type FormattedRangeTypes = {
    start: string | undefined;
    end: string | undefined;
};

const localeDateService = new NativeDateService("ru", {
    i18n,
    startDayOfWeek: 1,
});

const ArrowIcon = (): IconElement => <Icon style={styles.icon} name="chevron-right-outline" />;

const CalendarIcon = (arrowProps: any): IconElement => {
    return <Button onPress={arrowProps} style={styles.button} appearance="ghost" accessoryLeft={ArrowIcon}></Button>;
};

export const Calendar = () => {
    const range = useStore((state) => state.range);
    const setRange = useStore((state) => state.setRange);
    const { availableDates, group, rangeList, maxRange, getSchedule, getAvailableDates, createRangeList } = useStore((state) => state);
    const [formattedRange, setFormattedRange] = useState<FormattedRangeTypes>();

    const minDate = new Date(availableDates[0]);
    const maxDate = new Date(availableDates[availableDates.length - 1]);

    useEffect(() => {
        if (group && availableDates.length === 0) getAvailableDates(group.uid);
    }, [group, availableDates]);

    useEffect(() => {
        if (rangeList.length <= maxRange && formattedRange && formattedRange.start && formattedRange.end && group) {
            getSchedule(group.uid, formattedRange.start, formattedRange.end);
        }
    }, [rangeList]);

    const setSelectedRange = (nextRange: CalendarRange<Date>) => {
        setRange(nextRange);
        if (nextRange.startDate && nextRange.endDate) {
            const rangeStart = formatDate(nextRange.startDate);
            const rangeEnd = formatDate(nextRange.endDate);
            setFormattedRange({ start: rangeStart, end: rangeEnd });
            createRangeList(rangeStart, rangeEnd);
        }
    };

    const renderDay = (info: any, style: StyleType) => {
        const workDay = availableDates.includes(formatDate(info.date));
        const emptySchedule = info.date < maxDate || info.date < new Date();
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
            onSelect={(nextRange) => setSelectedRange(nextRange)}
            dateService={localeDateService}
            min={minDate}
            max={maxDate}
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
