import { z } from "zod";
export const loginSchema = z.object({ email: z.string().email("Enter a valid email"), password: z.string().min(8, "Password must be at least 8 characters") });
export const createUserSchema = z.object({
  full_name: z.string().trim().min(2, "Name is required"), email: z.string().email("Valid email required"),
  password: z.string().min(8, "Min 8 characters"), role: z.enum(["student", "mentor"]) });
export const passwordSchema = z.object({ password: z.string().min(8, "Min 8 characters"), confirm: z.string() })
  .refine(v => v.password === v.confirm, { message: "Passwords do not match", path: ["confirm"] });
export const submissionSchema = z.object({ text: z.string().optional(), link: z.string().optional() })
  .refine(v => !!(v.text?.trim() || v.link?.trim()), { message: "Add a text response or a link" })
  .refine(v => !v.link?.trim() || /^https?:\/\/\S+$/.test(v.link.trim()), { message: "Link must start with http:// or https://" });
