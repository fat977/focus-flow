import { useSelector } from "react-redux";
import { calculateHealthStatus } from "../../../../utils/CalculateStatus";
import { calculateProgress } from "../../../../utils/calculateProgress";
import { getDeadlineInfo } from "../../../../utils/getDeadlineInfo.js";
import { useBoards } from "../../../boards/hooks/useBoards";
import { statusColors, statusSettings } from "../../../../utils/statusStyle.js";
import {
  CheckCircle2,
  PlayCircle,
  AlertTriangle,
  XCircle,
  Clock,
} from "lucide-react";
function ProjectStatus() {
  const userId = useSelector((state) => state.auth.user?.uid);
  const { data: boards } = useBoards(userId);
  return (
    <div className="w-full">
      {/* Project Status */}
      <div className="lg:col-span-2 rounded-2xl bg-(--grey-50) border border-(--grey-200) p-5 space-y-4">
        <h3 className="text-lg font-semibold text-(--text-main)">Project Status</h3>

        {boards?.map((board) => {
          const progress = calculateProgress(board.lists);
          const statusKey = calculateHealthStatus(
            board.created_at,
            board.dueDate,
            progress,
          );
          const deadline = getDeadlineInfo(board.dueDate);

         
          const config =
            statusSettings[statusKey] || statusSettings["Not Started"];
          return (
            <ProjectItem
            key={board.id}
              board={board}
              deadline={deadline}
              config={config}
              progress={progress}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProjectStatus;

const iconMap = {
  check: <CheckCircle2 size={18} />,
  play: <PlayCircle size={18} />,
  alert: <AlertTriangle size={18} />,
  x: <XCircle size={18} />,
  clock: <Clock size={18} />,
};

function ProjectItem({ board, config, progress, deadline }) {
  const colorClasses = statusColors[config.color] || statusColors.grey;

  const Icon = iconMap[config.iconName];

  return (
    <div className="rounded-xl bg-(--grey-0) border border-(--grey-100) p-4 space-y-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={colorClasses
              .split(" ")
              .filter((c) => c.startsWith("text-"))
              .join(" ")}
          >
            {Icon}
          </span>
          <h3 className="font-semibold text-(--text-main)">{board.title}</h3>
        </div>

        <span
          className={` text-sm px-2 py-0.5 border rounded-full flex items-center gap-1 w-fit${colorClasses}`}
        >
          {config.label}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm text-(--text-muted)">
        <p className="font-medium">{progress}% Completed</p>
        <p>{deadline.text}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-(--grey-100) h-2 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${colorClasses.split(" ").find((c) => c.startsWith("bg-"))}`}
          style={{ width: `${progress}%`, filter: "brightness(1.2)" }}
        />
      </div>
    </div>
  );
}
