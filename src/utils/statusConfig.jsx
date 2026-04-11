import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  CalendarDays,
  PlayCircle,
} from "lucide-react";

export const statusConfig = {
  Completed: {
    color: "bg-(--success-50)  text-(--success-600) border-(--success-100) px-2 py-0.5 border rounded-full",
    icon: <CheckCircle2 size={16} />,
    label: "Completed",
  },
  "On Track": {
    color: "bg-(--brand-600) px-2 py-0.5 border rounded-full",
    icon: <PlayCircle size={16} />,
    label: "On Track",
  },
  "At Risk": {
    color: "bg-(--warning-50) text-(--warning-600) border-(--warning-100) px-2 py-0.5 border rounded-full",
    icon: <AlertTriangle size={16} />,
    label: "At Risk",
  },
  Delayed: {
    color: "bg-(--danger-50) text-(--danger-600) border-(--danger-100) px-2 py-0.5 border rounded-full",
    icon: <XCircle size={16} />,
    label: "Delayed",
  },
  Planned: {
    color: "text-purple-600 bg-purple-50 border-purple-200",
    icon: <CalendarDays size={16} />,
    label: "Planned",
  },
  "Not Started": {
    color: "bg-(--warning-50) text-(--warning-600) border-(--warning-100) px-2 py-0.5 border rounded-full",
    icon: <Clock size={16} />,
    label: "Not Started",
  },
  "Invalid Dates": {
    color: "text-gray-400 bg-gray-100 border-gray-200",
    icon: <AlertTriangle size={16} />,
    label: "Invalid Dates",
  },
};
