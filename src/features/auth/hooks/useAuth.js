// hooks/useAuth.js
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../authSlice";

//import { formatFirebaseError } from "../../../utils/firebaseErrors";

export const useAuth = (authApiFn) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: authApiFn,
    onSuccess: (user) => {
      dispatch(
        setUser({
          uid: user.id,
          email: user.email,
          fullName: user.fullName,
        }),
      );
      navigate("/dashboard");
    },
  });

  return {
    ...mutation,
    serverError: mutation.error?.message,
  };
};

