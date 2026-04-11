import { Calendar, CheckSquare, LayoutDashboard } from "lucide-react";
import { useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";

const mainNav = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/dashboard",
  },
  { name: "My Tasks", icon: <CheckSquare size={20} />, path: "/my-tasks" },
  { name: "Calendar", icon: <Calendar size={20} />, path: "/calender" },
];
function NavGroup() {
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  return (
    <nav className="flex-1 my-4">
      {!isCollapsed && (
        <div className="flex items-center justify-between px-3 mb-4 text-(--grey-400)  uppercase text-xs font-bold tracking-wider">
          <span>Home</span>
        </div>
      )}
      <ul className="space-y-2">
        {mainNav.map((link) => (
          <li key={link.name}>
            <SidebarLink key={link.path} {...link} isCollapsed={isCollapsed} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavGroup;
