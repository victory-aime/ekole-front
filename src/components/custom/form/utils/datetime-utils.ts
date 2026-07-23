import { CalendarDateTime, DateValue } from '@internationalized/date';

export const mergeDateAndTime = (date: Date, hours: number, minutes: number) => {
  return new CalendarDateTime(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    hours,
    minutes,
  );
};

export const formatTime = (date: CalendarDateTime) => {
  return `${String(date.hour).padStart(2, '0')}:${String(date.minute).padStart(2, '0')}`;
};

export const convertDate = (date: DateValue | null | undefined) => {
  if (!date) return null;

  return new Date(Date.UTC(date.year, date.month - 1, date.day, 0, 0, 0, 0));
};

export const convertArrayDate = (dates: (DateValue | null | undefined)[] = []): Date[] =>
  dates.flatMap((date) => (date ? [convertDate(date)] : []));
