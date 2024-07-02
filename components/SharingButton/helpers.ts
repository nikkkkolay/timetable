import { format } from "@formkit/tempo";

export const getDatesInRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let currentDate = start;
    const days = [];

    while (currentDate <= end) {
        days.push(format({ date: new Date(currentDate), format: "D", tz: "Europe/Moscow" }));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
};

export const getPairOrder = (pair: string) => {
    return ["09:00 - 10:35", "10:45 - 12:20", "12:40 - 14:15", "14:45 - 16:20", "16:30 - 18:05", "18:15 - 19:50", "20:00 - 21:35"].indexOf(pair);
};
