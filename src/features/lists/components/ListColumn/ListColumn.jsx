import { useDroppable } from "@dnd-kit/core";
import ListHeader from "./ListHeader";
import AddTaskButton from "./AddTaskButton";
import TasksArea from "./TaskArea";
import { ListProvider } from "../../context/ListProvider";

export default function ListColumn({
  list,
  boardId,
  openModal,
  previewMove,
  activeItem,
}) {
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: `list-drop-${list.id}`,
    data: { type: "list-drop", list },
  });

  const previewTask =
    previewMove?.toListId === list.id && activeItem?.type === "task"
      ? activeItem.task
      : null;

  return (
    <ListProvider list={list}>
      <div className="flex flex-col h-full  bg-(--grey-50)  rounded-xl  overflow-hidden">
        <ListHeader list={list} boardId={boardId} openModal={openModal} />

        <TasksArea
          list={list}
          boardId={boardId}
          openModal={openModal}
          setDroppableRef={setDroppableRef}
          isOver={isOver}
          previewTask={previewTask}
        />
        {list.type === "todo" && (
          <div className="flex justify-center  my-2 border-t border-t-(--grey-0)">
            <AddTaskButton
              boardId={boardId}
              listId={list.id}
              openModal={openModal}
            />
          </div>
        )}
      </div>
    </ListProvider>
  );
}
