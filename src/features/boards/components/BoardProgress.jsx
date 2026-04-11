import { CheckCircle2 } from "lucide-react";
import { pureColors, statusColors } from "../../../utils/statusStyle";

const BoardProgress = ({ completed, total, progress }) => {
  if (total === 0)
    return <p className="text-xs text-(--text-muted) italic mb-6">No tasks yet</p>;

  const getColorKey = () => {
    if (progress === 100) return "success";
    if (progress === 0)   return "danger";
    return "warning";
  };

  const colorKey = getColorKey();
  const colorVar = statusColors[colorKey]; 
  const bgClass = pureColors[getColorKey()]; 

  return (
    <div className="mb-6">
      <div className="flex justify-between items-end mb-2 text-xs font-semibold">
        <div className={`flex items-center gap-1.5 ${progress === 100 ? `text-${colorVar}` : "text-(--text-muted)"}`}>
          <CheckCircle2 size={14} />
          <span>{completed}/{total} Tasks</span>
        </div>

        <span className={`text-${colorVar}`}>{progress}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-(--grey-200) h-2 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${bgClass}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
export default BoardProgress