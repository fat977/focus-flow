import { registerSchema } from "../schema";
import SocialAuthBtns from "./SocialAuthBtns";

import { useAuthForm } from "../hooks/useAuthForm";
import { registerApi } from "../api/auth.api";
import { Button, Input } from "@/components/ui";
import { Link } from "react-router-dom";
import FormImgSection from "./FormImgSection";

export default function RegisterForm() {
  const { register, handleSubmit, errors, isPending, serverError } =
    useAuthForm(registerSchema, registerApi);

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
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input
              type="text"
              register={register}
              name="fullName"
              placeholder="Full Name"
              error={errors.fullName?.message}
            />
            <Input
              type="email"
              register={register}
              name="email"
              placeholder="name@example.com"
              error={errors.email?.message}
            />
            <Input
              register={register}
              name="password"
              type="password"
              placeholder="Password"
              error={errors.password?.message}
            />
            <Input
              register={register}
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              error={errors.confirmPassword?.message}
            />

            {serverError && (
              <p className="bg-(--danger)/10 text-(--danger) p-2 rounded">
                {serverError}
              </p>
            )}

            <Button type="submit" className="justify-center " fullWidth isPending={isPending}>
              Create Account
            </Button>
          </form>

          {/* Social Auth */}
          <SocialAuthBtns />

          {/* Footer */}
          <Link
            to="/login"
            className="mt-6 sm:mt-8 text-sm sm:text-base text-(--grey-700) hover:underline text-center"
          >
            Already have an account?{" "}
            <span className="text-(--brand-600)">Log In</span>
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <FormImgSection />
    </div>
  );
}
