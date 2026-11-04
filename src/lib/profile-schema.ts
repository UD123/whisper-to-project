import { z } from "zod";

export const profileSchema = z.object({
  full_name: z.string().trim().max(120),
  company: z.string().trim().max(160),
  phone: z.string().trim().max(40),
}).strict();

export type ProfileFields = z.infer<typeof profileSchema>;