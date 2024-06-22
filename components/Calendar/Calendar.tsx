import { useState, useEffect, useMemo } from "react";
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
    const [range, setRange] = useState<any>({});

    const { availableDates, group, getGroup } = useStore((state) => state);

    const startDate = new Date(availableDates[0]);
    const endDate = new Date(availableDates[availableDates.length - 1]);

    const filter = (date: Date): boolean => {
        const check = availableDates.includes(format(date, "YYYY-MM-DD"));
        return check;
    };

    const renderDay = (info: any, style: StyleType) => {
        const workDay = filter(info.date);
        const emptySchedule = info.date < endDate;

        return (
            <View style={[styles.dayContainer, style.container]}>
                <Text style={style.text}>{info.date.getDate()}</Text>
                {!workDay && emptySchedule && (
                    <View style={styles.dayOff}>
                        <Icon name="checkmark-circle-2-outline" fill={`${!workDay}` && "#ced5e0"} />
                    </View>
                )}
            </View>
        );
    };

    useEffect(() => {
        async function getDates() {
            await getGroup(group.name);
        }
        getDates();
    }, []);

    useEffect(() => {
        const rangeStart = range.startDate && format(range.startDate, "YYYY-MM-DD");
        const rangeEnd = range.endDate && format(range.endDate, "YYYY-MM-DD");

        console.log(rangeStart, rangeEnd, group.group_id);
    }, [range]);

    return (
        <RangeCalendar
            range={range}
            renderArrowRight={(arrowProps) => CalendarIcon(arrowProps.onPress)}
            onSelect={(nextRange) => setRange(nextRange)}
            dateService={localeDateService}
            min={startDate}
            max={endDate}
            boundingMonth={false}
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
        right: 4,
        top: 4,
        width: 12,
        height: 12,
    },
    button: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },
});
