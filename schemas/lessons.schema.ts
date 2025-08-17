import { Level } from "@/types/enums";
import z from "zod";


export const courseSchema = z.object({
  title: z
    .string()
    .min(1, "Course title is required")
    .min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
  languageId: z.string().min(1, "Please select a language"),
  level: z.nativeEnum(Level, {
    errorMap: () => ({ message: "Please select a level" }),
  }),
  estimatedDuration: z
    .number()
    .min(1, "Estimated duration must be at least 1 minute")
    .optional(),
  tags: z.array(z.string()).optional(),
  prerequisites: z.array(z.string()).optional(),
});

export const lessonSchema = z.object({
  title: z
    .string()
    .min(1, "Lesson title is required")
    .min(3, "Title must be at least 3 characters"),
  description: z.string().min(1, "Description is required"),
  orderNumber: z.number().min(1, "Order must be at least 1"),
  contents: z.array(z.any()).min(1, "A lesson must have at least one content item")
});

export const contentSchema = z.object({
  translation: z.string().min(1, "Translation is required"),
});