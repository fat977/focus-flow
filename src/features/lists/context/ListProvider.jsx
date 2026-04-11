import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ListContext } from "./list-context";

export function ListProvider({ children, list }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: list.id,
    data: { type: "list", list }
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <ListContext.Provider value={{ attributes, listeners, setActivatorNodeRef }}>
      <div ref={setNodeRef} style={style} className=" rounded-xl w-72 shrink-0 flex flex-col shadow-sm">
        {children}
      </div>
    </ListContext.Provider>
  );
}
