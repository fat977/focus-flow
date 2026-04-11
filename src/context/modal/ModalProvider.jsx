import { useState } from "react";
import { ModalContext } from "./modal-context";

export const ModalProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null); // 'board' | 'task' | null
  const [modalData, setModalData] = useState(null); 
  const openModal = (type, data = null) => {
    setModalType(type);
    setModalData(data);
  };

  const closeModal = () => {
    setModalType(null);
    setModalData(null);
  };

  return (
    <ModalContext.Provider value={{ modalType, modalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};