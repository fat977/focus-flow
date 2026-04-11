import { CheckCircle2, Clock, AlertTriangle, XCircle, PlayCircle } from "lucide-react";
import { statusColors, statusSettings } from "../../utils/statusStyle";

const iconMap = {
  check: <CheckCircle2 size={14} />,
  play:  <PlayCircle size={14} />,
  alert: <AlertTriangle size={14} />,
  x:     <XCircle size={14} />,
  clock: <Clock size={14} />,
};

const StatusBadge = ({ status }) => {
  const config = statusSettings[status] || statusSettings["Not Started"];
  const colorClass = statusColors[config.color];
  const Icon = iconMap[config.iconName];

  return (
    <div className={`px-2 py-0.5 border rounded-full flex items-center gap-1 w-fit text-xs font-medium ${colorClass}`}>
      {Icon}
      <span>{config.label}</span>
    </div>
  );
};

export default StatusBadge;