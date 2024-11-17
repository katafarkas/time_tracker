export const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

export const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export interface Week {
    weekNumber: number;
    startDate: string;
    endDate: string;
    entries: Entry[];
    totalDuration: string;
}

export interface Project {
    id: string;
    name: string;
}

export interface Customer {
    id: string;
    name: string;
}

export interface Entry {
    id: string;
    name: string;
    project: string;
    customer: string;
    startTime: string;
    endTime: string;
    duration: string;
    date: string;
    createdAt: string;
}

export interface Day {
    name: string;
    date: string;
    entries: Entry[];
}
