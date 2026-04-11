import { Box, Plus, SquareKanban } from "lucide-react";
import { useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { useBoards } from "../../../features/boards/hooks/useBoards";
import { useModal } from "../../../context/modal/useModal";
import {Button} from "@/components/ui/Buttons";

function ProjectList() {
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  const userId = useSelector((state) => state.auth.user?.uid);
  const { data: boards } = useBoards(userId);

  const { openModal } = useModal();
  return (
    <nav className="h-full flex flex-col overflow-hidden">
      {isCollapsed ? (
       
        <div className="flex justify-center py-4">
          <SidebarLink
            path="/boards"
            isCollapsed={isCollapsed}
            icon={<SquareKanban />}
          />
        </div>
      ) : (
        <>
          {/* 1. Header*/}
          <div className="shrink-0 px-3 flex items-center justify-between text-(--grey-400) uppercase text-xs font-bold tracking-wider">
            <span>Projects</span>
            <Button
              variant="secondary"
              onClick={() => openModal("board")}
              size="sm"
            >
              <Plus
                size={16}
                className="text-(--brand-500) hover:text-(--brand-600) transition-colors"
              />
            </Button>
          </div>

          {/* 2. Project List*/}
          <ul className="flex-1  sidebar-scrollbar px-2 space-y-1">
            {boards?.map((board) => (
              <li key={board.id}>
                <SidebarLink
                  icon={<Box size={15} />}
                  name={board.title}
                  path={`/board/${board.id}`}
                  isCollapsed={isCollapsed}
                />
              </li>
            ))}
          </ul>

          {/* 3. Footer Link*/}
          <div className="shrink-0 p-2 border-t border-(--grey-100)">
            <SidebarLink
              name="Go to all projects"
              path="/boards"
              icon={<SquareKanban />}
            />
          </div>
        </>
      )}
    </nav>
  );
}

export default ProjectList;
