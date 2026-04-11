import { supabase } from "../../../services/supabaseClient";

export async function getDashboardStats(userId) {
  const today = new Date().toISOString().substring(0, 10);
  try {
    const [
      boards,
      tasks,
      completedTasks,
      inProgressTasks,
      notStartedTasks,
      overdueTasks,
      dueTodayTasks,
    ] = await Promise.all([
      supabase
        .from("boards")
        .select("*", { count: "exact", head: true })
        .eq("userId", userId),
      supabase
        .from("tasks")
        .select("*, lists!inner(boardId),boards(title)", { count: "exact" }),
      supabase
        .from("tasks")
        .select("*, lists!inner(type)", {
          count: "exact",
          head: true,
        })
        .eq("lists.type", "done"), 
      supabase
        .from("tasks")
        .select("*, lists!inner(type)", {
          count: "exact",
          head: true,
        })
        .eq("lists.type", "in-progress"),
      supabase
        .from("tasks")
        .select("*, lists!inner(type)", {
          count: "exact",
          head: true,
        })
        .eq("lists.type", "todo"),
      supabase
        .from("tasks")
        .select("*, lists!inner(type),boards(title)", { count: "exact" })
        .eq("userId", userId)
        .neq("lists.type", "done")
        .lt("dueDate", new Date().toISOString().substring(0, 10)),
      supabase
        .from("tasks")
        .select("*, lists!inner(type),boards(title) ", { count: "exact" })
        .eq("userId", userId)
        .neq("lists.type", "done")
        .eq("dueDate", today),
    ]);
    return {
      totalBoards: boards.count || 0,
      totalTasksCount: tasks.count || 0,
       totalTasks: tasks.data || [],
      completedTasks: completedTasks.count || 0,
      inProgressTasks: inProgressTasks.count || 0,
      notStartedTasks: notStartedTasks.count || 0,
      overdueTasks: overdueTasks.data || [],
      overdueCount: overdueTasks.count || 0,
      dueTodayTasks: dueTodayTasks.data || [],
      dueTodayCount: dueTodayTasks.count || 0,
    };
  } catch (error) {
    console.error("Error fetching stats:", error.message);
    return null;
  }
}

export const getBoardProgressStats = async (userId) => {
  try {
    const { data: boards, error } = await supabase
      .from("boards")
      .select(
        `
      id,
      title,
      lists (
        type,
        tasks (id)
      )
    `,
      )
      .eq("userId", userId);

    if (error) throw error;

    const statsPie = {
      completedBoards: 0,
      inProgressBoards: 0,
      todoBoards: 0,
    };

    boards.forEach((board) => {
      let totalTasks = 0;
      let doneTasks = 0;
      let todoTasks = 0;

      board.lists.forEach((list) => {
        const taskCount = list.tasks.length;
        totalTasks += taskCount;

        if (list.type === "done") doneTasks += taskCount;
        if (list.type === "todo") todoTasks += taskCount;
      });

      if (totalTasks > 0) {
        if (doneTasks === totalTasks) {
          statsPie.completedBoards++; 
        } else if (doneTasks > 0 || totalTasks > todoTasks) {
          statsPie.inProgressBoards++; 
        } else {
          statsPie.todoBoards++;
        }
      }
    });

    return statsPie;
  } catch (error) {
    console.error("Error fetching board progress stats:", error.message);
    return null;
  }
};

export async function getRecentTasks(userId, limit = 5) {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select(
        `
      *,
      lists (id, title, type),
      boards (title)
    `,
      )
      .eq("userId", userId)
      .order("updatedAt", { ascending: false }) 
      .limit(limit);

    if (error) throw new Error(error.message);

    return data.map((task) => ({
      ...task,
      boardTitle: task.boards?.title,
      status: task.lists?.id,
      listType: task.lists?.type,
    }));
  } catch (error) {
    console.error("Error fetching recent tasks:", error.message);
    return null;
  }
}
