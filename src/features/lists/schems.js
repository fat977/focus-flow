import { z } from "zod";

export const listSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "List name is required")
    .min(3, "List name must be at least 3 characters")
    .max(50, "List name must be less than 50 characters"),
});
