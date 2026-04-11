import { ActionsDropdown } from "@/components/ui/Dropdown";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  MessageSquare
} from "lucide-react";
import { getDeadlineInfo } from "../../../utils/getDeadlineInfo";
import { getFormattedDate } from "../../../utils/getFormattedDate";
import { priorityStyles } from "../../../utils/statusStyle";
import BoardDates from "../../boards/components/BoardDates";
import { TaskProvider } from "../context/TaskProvider";
import { TaskDragHandle } from "./TaskDragHandle";

export default function TaskCard({ task, openModal }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: "task", task },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const deadline = getDeadlineInfo(task.dueDate);
  const createdDate = getFormattedDate(task.createdAt);

  return (
    <TaskProvider task={task}>
      <div
        ref={setNodeRef}
        style={style}
        className={`
          group relative bg-(--grey-50) p-4 rounded-xl shadow-sm border transition-all duration-200
          hover:border-(--brand-500) hover:shadow-md
          flex flex-col gap-3 mx-4
          ${
            isDragging
              ? "opacity-30 border-(--brand-600)  ring-2 ring-(--brand-400)"
              : "border-(--grey-200)"
          }
        `}
      >
        <div className="flex items-center justify-between gap-2">
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase ${
              priorityStyles[task.priority] || "text-(--grey-50)"
            }`}
          >
            {task.priority}
          </span>
          <ActionsDropdown
            onEdit={() => openModal("edit-task", task)}
            onDelete={() => openModal("delete-task", task)}
            editLabel="Edit Task"
            deleteLabel="Delete Task"
          />
        </div>

        <div className="flex items-center">
          <TaskDragHandle attributes={attributes} listeners={listeners} />

          <div className="flex-1">
            <div className="flex items-center justify-between  w-full mb-1">
              <p className="text-sm truncate font-semibold text-(--text-main) ">
                {task.title}
              </p>
            </div>
          </div>
        </div>
        {task.description && (
          <div className="flex items-start gap-2 text-xs text-(--text-main)  p-2 rounded-lg border border-dashed border-(--grey-200)">
            <MessageSquare size={12} className="mt-0.5 shrink-0" />
            <p className="line-clamp-2 italic truncate">{task.description}</p>
          </div>
        )}

        {/* شبكة التواريخ (Deadline & Created) */}
        {/*  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-(--text-muted) uppercase font-extrabold tracking-wider">
              Deadline
            </span>
            <div
              className={`flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-md border ${deadline.style}`}
            >
              <CalendarDays size={12} />
              <span className="truncate font-medium">{deadline.text}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-(--text-muted) uppercase font-extrabold tracking-wider">
              Created
            </span>
            <div className="flex items-center gap-1.5 text-[10px] px-2 py-1 text-(--grey-50) rounded-md border border-slate-100">
              <Calendar size={12} />
              <span className="truncate font-medium">{createdDate}</span>
            </div>
          </div>
        </div> */}
        <BoardDates deadline={deadline} created={createdDate} />
      </div>
    </TaskProvider>
  );
}
