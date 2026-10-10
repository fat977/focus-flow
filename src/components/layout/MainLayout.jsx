import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import useTitleFromPath from "../../hooks/useTitleFromPath.js";
import {Modal} from "@/components/ui";
import { Toaster } from "react-hot-toast";

function MainLayout() {
  useTitleFromPath();

  return (
    <div className="flex h-screen text-(--grey-900)">
      <Toaster position="top-right" />
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <Header />
        <main className="sidebar-scrollbar flex-1 min-h-0 overflow-y-auto p-4 bg-(--grey-0) text-(--text-main)">
          <Outlet />
        </main>
        <Modal />
      </div>
    </div>
  );
}

export default MainLayout;
