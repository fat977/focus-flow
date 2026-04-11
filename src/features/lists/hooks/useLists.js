import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createList,
  deleteList,
  updateList,
  updateListsOrder,
} from "../api/lists.api";

const useListAction = (mutationFn, successMsg, boardId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      if (boardId) {
        queryClient.invalidateQueries({ queryKey: ["board", boardId] });
      }
      toast.success(successMsg);
    },
    onError: (err) => {
      toast.error(err.message || "حدث خطأ ما");
    },
  });
};

export const useCreateList = (boardId) => {
  return useListAction(
    (listData) => createList({ ...listData, boardId }),
    "List created successfully!",
    boardId
  );
};

export const useUpdateList = (boardId) => {
  return useListAction(
    ({ listId, updates }) => updateList({ listId, updates }),
    "List updated successfully!",
    boardId
  );
};

export const useDeleteList = (boardId) => {
  return useListAction(
    (listId) => deleteList(listId),
    "List deleted successfully!",
    boardId
  );
};

export const useReorderLists = (boardId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateListsOrder,
    onMutate: async (updatedLists) => {
      await queryClient.cancelQueries({ queryKey: ["board", boardId] });
      const previousBoard = queryClient.getQueryData(["board", boardId]);

      queryClient.setQueryData(["board", boardId], (old) => {
        if (!old) return old;
        const updatedListsWithTasks = updatedLists.map((updatedList) => {
          const originalList = old.lists.find((l) => l.id === updatedList.id);
          return {
            ...originalList,
            ...updatedList,
            tasks: originalList?.tasks || [],
          };
        });

        return {
          ...old,
          lists: updatedListsWithTasks,
        };
      });

      return { previousBoard };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board", boardId] });
    },
    onError: (err) => toast.error(err.message),
    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["board", boardId] });
      }, 500); 
    },
  });
};
