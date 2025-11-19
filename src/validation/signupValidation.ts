import { z } from "zod";

export const caregiverSignupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),

  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(6)
    .max(15)
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
      "Password must contain uppercase, lowercase, number and be 6–15 characters"
    ),

  confirmPassword: z.string(),

  dateOfBirth: z.string().min(1, "Date of birth required"),

  gender: z.string().min(1, "Gender required"),
  state: z.string().min(1, "State required"),
  city: z.string().min(1, "City required"),
  zipcode: z.string().min(1, "Zipcode required"),
  street: z.string().min(1, "Street required"),

  phoneNumber: z.string().min(10, "Phone number too short"),

  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept terms",
  }),
});

// Cross-field validation
export const caregiverSignupValidator = caregiverSignupSchema.superRefine(
  (data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      });
    }
  }
);
