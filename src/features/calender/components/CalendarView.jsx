// components/calendar/CalendarView.jsx
import Calendar from "react-calendar";
import { format } from "date-fns";
import { priorityDotStyles } from "../../../utils/statusStyle";

export default function CalendarView({ tasks, onDayClick, onTaskClick }) {
  const renderTileContent = ({ date, view }) => {
    if (view === "month" && tasks) {
      const calendarDate = format(date, "yyyy-MM-dd");
      const dayTasks = tasks.filter(
        (t) => (t.dueDate || t.due_date)?.substring(0, 10) === calendarDate
      );

      return (
        <div className="flex flex-col gap-1 w-full mt-1 overflow-hidden">
          {dayTasks.map((task) => (
            <div
              key={task.id}
              onClick={(e) => {
                e.stopPropagation();
                onTaskClick(task);
              }}
              className="flex justify-center items-center gap-1.5 px-1 truncate cursor-pointer hover:bg-white/5 rounded transition-all"
            >
              <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${priorityDotStyles[task.priority] || priorityDotStyles.low}`} />
              <span className="truncate text-[9px] text-(--grey-400)">{task.title}</span>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="lg:col-span-3  p-4 rounded-3xl border border-white/5 shadow-2xl">
      <Calendar
        tileContent={renderTileContent}
        className="custom-react-calendar"
        onClickDay={onDayClick}
      />
    </div>
  );
}