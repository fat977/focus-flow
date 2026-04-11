import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

export function useBoardDnd(board, moveTask, reorderLists) {
  const [activeItem, setActiveItem] = useState(null);
  const [previewMove, setPreviewMove] = useState(null);

  const handleDragStart = ({ active }) => {
    setActiveItem(active.data.current);
  };

  const handleDragOver = ({ active, over }) => {
    if (!over || active.data.current?.type !== "task") return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const overListId =
      overData?.type === "task"
        ? overData.task.listId
        : overData?.type === "list"
        ? over.id
        : null;

    if (!overListId) return;

    const sourceListId = activeData.task.listId;

    if (sourceListId !== overListId) {
      setPreviewMove({
        taskId: activeId,
        toListId: overListId,
        overTaskId: overData?.type === "task" ? overId : null, 
      });
    }
  };
  const handleDragEnd = ({ active, over }) => {
    setActiveItem(null);
    setPreviewMove(null);

    if (!over) return;

    const activeType = active.data.current?.type;

    if (activeType === "list") {
      if (!over) return;

      let targetListId = null;

      if (over.data?.current?.type === "list") {
        targetListId = over.id;
      }
      else if (over.data?.current?.type === "task") {
        targetListId = over.data.current.task?.listId;
      }
      else {
        const maybeList = board.lists.find((l) => l.id === over.id);
        if (maybeList) targetListId = over.id;
      }

      if (!targetListId) {
        console.warn("Could not determine target list for drop");
        return;
      }

      const oldIndex = board.lists.findIndex((l) => l.id === active.id);
      const newIndex = board.lists.findIndex((l) => l.id === targetListId);

      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;
      const newLists = arrayMove(board.lists, oldIndex, newIndex);
      reorderLists(
        newLists.map((l, i) => ({
          id: l.id,
          order: i,
          title: l.title,
          boardId: board.id,
        }))
      );

      return;
    }

   
    if (activeType === "task") {
      const activeTask = active.data.current.task;
      const sourceList = board.lists.find((l) =>
        l.tasks.some((t) => t.id === activeTask.id)
      );
      const destList = board.lists.find(
        (l) =>
          l.id === over.id ||
          l.tasks.some((t) => t.id === over.id) ||
          `list-drop-${l.id}` === over.id
      );

      if (!sourceList || !destList) return;

      let updates = [];

      if (sourceList.id === destList.id) {
        const tasks = [...sourceList.tasks].sort(
          (a, b) => a.orderIndex - b.orderIndex
        );
        const oldIndex = tasks.findIndex((t) => t.id === activeTask.id);
        const newIndex = tasks.findIndex(
          (t) => t.id === (over.data.current?.task?.id || activeTask.id)
        );

        const reordered = arrayMove(tasks, oldIndex, newIndex);
        updates = reordered.map((t, i) => ({
          id: t.id,
          listId: sourceList.id,
          orderIndex: i,
        }));
      } else {
        const sourceTasks = sourceList.tasks
          .filter((t) => t.id !== activeTask.id)
          .sort((a, b) => a.orderIndex - b.orderIndex);

        const destTasks = [...destList.tasks].sort(
          (a, b) => a.orderIndex - b.orderIndex
        );
        const overIndex = destTasks.findIndex(
          (t) => t.id === over.data.current?.task?.id
        );
        const insertIndex = overIndex >= 0 ? overIndex : destTasks.length;

        destTasks.splice(insertIndex, 0, {
          ...activeTask,
          listId: destList.id,
        });

        const sourceUpdates = sourceTasks.map((t, i) => ({
          id: t.id,
          listId: sourceList.id,
          orderIndex: i,
        }));
        const destUpdates = destTasks.map((t, i) => ({
          id: t.id,
          listId: destList.id,
          orderIndex: i,
        }));

        updates = [...sourceUpdates, ...destUpdates];
      }

      moveTask({ updatedTasks: updates });
    }
  };

  return {
    activeItem,
    previewMove,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}
