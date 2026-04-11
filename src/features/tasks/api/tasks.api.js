import { supabase } from "../../../services/supabaseClient";
import { taskSchema } from "../schema";

// ============================================================
// Create Task  API
// ============================================================
export async function createTask(data, boardId, listId) {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("يجب تسجيل الدخول");

    const validation = taskSchema.safeParse(data);
    if (!validation.success)
      throw new Error(validation.error.errors[0].message);

    const { data: tasks } = await supabase
      .from("tasks")
      .select("orderIndex")
      .eq("listId", listId) 
      .order("orderIndex", { ascending: false })
      .limit(1);

    const nextOrderIndex =
      tasks && tasks.length > 0 ? tasks[0].orderIndex + 1 : 0;

    const { data: newTask, error: insertError } = await supabase
      .from("tasks")
      .insert([
        {
          ...data,
          listId: listId, 
          userId: user.id,
          boardId: boardId,
          orderIndex: nextOrderIndex,
        },
      ])
      .select()
      .single();

    if (insertError) throw new Error(insertError.message);
    return newTask;
  } catch (error) {
    throw new Error(error.message);
  }
}

// ============================================================
// Get All Tasks API
// ============================================================
export async function getTasks(userId) {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select(
        `
        *,
        boards (
          title
        ),
        lists!inner ( 
          type, 
          title 
        )
      `,
      )
      .eq("userId", userId)
      .order("createdAt", { ascending: false });

    if (error) throw error;

    return data.map((task) => ({
      ...task,
      boardTitle: task.boards?.title,
      listType: task.lists?.type,
      listTitle: task.lists?.title,
    }));
  } catch (error) {
    console.error("getTasks error:", error.message);
    throw new Error("Failed to fetch tasks");
  }
}

// ============================================================
// Get Task Details API
// ============================================================
export const getTask = async (taskId) => {
  if (!taskId) throw new Error("Task ID is required");

  try {
    const { data, error } = await supabase
      .from("tasks")
      .select(
        `
      *,
      lists (title),
      boards (title)
      `,
      )
      .eq("id", taskId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ============================================================
// Update Task API
// ============================================================
export async function updateTask({ taskId, updatedData }) {
  if (!taskId) throw new Error("Task ID is required");

  const validation = taskSchema.safeParse(updatedData);
  if (!validation.success) {
    throw new Error(validation.error.errors[0].message);
  }

  try {
    const { data, error } = await supabase
      .from("tasks")
      .update(updatedData)
      .eq("id", taskId) 
      .select()
      .single(); 

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("updateTask error:", error.message);
    throw new Error(error.message || "Failed to update task");
  }
}

// ============================================================
// Delete Task API
// ============================================================
export async function deleteTask(taskId) {
  if (!taskId) throw new Error("Task ID is required");

  try {
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);

    if (error) throw error;

    return { id: taskId };
  } catch (error) {
    console.error("deleteTask error:", error.message);
    throw new Error("Failed to delete task");
  }
}

// tasks.api.js
export async function moveTaskApi({ updatedTasks }) {
  const promises = updatedTasks.map(({ id, listId, orderIndex }) =>
    supabase
      .from("tasks")
      .update({
        listId,
        orderIndex,
      })
      .eq("id", id),
  );

  const results = await Promise.all(promises);

  const error = results.find((r) => r.error)?.error;
  if (error) throw error;

  return results;
}
