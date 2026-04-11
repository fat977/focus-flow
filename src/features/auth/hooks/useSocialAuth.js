import { useMutation } from "@tanstack/react-query";
import { loginWithProviderApi } from "../api/auth.api"; // الفانكشن اللي عملناها سوا

export const useSocialAuth = () => {
  // ملاحظة: شلنا الـ dispatch والـ navigate لأن الـ authListener 
  // هو اللي هيهندل الدخول أول ما الصفحة تعمل ريفريش وترجع من جوجل/جيت هاب.

  const socialMutation = useMutation({
    mutationFn: (provider) => loginWithProviderApi(provider),
    onError: (error) => {
      console.error("Social Auth Error:", error.message);
    }
  });

  return {
    // بنمرر اسم الـ provider للفانكشن
    loginWithGoogle: () => socialMutation.mutate("google"),
    loginWithGithub: () => socialMutation.mutate("github"),
    
    // التحديث لـ TanStack Query v4/v5 (استخدام isPending بدل isLoading)
    isLoading: socialMutation.isPending || socialMutation.isLoading,
    error: socialMutation.error?.message, 
  };
};