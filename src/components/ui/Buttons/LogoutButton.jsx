import { LogOut } from "lucide-react";
import { useLogout } from "../../../features/auth/hooks/useLogout";
import {Button} from "@/components/ui/Buttons";
import { useSelector } from "react-redux";

export default function LogoutButton() {
  const { logout, isPending } = useLogout();
    const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  return (
    <Button onClick={logout} isPending={isPending} className="" variant="danger" size="lg" fullWidth>
      <LogOut size={16} />{!isCollapsed && <span className="text-sm font-medium">Logout</span>}
    </Button>
  );
}
