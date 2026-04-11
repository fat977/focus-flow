import { Calendar, CalendarDays } from "lucide-react";

const BoardDates = ({ deadline, created }) => (
  <div className="grid grid-cols-2 gap-4 border-t border-(--grey-200) pt-4">
    <div className="flex flex-col gap-1">
      <span className="text-[9px] text-(--grey-400) uppercase font-bold tracking-tight">Deadline</span>
      <div className={`flex items-center gap-1.5 text-[10px] p-1.5 rounded-lg border ${deadline.style}`}>
        <CalendarDays size={14} />
        <span className="truncate">{deadline.text}</span>
      </div>
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-[9px] text-(--grey-400) uppercase font-bold tracking-tight">Created</span>
      <div className="flex items-center gap-1.5 text-[10px] text-(--text-muted) p-1.5 bg-(--grey-50) rounded-lg border border-(--grey-100)">
        <Calendar size={14} />
        <span className="truncate">{created}</span>
      </div>
    </div>
  </div>
);
export default BoardDates