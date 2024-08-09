import { format } from "@formkit/tempo";

export const getDatesInRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let currentDate = start;
    const days = [];

    while (currentDate <= end) {
        days.push(format({ date: new Date(currentDate), format: "YYYY-MM-DDTHH:mm:ssZ", tz: "Europe/Moscow" }));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
};
