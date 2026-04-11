import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors
} from "@dnd-kit/core";

import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useModal } from "../../../context/modal/useModal";
import { useReorderLists } from "../../lists/hooks/useLists";
import { useMoveTask } from "../../tasks/hooks/useTasks";
import { useGetBoard } from "../hooks/useBoards";

import { Button } from "@/components/ui/Buttons";
import ListColumn from "../../lists/components/ListColumn/ListColumn";
import { useBoardDnd } from "../hooks/useBoardDnd";

export default function BoardDetails() {
  const { id: boardId } = useParams();
  const { openModal } = useModal();
  const { data: board, isLoading } = useGetBoard(boardId);
  const { mutate: moveTask } = useMoveTask(boardId);
  const { mutate: reorderLists } = useReorderLists(boardId);

  const {
    activeItem,
    previewMove,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useBoardDnd(board, moveTask, reorderLists);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-48 bg-slate-200 rounded-full" />
          <div className="text-(--text-muted) font-medium">
            Loading your board...
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full overflow-hidden ">
      <div className="shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 backdrop-blur-md   px-4 py-3">
        <h1 className="text-xl sm:text-3xl font-bold text-(--text-main) truncate">
          {board?.title}
        </h1>
        <div>
          <Button
            onClick={() => openModal("list", { boardId })}
          >
            <Plus size={18} />
            <span className="hidden sm:inline">New List</span>
          </Button>
        </div>
      </div>

      <main className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 h-full p-8 min-w-max items-start">
            <SortableContext
              items={board?.lists.map((l) => l.id) || []}
              strategy={horizontalListSortingStrategy}
            >
              {board?.lists.map((list) => (
                <div
                  key={list.id}
                  className="w-72 shrink-0 h-full flex flex-col"
                >
                  <ListColumn
                    id={list.id}
                    list={list}
                    boardId={board.id}
                    openModal={openModal}
                    previewMove={previewMove}
                    activeItem={activeItem}
                  />
                  <div className="h-4 shrink-0" />
                </div>
              ))}
            </SortableContext>
          </div>

          <DragOverlay dropAnimation={null}>
            {activeItem ? (
              <div className="pointer-events-none bg(--grey-50) rounded-2xl shadow-2xl border border-(--grey-300) p-4 w-72 scale-105 rotate-2">
                <p className="text-[10px] uppercase tracking-widest text-(--text-muted) mb-1">
                  Moving {activeItem.type}
                </p>
                <div className="font-semibold text-(--text-main)truncate">
                  {activeItem.list?.title || activeItem.task?.title}
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>
    </div>
  );
}
