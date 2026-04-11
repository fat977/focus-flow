import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/modal/useModal";
import { useDeleteBoard } from "../../features/boards/hooks/useBoards";
import {Button} from "@/components/ui/Buttons";
import { useDeleteTask } from "../../features/tasks/hooks/useTasks";
import { useDeleteList } from "../../features/lists/hooks/useLists";

function ConfirmDelete({ board, task, list, boardId }) {
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const { mutate: deleteBoard, isPending: isDeletingBoard } = useDeleteBoard();
  const { mutate: deleteTask, isPending: isDeletingTask } =
    useDeleteTask(boardId);
  const { mutate: deleteList, isPending: isDeletingList } =
    useDeleteList(boardId);
  const isTask = Boolean(task);
  const isList = Boolean(list);
  const itemToDelete = task || board || list;
  const isPending = isDeletingBoard || isDeletingTask || isDeletingList;

  if (!itemToDelete?.id) return null;

  const getTypeName = () => {
    if (isTask) return "task";
    if (isList) return "list";
    return "board";
  };
  const handleDelete = () => {
    if (isTask) {
      deleteTask(task.id, {
        onSuccess: () => {
          closeModal();
        },
      });
    } else if (isList) {
      deleteList(list.id,boardId, { onSuccess: closeModal() });
    } else {
      deleteBoard(board.id, {
        onSuccess: () => {
          closeModal();
          navigate("/boards");
        },
      });
    }
  };

  return (
    <>
      <p className="text-(--grey-600) mb-4">
        Are you sure you want to delete this {getTypeName()}:{" "}
        <span className="font-semibold">{itemToDelete.title}</span>?
        <br />
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>

        <Button variant="danger" onClick={handleDelete} disabled={isPending}>
          {isPending ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </>
  );
}
export default ConfirmDelete;
