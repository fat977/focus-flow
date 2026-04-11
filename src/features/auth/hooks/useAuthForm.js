// hooks/useAuthForm.js
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "./useAuth";

export const useAuthForm = (schema, authApiFn) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });
  const { mutate, isPending, serverError } = useAuth(authApiFn);

  const onSubmit = (data) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
    serverError,
  };
};