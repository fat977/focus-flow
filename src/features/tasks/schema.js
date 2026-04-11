import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Project name is required")
    .min(3, "Project name must be at least 3 characters")
    .max(50, "Project name must be less than 50 characters"),
  userId: z.string().optional(),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"], {
    errorMap: () => ({ message: "Please select a priority level" }),
  }),
  dueDate: z
    .string()
    .refine((date) => !date || new Date(date) > new Date(), {
      message: "Due date must be in the future",
    })
    .min(1, "Please select a due date"),
});
