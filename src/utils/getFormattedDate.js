import { differenceInDays, format, formatDistance } from "date-fns";

export const getFormattedDate = (date) => {
  if (!date) return "";
  const dateObj = new Date(date);
  const now = new Date();
  const daysDiff = differenceInDays(now, dateObj);
  
  if (daysDiff >= 7) return format(dateObj, "MMM dd, yyyy");
  return formatDistance(dateObj, now, { addSuffix: true });
};