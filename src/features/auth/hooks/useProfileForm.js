import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../schema";
import { useUpdateProfile } from "./useUpdate";
import { useEffect } from "react";
export const useProfileForm = (profile) => {
  const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: profile?.fullName || "",
    },
  });
  useEffect(() => {
    if (profile) {
      reset({ fullName: profile.fullName });
    }
  }, [profile, reset]);

  const { updateName, isUpdatingName } = useUpdateProfile(); // لم نعد بحاجة لتمرير ID هنا

  const onSubmit = (data) => {
    // نمرر الاسم فقط، الهوك سيتكفل بالباقي
    updateName(data.fullName, {
      onSuccess: (updatedData) => {
        reset({ fullName: updatedData.fullName });
      }
    });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isPending: isUpdatingName,
    isDirty,
  };
};