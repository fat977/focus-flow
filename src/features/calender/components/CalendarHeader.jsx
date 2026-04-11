// components/calendar/CalendarHeader.jsx
import { Calendar as CalendarIcon } from "lucide-react";

export default function CalendarHeader({ taskCount = 0 }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-teal-500/10 rounded-lg">
            <CalendarIcon className="text-teal-500" size={24} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Tasks Schedule
          </h1>
        </div>
        <p className="text-(--grey-400) text-sm ml-11">
          You have{" "}
          <span className="text-teal-400 font-medium">{taskCount}</span> tasks
          scheduled for this season
        </p>
      </div>

      <div className="flex items-center gap-3 ml-11 md:ml-0">
        <div className="hidden sm:flex flex-col items-end mr-2">
          <span className="text-[10px] uppercase tracking-widest text-(--grey-500) font-bold">
            Current View
          </span>
          <span className="text-sm font-medium">
            Monthly Planner
          </span>
        </div>
      </div>
    </div>
  );
}
