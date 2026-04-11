import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { boardSchema } from "../schema";
import { useSelector } from "react-redux";
import { useCreateBoard, useUpdateBoard } from "./useBoards";
import { format } from "date-fns";

export function useBoardForm({ board, onSuccess }) {
  const userId = useSelector((state) => state.auth.user?.uid);
  const { mutate: createBoard, isPending: isCreating } = useCreateBoard();
  const { mutate: updateBoard, isPending: isUpdating } = useUpdateBoard();
  const isEdit = Boolean(board);
  const form = useForm({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      title: board?.title || "",
      dueDate: board?.dueDate
        ? format(new Date(board.dueDate), "yyyy-MM-dd")
        : "",
    },
  });
  const onSubmit = (data) => {
    if (isEdit && board?.id) {
      updateBoard({ updatedData: data, boardId: board.id }, { onSuccess });
    } else {
      createBoard(
        {
          title: data.title,
          dueDate: data.dueDate,
          userId,
        },
        {
          onSuccess: () => {
            form.reset();
            onSuccess?.();
          },
        }
      );
    }
  };

  return {
    form,
    onSubmit,
    isEdit,
    isPending: isCreating || isUpdating,
  };
}
