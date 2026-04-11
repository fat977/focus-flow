import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../authSlice";
import toast from "react-hot-toast";
import { deleteAccountApi } from "../api/auth.api";

export const useDeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: deleteAccount, isPending } = useMutation({
    mutationFn: (userId) => deleteAccountApi(userId),
    onSuccess: () => {
      // هنا بنضف الـ State بعد ما السيرفر أكد الحذف
      dispatch(clearUser());
      toast.success("تم حذف الحساب بنجاح");
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error(`فشل الحذف: ${err.message}`);
    }
  });

  return { deleteAccount, isPending };
};