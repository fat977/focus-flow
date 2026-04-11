import { Mail, Shield, Key, Trash2, CheckCircle, Link2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useProfile } from "../auth/hooks/useUpdate";
import { useDeleteAccount } from "../auth/hooks/useDeleteAccount";
import { Button, Input } from "@/components/ui";

export default function AccountSettings() {
  const user = useSelector((state) => state.auth.user);
  const { data: profile } = useProfile();
  const { deleteAccount, isPending } = useDeleteAccount();

  const handleDelete = () => {
  if (user?.id) {
    deleteAccount(user.id); 
  }
};
  return (
    <div className=" space-y-8">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-100">Account Settings</h1>

      {/* Profile Info */}
      <section className="rounded-xl bg-[#111827] p-6 border border-white/5">
        <h2 className="text-lg font-medium text-gray-100 mb-4">Profile Info</h2>

        <div className="flex items-center gap-4">
          <img
            src={profile?.avatar || "/default-avatar.png"}
            alt="avatar"
            className="h-16 w-16 rounded-full"
          />

          <div className="flex-1">
            <p className="text-gray-100 font-medium">{profile?.fullName}</p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Mail size={14} />
              {user.email}
            </div>

            <p className="text-xs text-gray-500 mt-1">
              Managed by Google Account
            </p>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="rounded-xl bg-[#111827] p-6 border border-white/5 space-y-4">
        <h2 className="text-lg font-medium text-gray-100">Security</h2>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-300">
            <Key size={18} />
            Change password
          </div>

          <Button>
            Update Password
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-300">
            <Shield size={18} />
            Two-factor authentication
          </div>

          <Input type="checkbox" className="h-5 w-5 accent-teal-500" />
        </div>
      </section>

      {/* Connected Accounts */}
      <section className="rounded-xl bg-[#111827] p-6 border border-white/5 space-y-4">
        <h2 className="text-lg font-medium text-gray-100">
          Connected Accounts
        </h2>

        {/* Google */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-300">
            <Link2 size={18} />
            Google
          </div>

          <span className="flex items-center gap-1 text-sm text-green-400">
            <CheckCircle size={14} />
            Connected
          </span>
        </div>

        {/* GitHub */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-300">
            <Link2 size={18} />
            GitHub
          </div>

          <Button>
            Connect
          </Button>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="rounded-xl bg-[#111827] p-6 border border-red-500/20">
        <h2 className="text-lg font-medium text-red-400 mb-3">Danger Zone</h2>

        <Button variant="danger" onClick={handleDelete} isPending={isPending} >
          <Trash2 size={16} />
          Delete account and all associated data
        </Button >
      </section>
    </div>
  );
}
