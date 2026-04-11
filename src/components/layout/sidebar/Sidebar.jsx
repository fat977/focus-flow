import { useDispatch, useSelector } from "react-redux";
import NavGroup from "./NavGroup";
import ProjectList from "./ProjectList";
import SidebarHeader from "./SidebarHeader";
import Settings from "./settings/Settings";
import { Divider } from "@/components/ui";
import { closeMobileSidebar } from "./sidebarSlice";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

function Sidebar() {
  const { isCollapsed, isMobileOpen } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const ref = useOutsideClick(() => dispatch(closeMobileSidebar()));
  return (
    <>
      {isMobileOpen && (
        <div className="fixed inset-0 bg-(--backdrop) z-60 md:hidden" />
      )}
      <aside
        ref={ref}
        className={`transition-all duration-300 fixed inset-y-0 left-0 z-70 md:sticky md:translate-x-0 flex flex-col h-screen bg-(--grey-50) border-r border-(--grey-100) shadow  px-2 py-4 ${
          isCollapsed ? "w-20" : "w-56"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } `}
      >
        <SidebarHeader />

        <div className="shrink-0">
          <NavGroup />
          <Divider />
        </div>
        <div className="flex-1 min-h-0">
          <ProjectList />
        </div>
        <div className="shrink-0">
          <Divider />
          <Settings />
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
