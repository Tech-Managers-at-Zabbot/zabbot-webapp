import { z } from "zod";

export const waitingListSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .trim()
    .nonempty("Email is required"),
  name: z.string().trim().nonempty('Name required'),
  country: z.string().trim().nonempty('Please Select Country'),
  sendUpdates: z.boolean().default(false),
  betaTest: z.boolean().default(false),
  contributeRecordings: z.boolean().default(false)
}).refine(
  (data) => data.sendUpdates || data.betaTest || data.contributeRecordings, 
  {
    message: "Please select at least one option",
    path: ["sendUpdates"]
  }
);