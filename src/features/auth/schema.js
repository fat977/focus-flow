import { z } from "zod";

const emailValidation = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Please enter a valid email address");
const passwordValidation = z
  .string()
  .trim()
  .min(1, "Password is required")
  .min(6, "Password must be at least 6 characters")
  .regex(/[a-zA-Z]/, "Password must contain at least one letter");

export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export const registerSchema = loginSchema
  .extend({
    fullName: z
      .string()
      .trim()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name is too long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
});
