import { z } from "zod";

export const boardSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Project name is required")
    .min(3, "Project name must be at least 3 characters")
    .max(50, "Project name must be less than 50 characters"),
  dueDate: z
    .string()
    .refine((date) => !date || new Date(date) > new Date(), {
      message: "Due date must be in the future",
    })
    .min(1, "Please select a due date"),
  userId: z.string().optional(),
});
