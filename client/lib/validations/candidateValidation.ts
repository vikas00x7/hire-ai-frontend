import * as z from "zod";

/**
 * Validation schema for candidate form with strict validation rules
 * - Full Name: Only alphabets and spaces allowed
 * - Email: Standard email format validation
 * - Phone: Numeric values only, converted to Indian format on display
 * - Position: Required, no specific format constraints
 * - Experience: Must be a number between 0 and 50
 */
export const candidateFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Full name can only contain alphabets and spaces"),
  
  email: z
    .string()
    .min(5, "Email must be at least 5 characters")
    .email("Please enter a valid email address"),
  
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^[0-9+\-\s]+$/, "Phone number can only contain numbers, +, - and spaces"),
  
  position: z
    .string()
    .min(3, "Position must be at least 3 characters")
    .max(100, "Position must be less than 100 characters"),
  
  experience: z
    .string()
    .min(1, "Experience is required")
    .refine((val) => !isNaN(Number(val)), "Experience must be a number")
    .refine((val) => Number(val) >= 0 && Number(val) <= 50, "Experience must be between 0 and 50 years"),
});

export type CandidateFormValues = z.infer<typeof candidateFormSchema>;

/**
 * Formats a phone number to the Indian standard format (+91-XXXXXXXXXX)
 * Handles various input formats and converts them to the standard format
 * 
 * @param phoneNumber The phone number to format
 * @returns Formatted phone number in Indian format
 */
export const formatPhoneNumberToIndianFormat = (phoneNumber: string | undefined): string => {
  if (!phoneNumber) return "+91-XXXXXXXXXX";
  
  // Strip all non-numeric characters
  const digitsOnly = phoneNumber.replace(/\D/g, "");
  
  // Check if the number already has a country code
  // For simplicity, we're assuming if length > 10, it has a country code
  const hasCountryCode = digitsOnly.length > 10;
  
  // For Indian numbers, keep only the last 10 digits
  const last10Digits = digitsOnly.slice(-10);
  
  // Format as +91-XXXXXXXXXX
  return `+91-${last10Digits}`;
};
