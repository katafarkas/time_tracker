
import { Entry, Day } from "./Interfaces";

export const getWeekDays = (date: Date, entries: Entry[], isWeekView: boolean): Day[] => {
  const startOfWeek = new Date(date);
  const day = date.getDay();

  const diff = day === 0 ? -6 : day - 1;
  startOfWeek.setDate(date.getDate() + diff);

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i + (isWeekView ? 0 : 1));
    return {
      name: weekdays[i],
      date: day.toISOString().split("T")[0],
      entries: entries,
    };
  });
};




