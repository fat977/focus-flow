import { Camera, Loader2 } from "lucide-react";
import { useProfileForm } from "../auth/hooks/useProfileForm";
import { useProfile, useUpdateProfile } from "../auth/hooks/useUpdate";
import { Button, Input } from "@/components/ui";

export default function ProfileSettings() {
  const { data: profile, isLoading } = useProfile();
  const {
    register,
    handleSubmit,
    errors,
    isPending: isUpdatingName,
    isDirty,
  } = useProfileForm(profile);

  const { updateAvatar, isUploadingAvatar } = useUpdateProfile();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && profile?.id) {
      updateAvatar(file); 
    }
  };
  return (
    <div className="flex justify-center p-10">
      <div className="space-y-8 p-10 rounded-lg w-100  bg-(--grey-50) ">
        {/* --- قسم الصورة (خارج الـ Form لرفع فوري) --- */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group w-32 h-32">
            {/* عرض الصورة الحالية */}
            {isLoading ? (
              <div className="skeleton-loader w-20 h-20 rounded-full bg-gray-200 animate-pulse" />
            ) : (
              <img
                src={profile?.avatar || "/default-avatar.png"}
                alt="Profile"
                key={profile?.avatar}
                className={`w-full h-full rounded-full object-cover border-4 border-(--grey-100) transition-all ${isUploadingAvatar ? "brightness-50" : "group-hover:brightness-75"}`}
              />
            )}

            {/* لودر التحميل */}
            {isUploadingAvatar && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="animate-spin text-white" size={32} />
              </div>
            )}

            {/* الـ Input المخفي */}
            <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
              {!isUploadingAvatar && (
                <Camera
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  size={28}
                />
              )}
              <Input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isUploadingAvatar}
              />
            </label>
          </div>
          <p className="text-xs text-(--grey-500)">
            Allowed JPG, PNG. Max size 2MB
          </p>
        </div>

        {/* --- فورم البيانات النصية --- */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              register={register}
              name="fullName"
              placeholder="Full Name"
              error={errors.fullName?.message}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            // ✅ الزر سيعمل فقط إذا كان هناك تغيير (isDirty) ولم يكن هناك تحميل (isPending)
            disabled={!isDirty || isUpdatingName}
            className={`justify-center ${
              !isDirty || isUpdatingName
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-(--brand-600) hover:bg-(--brand-700)"
            }`}
          >
            {isUpdatingName ? "Saving..." : "Update Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
}
