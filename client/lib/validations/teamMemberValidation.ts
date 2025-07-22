import * as z from "zod";
import { formatPhoneNumberToIndianFormat } from "./candidateValidation";

/**
 * Validation schema for team member form with strict validation rules
 * - Full Name: Only alphabets and spaces allowed, minimum 3 characters
 * - Email: Standard email format validation
 * - Phone: Indian format validation (10 digits starting with 6-9 or with +91 prefix)
 * - Designation: Required field
 * - Department: Required field selection 
 * - Experience: Must be a number
 */
export const teamMemberFormSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
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
    .regex(
      /^(?:\+91[- ]?)?[6789]\d{9}$/, 
      "Phone must be in Indian format (e.g., +91-9876543210 or 10 digits starting with 6-9)"
    ),
  
  designation: z
    .string()
    .min(2, "Designation is required")
    .max(100, "Designation must be less than 100 characters"),
  
  department: z
    .string()
    .min(1, "Department selection is required"),
  
  experience: z
    .string()
    .min(1, "Experience is required")
    .refine((val) => !isNaN(Number(val)), "Experience must be a number")
    .refine((val) => Number(val) >= 0 && Number(val) <= 50, "Experience must be between 0 and 50 years"),
});

export type TeamMemberFormValues = z.infer<typeof teamMemberFormSchema>;

/**
 * Validates if a phone number follows the Indian phone number format
 * Valid formats: +91-XXXXXXXXXX, +91XXXXXXXXXX, or 10-digit number starting with 6-9
 * 
 * @param phoneNumber The phone number to validate
 * @returns Boolean indicating if the phone number is valid
 */
export const isValidIndianPhoneNumber = (phoneNumber: string): boolean => {
  // Remove spaces and hyphens for validation
  const cleaned = phoneNumber.replace(/[\s-]/g, "");
  
  // Pattern for Indian mobile numbers
  // 1. +91 followed by a 10-digit number starting with 6, 7, 8, or 9
  // 2. 10-digit number starting with 6, 7, 8, or 9
  const pattern = /^(?:\+91)?[6789]\d{9}$/;
  
  return pattern.test(cleaned);
};

// Re-export the formatting function for convenience
export { formatPhoneNumberToIndianFormat };
