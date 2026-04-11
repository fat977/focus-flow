import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { closeMobileSidebar } from "./sidebarSlice";

export default function SidebarLink({ icon, name, path, isCollapsed, color }) {
   const dispatch = useDispatch();
  return (
    <NavLink
      to={path}
      className={({ isActive }) => `
        relative flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 group
        ${
          isActive
            ? "bg-(--grey-100) text-(--brand-600) font-semibold"
            : "text-(--grey-600) hover:bg-(--grey-50) hover:text-(--brand-500)"
        }
        ${isCollapsed ? "justify-center" : ""}
      `}
      onClick={() => dispatch(closeMobileSidebar())}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div className="absolute left-0 w-1 h-6 bg-(--brand-500) rounded-r-full" />
          )}

          {/* icon or color */}
          <div className="flex items-center justify-center w-5 h-5">
            {color ? (
              // color for projects
              <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
            ) : (
              // icons
              <span
                className={`transition-colors duration-200 ${
                  isActive
                    ? "text-(--brand-600)"
                    : "group-hover:text-(--brand-500)"
                }`}
              >
                {icon}
              </span>
            )}
          </div>

          {!isCollapsed && (
            <span className="text-sm whitespace-nowrap overflow-hidden">
              {name}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}
