import { useContext } from "react";
import { ListContext } from "../list-context";

export function useListDrag() {
  const context = useContext(ListContext)
  if (context === undefined)
    throw new Error('ModalContext was used outside of ThemeProvider');
  return context;
}