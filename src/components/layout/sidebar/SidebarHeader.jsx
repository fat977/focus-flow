import { useSelector } from "react-redux";

function SidebarHeader() {
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  return (
    <div className="flex justify-between h-10 items-center  m-2">
      <div className="logo flex items-center gap-2">
        <div className="w-10 rounded-lg flex items-center justify-center text-(--grey-0) font-bold">
          <img src="/logo/logo.png" alt="Logo" className=" object-cover" />
        </div>

        {!isCollapsed && (
          <span className="text-xl font-bold text-(--grey-800)">TaskFlow</span>
        )}
      </div>
    </div>
  );
}

export default SidebarHeader;
