import { loginSchema } from "../schema";
import { Link } from "react-router-dom";
import SocialAuthBtns from "./SocialAuthBtns";
import { Button, Input } from "@/components/ui";
import { useAuthForm } from "../hooks/useAuthForm";
import { loginApi } from "../api/auth.api";
import FormImgSection from "./FormImgSection";

function LoginForm() {
  const { register, handleSubmit, errors, isPending, serverError } =
    useAuthForm(loginSchema, loginApi);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full px-2 sm:px-6 lg:px-8 bg-(--grey-0)">
      {/* Form Section */}
      <div className="order-2 lg:order-1 flex h-full items-center justify-center px-4 sm:px-6 lg:px-0">
        <div className="w-full max-w-md px-4 sm:px-6 lg:px-6 py-8 sm:py-10 lg:py-12 flex flex-col bg-(--grey-0) rounded-lg">
          {/* Heading */}
          <div className="heading text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Welcome Back!
            </h2>
            <p className="text-(--grey-400) text-sm sm:text-base">
              Log in to your account to continue managing your tasks
              efficiently.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full py-2">
            <Input
              type="email"
              placeholder="name@example.com"
              name="email"
              register={register}
              error={errors.email?.message}
              className="mb-4"
            />

            <Input
              type="password"
              name="password"
              register={register}
              placeholder="Password"
              error={errors.password?.message}
              className="mb-4"
            />

            {serverError && (
              <p className="bg-(--danger)/10 text-(--danger) p-2 rounded text-sm">
                {serverError}
              </p>
            )}

            {/* Login Button */}
            <div className="py-2">
              <Button
                className="justify-center "
                fullWidth
                type="submit"
                isPending={isPending}
              >
                Login
              </Button>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end py-2">
              <Link
                to="/forgot-password"
                className="text-sm sm:text-base text-(--brand-600) hover:underline opacity-90"
              >
                Forgot Password?
              </Link>
            </div>
          </form>

          {/* Social Auth */}
          <SocialAuthBtns />

          {/* Footer */}
          <Link
            to="/register"
            className="mt-6 sm:mt-8 text-sm sm:text-base text-(--grey-700) hover:underline text-center"
          >
            Don&apos;t have an account?{" "}
            <span className="text-(--brand-600)">Sign Up</span>
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <FormImgSection />
    </div>
  );
}

export default LoginForm;
