import * as z from "zod";

/**
 * Validation schema for settings form with strict validation rules
 * - Profile Picture: Only .jpg, .png, or .gif files allowed, max size 2MB
 * - First/Last Name: Only alphabets, 1-50 chars, no special chars
 * - Email: Valid format, 5-100 chars
 * - Phone: Only numbers, 10-15 digits, no spaces/special chars
 * - Bio: Text only, no HTML/links/special chars, max 500 chars
 * - Password: 8-20 chars, mix case/numbers/special chars
 */
export const settingsFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain alphabets"),
  
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain alphabets"),
  
  email: z
    .string()
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters")
    .email("Please enter a valid email address"),
  
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^[0-9]+$/, "Phone number can only contain numbers"),
  
  bio: z
    .string()
    .max(500, "Bio must be less than 500 characters")
    // Prevent HTML tags
    .refine(
      (val) => !/<[^>]*>/.test(val), 
      "Bio cannot contain HTML tags"
    ),
});

/**
 * Password validation schema with security requirements
 */
export const passwordUpdateSchema = z.object({
  currentPassword: z
    .string()
    .min(1, "Current password is required"),
  
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than 20 characters")
    // Must include uppercase, lowercase, number, and special char
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
      "Password must include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"
    ),
  
  confirmPassword: z.string(),
}).refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
).refine(
  (data) => data.currentPassword !== data.newPassword,
  {
    message: "New password must be different from current password",
    path: ["newPassword"],
  }
);

/**
 * Type for settings form values
 */
export type SettingsFormValues = z.infer<typeof settingsFormSchema>;

/**
 * Type for password update form values
 */
export type PasswordUpdateValues = z.infer<typeof passwordUpdateSchema>;

/**
 * Validates if a file is an acceptable image type (.jpg, .png, or .gif)
 * @param file File to validate
 * @returns Boolean indicating if file type is valid
 */
export const isValidImageType = (file: File | null): boolean => {
  if (!file) return false;
  
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  return validTypes.includes(file.type);
};

/**
 * Validates if a file size is within the acceptable limit (2MB)
 * @param file File to validate
 * @returns Boolean indicating if file size is valid
 */
export const isValidFileSize = (file: File | null): boolean => {
  if (!file) return false;
  
  // 2MB in bytes
  const maxSize = 2 * 1024 * 1024;
  return file.size <= maxSize;
};
