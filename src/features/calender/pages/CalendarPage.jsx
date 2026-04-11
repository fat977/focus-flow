import { format } from "date-fns";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import { useDashboard } from "../../dashboard/hooks/useDashboard";
import { useTasks } from "../../tasks/hooks/useTasks";
import CalendarHeader from "../components/CalendarHeader";
import CalendarView from "../components/CalendarView";
import TaskDetailsModal from "../components/TaskDetailsModal";
import "../styles/calendar.css";
import DailyTasksSidebar from "../components/DailyTasksSidebar";

export default function CalendarPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const userId = useSelector((state) => state.auth.user?.uid);
  const { data: tasks, isLoading } = useTasks(userId);
  const { data: stats } = useDashboard(userId);

  if (isLoading)
    return (
      <div className="p-10 text-center font-bold text-white">Loading...</div>
    );

  const dailyTasks =
    tasks?.filter(
      (t) => (t.dueDate || t.due_date)?.substring(0, 10) === selectedDate,
    ) || [];

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 h-full  min-h-screen">
      <CalendarHeader taskCount={stats?.totalTasksCount} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <CalendarView
          tasks={tasks}
          onDayClick={(date) => setSelectedDate(format(date, "yyyy-MM-dd"))}
          onTaskClick={handleTaskSelect}
        />

        <DailyTasksSidebar
          selectedDate={selectedDate}
          tasks={dailyTasks}
          onTaskClick={handleTaskSelect}
        />
      </div>

      <TaskDetailsModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
