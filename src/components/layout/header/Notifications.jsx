// components/layout/header/Notifications.jsx
import { Bell, AlertTriangle, Calendar, Clock } from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Buttons";

const iconMap = {
  alert: <AlertTriangle size={16} />,
  calendar: <Calendar size={16} />,
  clock: <Clock size={16} />,
};

export default function Notifications({ alerts = [] }) {
  return (
    <Dropdown
      align="bottom-right"
      trigger={
        <Button variant="secondary" className="relative">
          <Bell size={22} />
          {alerts.length > 0 && (
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-(--danger-600) rounded-full border-2 border-(--grey-0)"></span>
          )}
        </Button>
      }
    >
      <div className="max-h-80 w-80 overflow-y-auto">
        <div className="p-3 border-b border-(--grey-100) font-bold text-xs text-(--text-main)">
          Recent Alerts
        </div>
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div key={alert.id} className="flex items-center gap-3 p-3 hover:bg-(--grey-50) cursor-pointer border-b border-(--grey-100)/50 last:border-0 transition-colors">
              <span className={alert.colorClass}>{iconMap[alert.iconName]}</span>
              <p className="text-xs font-medium text-(--text-main)">{alert.message}</p>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-xs text-(--grey-500)">
            No urgent alerts today. 🎉
          </div>
        )}
      </div>
    </Dropdown>
  );
}