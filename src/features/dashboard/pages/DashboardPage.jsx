import { useSelector } from "react-redux";
import { useBoardProgressStats, useDashboard } from "../hooks/useDashboard";
import {
  CheckCheck,
  ClipboardList,
  ClockAlert,
  FolderKanban,
} from "lucide-react";
import StatsCard from "../components/StatsCard";
import ProjectAnalytics from "../components/projects/ProjectAnalytics";
import ProjectStatus from "../components/projects/ProjectStatus";
import TaskCompletion from "../components/tasks/TaskCompletion";
import RecentTasksList from "../components/tasks/RecentTasks";
import TodaysFocus from "../components/tasks/TodayFocus";
import DashboardHeader from "../components/DashboardHeader";
import { useProfile } from "../../auth/hooks/useUpdate";

function DashboardPage() {
  const user = useSelector((state) => state.auth.user);
  const { data: profile } = useProfile();

  const { data: stats, isLoading: statsLoading } = useDashboard(user?.uid);
  const { data: statsPie, isLoading: pieLoading } = useBoardProgressStats(
    user?.uid,
  );

  const STATS = [
    {
      title: "Projects",
      icon: <FolderKanban size={20} />,
      value: stats?.totalBoards,
      color: "bg-[var(--brand-50)] text-[var(--brand-600)]",
    },
    {
      title: "Tasks",
      icon: <ClipboardList size={20} />,
      value: stats?.totalTasksCount,
      color: "bg-[var(--grey-50)] text-[var(--grey-600)]",
    },
    {
      title: "Completed",
      icon: <CheckCheck size={20} />,
      value: stats?.completedTasks,
      color: "bg-[var(--success-50)] text-[var(--success-600)]",
    },
    {
      title: "Overdue",
      icon: <ClockAlert size={20} />,
      value: stats?.overdueCount,
      color: "bg-[var(--danger-50)] text-[var(--danger-600)]",
    },
  ];

  const chartData = [
    { name: "Completed", value: statsPie?.completedBoards || 0 },
    { name: "In Progress", value: statsPie?.inProgressBoards || 0 },
    { name: "Not Started", value: statsPie?.todoBoards || 0 },
  ];

  const tasksPie = [
    {
      name: "Not Started",
      value: stats?.notStartedTasks,
      color: "bg-[var(--brand-600)]",
    },
    {
      name: "In Progress",
      value: stats?.inProgressTasks,
      color: "bg-[var(--brand-600)]",
    },
    {
      name: "Completed",
      value: stats?.completedTasks,
      color: "bg-[var(--success-600)]",
    },
  ];

  if (statsLoading || pieLoading)
    return (
      <div className="p-10 text-center font-bold">Loading Analytics...</div>
    );

  return (
    <div className="p-6 space-y-8">
      <DashboardHeader userName={profile?.fullName} />
      {/* صف الكروت العلوية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            icon={stat.icon}
            color={stat.color}
            value={stat.value || 0}
          />
        ))}
      </div>

      {/* قسم التحليلات البيانية */}
      <div className="w-full">
        <ProjectAnalytics
          data={chartData}
          totalProjects={stats?.totalBoards}
          rawStats={statsPie}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <ProjectStatus />
        <TodaysFocus />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <TaskCompletion
          data={tasksPie}
          tasksStat={stats}
          totalTasks={stats?.totalTasksCount}
        />

        <RecentTasksList userId={user.uid} />
      </div>
    </div>
  );
}

export default DashboardPage;
