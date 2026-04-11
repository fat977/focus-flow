import { Button } from "@/components/ui/Buttons";
import {
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useBoards } from "../../../features/boards/hooks/useBoards";
import { useTaskAlerts } from "../../../features/tasks/hooks/useTaskAlerts";
import { useTasks } from "../../../features/tasks/hooks/useTasks";
import { toggleMobileSidebar, toggleSidebar } from "../sidebar/sidebarSlice";
import Notifications from "./Notifications";
import GlobalSearch from "./search/GlobalSearch";

function Header() {
  const { isCollapsed } = useSelector((state) => state.sidebar.isCollapsed);
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.user?.uid);
  const { data: boards } = useBoards(userId);
  const { data: tasks } = useTasks(userId);
  const alerts = useTaskAlerts(tasks);

  return (
    <header className=" border-b border-(--grey-100) bg-(--grey-50) px-6 h-18 flex items-center justify-between sticky top-0 z-10 transition-colors duration-300">
      <div className="flex items-center gap-4 flex-1">
        {/*   Icon for mobile screen    */}
        <Button
          variant="secondary"
          onClick={() => dispatch(toggleMobileSidebar())}
          className="md:hidden!"
        >
          <Menu size={24} />
        </Button>

        {/* Icon for desktop screen */}
        <Button
          className=" hidden! md:block!"
          onClick={() => dispatch(toggleSidebar())}
          variant="secondary"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>

        {/* Search */}
        <GlobalSearch boards={boards} tasks={tasks} />
      </div>

      {/* Notifications */}
      <div className="flex items-center gap-4">
        <Notifications alerts={alerts} />
      </div>
    </header>
  );
}

export default Header;
