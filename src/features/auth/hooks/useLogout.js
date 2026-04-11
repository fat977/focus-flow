import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../api/auth.api";
import { clearUser } from "../authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      dispatch(clearUser());
      navigate("/login", { replace: true });
    }
  });

  return { logout, isPending };
};