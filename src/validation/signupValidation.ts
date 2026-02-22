import { z } from "zod";



//Caregiver form Validation
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

//Provider form Validation
// Step 1: Representative info
export const providerRepValidator = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    job_title: z.string().min(1,"Job title is required "),
    password: z
      .string()
      .min(6, "Password must be 6–15 characters")
      .max(15)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain uppercase, lowercase, and number"),
    confirm_password: z.string().min(1, "Confirm your password"),
  }).refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  });
  
  // Step 2: Home info
  export const providerHomeInfoValidator = z.object({
    adult_home_name: z.string().min(1, "Home name is required"),
    adult_home_website: z.string().url().optional(),
    adult_home_email: z.string().email("Invalid work email"),
    adult_home_phone: z.string().min(10, "Phone number is required"),
    adult_home_state: z.string().min(1, "State is required"),
    adult_home_city: z.string().min(1, "City is required"),
    adult_home_street: z.string().min(1, "Street is required"),
    adult_home_zipcode: z.string().min(1, "Zipcode is required"),
  });

  //login form validation

export const loginValidator = z.object({
    username: z.string().min(1,"Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
  
  export type ILogin = z.infer<typeof loginValidator>;

  