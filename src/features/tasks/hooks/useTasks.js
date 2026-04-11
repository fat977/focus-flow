import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  moveTaskApi,
  updateTask,
} from "../api/tasks.api";

export function useTasks(userId) {
  return useQuery({
    queryKey: ["tasks", userId],
    queryFn: () => getTasks(userId),
    enabled: !!userId,
    meta: {
      errorMessage: "Failed to fetch tasks ",
    },
  });
}

export const useGetTask = (taskId) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTask(taskId),
    enabled: !!taskId,
   
    meta: {
      errorMessage: "Failed to fetch task details",
    },
  });
};

const useTaskAction = (mutationFn, successMsg, boardId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      if (boardId) {
        queryClient.invalidateQueries({ queryKey: ["board", boardId] });
      }
      queryClient.invalidateQueries({ queryKey: ["tasks", boardId] });

      toast.success(successMsg);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};

export const useCreateTask = (boardId, listId) => {
  return useTaskAction(
    (taskData) => createTask(taskData, boardId, listId),
    "Task created successfully!",
    boardId,
  );
};

export const useUpdateTask = (boardId) => {
  return useTaskAction(
    ({ taskId, updatedData }) => updateTask({ taskId, updatedData }),
    "Task updated successfully!",
    boardId,
  );
};

export const useDeleteTask = (boardId) => {
  return useTaskAction(
    (taskId) => deleteTask(taskId),
    "Task deleted successfully!",
    boardId,
  );
};

export const useMoveTask = (boardId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveTaskApi,

    onMutate: async ({ updatedTasks }) => {
      await queryClient.cancelQueries({ queryKey: ["board", boardId] });
      const previousBoard = queryClient.getQueryData(["board", boardId]);

      queryClient.setQueryData(["board", boardId], (old) => {
        if (!old) return old;

        let allTasks = old.lists.flatMap((l) => l.tasks);

       
        const updatedAllTasks = allTasks.map((task) => {
          const update = updatedTasks.find((u) => u.id === task.id);
          if (update) {
            return { ...task, ...update };
          }
          return task;
        });

        return {
          ...old,
          lists: old.lists.map((list) => ({
            ...list,
            tasks: updatedAllTasks
              .filter((t) => t.listId === list.id)
              .sort((a, b) => a.orderIndex - b.orderIndex), 
          })),
        };
      });

      return { previousBoard };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousBoard) {
        queryClient.setQueryData(["board", boardId], context.previousBoard);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["board", boardId],
        refetchType: "inactive",
      });
    },
  });
};
