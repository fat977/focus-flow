import { useSelector } from "react-redux";
import { LogoutButton } from "@/components/ui/Buttons";
import { makeAvatar } from "../../../../utils/makeAvatar";
import { useState } from "react";
import { Button } from "@/components/ui/Buttons";
import { Settings, User } from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";
import SidebarLink from "../SidebarLink";
import { useProfile } from "../../../../features/auth/hooks/useUpdate";

function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const { data: profile } = useProfile();

  return (
    <div className="flex flex-col gap-3">
      <Dropdown
        className="w-full"
        align="top-left"
        trigger={
          <div className="flex gap-3 my-2">
            <Button
              variant="secondary"
              onClick={() => setIsOpen(!isOpen)}
              fullWidth
            >
              {profile?.avatar ? (
                <img
                  src={profile?.avatar}
                  alt="User"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full border-2 border-(--brand-500) "
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-(--brand-500) flex items-center justify-center text-(--grey-0) font-bold">
                  {makeAvatar(profile?.fullName)}
                </div>
              )}

              {!isCollapsed && (
                <div className="flex-1  min-w-0 px-2">
                  <p className="text-sm text-start font-bold truncate">
                    {profile?.fullName || "User Name"}
                  </p>
                  <p className="text-xs text-start text-(--grey-500) truncate">
                    {user?.email}
                  </p>
                </div>
              )}
            </Button>
          </div>
        }
      >
        <>
          <SidebarLink
            icon={<User size={16} />}
            name="My Profile"
            path="/profile-settings"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            icon={<Settings size={16} />}
            name="Account Settings"
            path="/account-settings"
            isCollapsed={isCollapsed}
          />

          <LogoutButton />
        </>
      </Dropdown>
    </div>
  );
}

export default UserProfile;
