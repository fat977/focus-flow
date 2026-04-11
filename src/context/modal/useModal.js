import { useContext } from "react";
import { ModalContext } from "./modal-context";

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error('ModalContext was used outside of ThemeProvider');
  return context;
}