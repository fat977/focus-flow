import { useQuery } from "@tanstack/react-query";
import { getBoardProgressStats, getDashboardStats, getRecentTasks } from "../api/dashboard.api";

export function useDashboard(userId) {
  return useQuery({
    queryKey: ["dashboard-stats", userId], 
    queryFn: () => getDashboardStats(userId),
    enabled: !!userId, 
    meta: {
      errorMessage: "Failed to fetch data ",
    },
  });
}

export function useBoardProgressStats(userId) {
  return useQuery({
    queryKey: ["stats", userId], 
    queryFn: () => getBoardProgressStats(userId),
    enabled: !!userId, 
    meta: {
      errorMessage: "Failed to fetch data ",
    },
  });
}


export function useRecentTasks(userId, limit = 5) {
  const {
    isLoading,
    data: recentTasks,
    error,
  } = useQuery({
    queryKey: ["recentTasks", userId, limit],
    queryFn: () => getRecentTasks(userId, limit),
    enabled: !!userId, // لا يعمل الاستعلام إلا لو اليوزر موجود
  });

  return { isLoading, recentTasks, error };
}
