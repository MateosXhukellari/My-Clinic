import { z } from "zod";
import { CountryCode, parsePhoneNumberFromString } from "libphonenumber-js";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Passwords do not match"),
    role: z.enum(["patient", "doctor"]),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  surname: z.string().min(2, "Surname must be at least 2 characters"),
  age: z
    .number()
    .min(16, "Must be at least 16 years or older to book a meeting "),
  email: z.string().email("Invalid email"),
  date: z
    .date()
    .nullable()
    .refine((d) => d instanceof Date && !isNaN(d.getTime()), {
      message: "Please select a date",
    }),
  time: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, "Please enter a valid time"),
});

export const paymentSchema = z
  .object({
    streetAddress: z.string().nonempty("Street Address is required"),
    city: z.string().nonempty("City is required"),
    state: z.string().nonempty("State is required"),
    method: z.enum(["video", "chat", "upload"], {
      required_error: "You must select a consultation method",
    }),
    region: z.string().min(2, "Region is required"),
    telephone: z.string().min(10, "Phone number is required"),
    language: z
      .string()
      .min(1, "Please select a language for the consultation"),
  })
  .refine(
    (data) => {
      const tel = String(data.telephone);
      const region = data.region as CountryCode;
      const phoneNumber = parsePhoneNumberFromString(tel, region);
      return phoneNumber?.isValid() ?? false;
    },
    {
      message: "Invalid phone number for selected region",
      path: ["telephone"],
    }
  );

export type LoginForm = z.infer<typeof loginSchema>;
export type SignupForm = z.infer<typeof signupSchema>;
export type ReserveForm = z.infer<typeof formSchema>;
export type PaymentForm = z.infer<typeof paymentSchema>;
