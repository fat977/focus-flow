import {
  differenceInDays,
  format,
  formatDistance,
  isPast,
  isToday,
} from "date-fns";
import { statusColors } from "./statusStyle";


export const getDeadlineInfo = (dueDate) => {
  if (!dueDate)
    return {
      text: "No deadline",
      style: statusColors.grey, 
      isOverdue: false,
    };

  const dateObj = new Date(dueDate);
  const now = new Date();
  const isOverdue = isPast(dateObj) && !isToday(dateObj);
  const daysDiff = Math.abs(differenceInDays(now, dateObj));

  let style = statusColors.brand; 
  
  if (isOverdue) {
    style = statusColors.danger; 
  } else if (daysDiff <= 2) {
    style = statusColors.warning; 
  }

  return {
    text:
      daysDiff >= 7
        ? format(dateObj, "MMM dd, yyyy")
        : formatDistance(dateObj, now, { addSuffix: true }),
    style,
    isOverdue,
  };
};