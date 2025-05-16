import { z } from "zod";

export const waitingListSchema = z.object({
  email: z.string()
    .trim()
    .nonempty("Email is required")
    .max(254, "Email cannot be longer than 254 characters")
    .email("Please enter a valid email address"),
  name: z.string()
    .trim()
    .nonempty('Name is required')
    .max(100, "Name cannot be longer than 100 characters"),
  country: z.string()
    .trim()
    .nonempty('Please select your country'),
  sendUpdates: z.boolean().default(false),
  betaTest: z.boolean().default(false),
  contributeSkills: z.boolean().default(false)
}).refine(
  (data) => data.sendUpdates || data.betaTest || data.contributeSkills, 
  {
    message: "Please select at least one option",
    path: ["sendUpdates"]
  }
);