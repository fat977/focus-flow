import { X } from "lucide-react";
import { useModal } from "../../context/modal/useModal";
import BoardForm from "../../features/boards/components/BoardForm";
import {Button} from "@/components/ui/Buttons";
import { ConfirmDelete } from "@/components/ui";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import TaskForm from "../../features/tasks/components/TaskForm";
import ListForm from "../../features/lists/components/ListForm";

const MODAL_CONFIG = {
  board: {
    title: "Create New Project",
  },
  "edit-board": {
    title: "Edit Project",
  },
  "delete-board": {
    title: "Delete Project",
    danger: true,
  },
  task: {
    title: "Create New Task",
  },
  "edit-task": {
    title: "Edit Task",
  },
  "delete-task": {
    title: "Delete Task",
    danger: true,
  },

  list: { title: "Add New List" },
  "edit-list": { title: "Edit List" },
  "delete-list": { title: "Delete List", danger: true },
};

function Modal() {
  const { modalType, modalData, closeModal } = useModal();
  const ref = useOutsideClick(closeModal);

  if (!modalType) return null;
  const isEditBoard = modalType === "edit-board";
  const isDeleteBoard = modalType === "delete-board";
  const isEditTask = modalType === "edit-task";
  const isDeleteTask = modalType === "delete-task";
  const isEditList = modalType === "edit-list";
  const isDeleteList = modalType === "delete-list"; 

  return (
    <div className="fixed inset-0 bg-(--backdrop) backdrop-blur-sm flex justify-center items-center z-1000">
      <div
        ref={ref}
        className="bg-(--grey-0) rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative"
      >
        {/*close button */}
        <Button
          variant="secondary"
          onClick={closeModal}
          className="absolute top-4 right-4"
        >
          <X />
        </Button>

        <div className="p-6">
          <h2
            className={`text-2xl font-bold mb-2 ${
              MODAL_CONFIG[modalType]?.danger
                ? "text-(--danger-600)"
                : "text-(--grey-800)"
            }`}
          >
            {MODAL_CONFIG[modalType]?.title}
          </h2>
          {/* Board depends on type*/}
          {(modalType === "board" || modalType === "edit-board") && (
            <BoardForm
              board={isEditBoard ? modalData : null}
              onSuccess={closeModal}
            />
          )}
          {isDeleteBoard && modalData && <ConfirmDelete board={modalData} />}
          
          {/*Task form*/}
          {(modalType === "task" || modalType === "edit-task") && (
            <TaskForm
              boardId={
                modalType === "task" ? modalData?.boardId : modalData?.boardId
              }
              listId={modalType === "task" ? modalData?.listId : modalData?.listId}
              task={isEditTask ? modalData : null}
              onSuccess={closeModal}
            />
          )}
          {isDeleteTask && modalData && (
            <ConfirmDelete task={modalData} boardId={modalData.boardId} />
          )}

          {/* --- List Actions  --- */}
          {(modalType === "list" || modalType === "edit-list") && (
            <ListForm
              boardId={modalData?.boardId}
              list={isEditList ? modalData : null} 
              onSuccess={closeModal}
            />
          )}
          
          {isDeleteList && modalData && (
            <ConfirmDelete 
              list={modalData} 
              boardId={modalData.boardId} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
