import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfileName, uploadAvatar } from "../api/update.api"; // 👈 استيراد فقط
import { updateUser } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  // اسحبي الـ ID هنا بدلاً من تمريره كـ parameter
  const userId = useSelector((state) => state.auth.user?.id);

  const updateNameMutation = useMutation({
    mutationFn: (fullName) => updateProfileName(userId, fullName),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["profile", userId]);
      // تحديث الريدكس فوراً
      dispatch(updateUser({ fullName: data.fullName }));
      toast.success("Name updated 🎉");
    },
  });

  const updateAvatarMutation = useMutation({
    mutationFn: (file) => uploadAvatar(userId, file),
    onSuccess: (avatarUrl) => {
      queryClient.invalidateQueries(["profile", userId]);
      dispatch(updateUser({ avatar: avatarUrl }));
      toast.success("Avatar updated 📸");
    },
  });

  return {
    updateName: updateNameMutation.mutate,
    updateAvatar: updateAvatarMutation.mutate,
    isUpdatingName: updateNameMutation.isPending, // 👈 أضيفي هذا
    isUploadingAvatar: updateAvatarMutation.isPending, // 👈 وهذا
  };
}
export function useProfile() {
  const userId = useSelector((state) => state.auth.user?.id);

  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId),
    enabled: !!userId, // مهم جدًا
    staleTime: 1000 * 60 * 5, // 5 دقائق
  });
}
