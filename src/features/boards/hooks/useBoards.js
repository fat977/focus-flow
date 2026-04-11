import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBoards,
  createBoard,
  updateBoard,
  deleteBoard,
  getBoard,
} from "../api/boards.api";
import toast from "react-hot-toast";

export function useBoards(userId) {
  return useQuery({
    queryKey: ["boards", userId],
    queryFn: () => getBoards(userId),
    enabled: !!userId,
    meta: {
      errorMessage: "Failed to fetch boards ",
    },
  });
}

export const useGetBoard = (boardId) => {
  return useQuery({
    queryKey: ["board", boardId],
    queryFn: () => getBoard(boardId),
    enabled: !!boardId,
    meta: {
      errorMessage: "Failed to fetch board details",
    },
  });
};

const useBoardAction = (mutationFn, successMsg) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      const id = variables?.boardId || variables;
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["board", id] });
      }

      toast.success(successMsg);
    },
  });
};
export const useCreateBoard = () => {
  return useBoardAction(createBoard, "Project created successfully!");
};
export const useUpdateBoard = () => {
  return useBoardAction(updateBoard, "Project updated successfully!");
};

export const useDeleteBoard = () => {
 return useBoardAction(deleteBoard, "Project deleted successfully!");
};
