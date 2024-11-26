import dayjs from "dayjs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDuration = (date: string) => {
  const duration = dayjs().diff(dayjs(date), "second");

  if (duration < 60) {
    return `${duration}s`;
  } else if (duration < 3600) {
    return `${Math.floor(duration / 60)}m`;
  } else if (duration < 86400) {
    return `${Math.floor(duration / 3600)}h`;
  } else if (duration < 604800) {
    return `${Math.floor(duration / 86400)}d`;
  } else {
    return dayjs(date).format("DD/MM/YY");
  }
};
