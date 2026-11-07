import { z } from "zod";

// Shared rule for the password-recovery form: the new password must be entered
// twice and match before it is sent to the backend.
export const passwordFormSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm: z.string(),
  })
  .refine((value) => value.password === value.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });
