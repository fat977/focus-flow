import ToggleDarkMode from "./ToggleDarkMode";
import UserProfile from "./UserProfile";
import { Bolt } from "lucide-react";
import { useSelector } from "react-redux";
import SidebarLink from "../SidebarLink";

function Settings() {
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  return (
    <div className="mt-auto">
      <SidebarLink
        name="Settings"
        path="/settings"
        icon={<Bolt size={20} />}
        isCollapsed={isCollapsed}
      />
      <ToggleDarkMode />
      <UserProfile />
    </div>
  );
}

export default Settings;
