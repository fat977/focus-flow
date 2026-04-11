// components/calendar/DailyTasksSidebar.jsx
import { getDeadlineInfo } from "../../../utils/getDeadlineInfo";
import { priorityStyles } from "../../../utils/statusStyle";

export default function DailyTasksSidebar({
  selectedDate,
  tasks,
  onTaskClick,
}) {
  return (
    <div className="lg:col-span-1 space-y-6">
      <div className=" p-6 rounded-3xl border border-white/5 h-fit">
        <h2 className="text-xl font-bold  mb-6 flex items-center gap-2">
          <div className="w-2 h-6 bg-teal-500 rounded-full"></div>
          {selectedDate ? `Tasks: ${selectedDate}` : "Select a day"}
        </h2>

        <div className="space-y-4 max-h-125 overflow-y-auto pr-2 custom-scrollbar">
          {tasks.length > 0 ? (
            tasks.map((task) => {
              const deadline = getDeadlineInfo(task.dueDate || task.due_date);
              return (
                <div
                  key={task.id}
                  className={`group p-4 rounded-2xl border transition-all cursor-pointer bg-white/5 ${
                    deadline.isOverdue
                      ? "border-red-500/30 bg-red-500/5"
                      : "border-white/5 hover:border-teal-500/30"
                  }`}
                  onClick={() => onTaskClick(task)}
                >
                  <p className="font-medium text-gray-100 group-hover:text-teal-400 mb-2">
                    {task.title}
                  </p>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-gray-500 uppercase">
                      {task.priority || "low"}
                    </span>
                    <div
                      className={`h-2 w-2 rounded-full ${priorityStyles[task.priority]}`}
                    />
                  </div>
                  <span className="text-[10px] text-gray-400">
                    Due: {deadline.text}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 text-gray-500 italic text-sm">
              No tasks for this day
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
