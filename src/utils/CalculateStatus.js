
export function calculateHealthStatus(created_at, dueDate, progressPercent) {
  const today = new Date();
  const start = new Date(created_at);
  const end = new Date(dueDate);

  if (progressPercent >= 100) return "Completed";

  if (isNaN(start) || isNaN(end) || start >= end) return "Invalid Dates";

  if (today < start) return "Planned";

  if (today > end) return "Delayed";

  const totalDuration = end - start;
  const timePassed = today - start;
  const timeElapsedPercent = (timePassed / totalDuration) * 100;


  const lag = timeElapsedPercent - progressPercent;
  if (progressPercent === 0) return "Not Started";
  if (lag <= 0) {
    return "On Track";
  } else if (lag > 0 && lag <= 20) {
    return "At Risk";
  } else {
    return "Delayed";
  }
}
