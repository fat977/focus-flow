import { useContext } from "react";
import { TaskContext } from "../task-context";

export const useTaskDrag = () => {
  const context = useContext(TaskContext);
  if (context === undefined)
    throw new Error("ModalContext was used outside of ThemeProvider");
  return context;
};
