import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { z } from "zod";
import { AuthLayout } from "@/components/AuthLayout";

// Validation schema using Zod
const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Name must only contain alphabetic characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  contactNumber: z
    .string()
    .regex(/^\d+$/, { message: "Contact number must only contain digits" })
    .min(10, { message: "Contact number must be at least 10 digits" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
  confirmPassword: z.string(),
  rememberMe: z.boolean().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signup } = useAuth();
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const validateField = (field: keyof SignupFormData, value: any): string => {
    try {
      // Create a single-field validation based on the field type
      let fieldValidation: z.ZodType<any>;
      
      switch (field) {
        case 'name':
          fieldValidation = z.string()
            .min(2, { message: "Name must be at least 2 characters long" })
            .regex(/^[a-zA-Z\s]+$/, { message: "Name must only contain alphabetic characters" });
          break;
        case 'email':
          fieldValidation = z.string().email({ message: "Please enter a valid email address" });
          break;
        case 'contactNumber':
          fieldValidation = z.string()
            .regex(/^\d+$/, { message: "Contact number must only contain digits" })
            .min(10, { message: "Contact number must be at least 10 digits" });
          break;
        case 'password':
          fieldValidation = z.string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
            .regex(/[0-9]/, { message: "Password must contain at least one number" })
            .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" });
          break;
        case 'confirmPassword':
          fieldValidation = z.string();
          break;
        case 'rememberMe':
          fieldValidation = z.boolean().optional();
          break;
        default:
          return "Unknown field";
      }
      
      fieldValidation.parse(value);
      return "";
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0].message;
      }
      return "Validation error";
    }
  };

  const validateConfirmPassword = (): string => {
    if (formData.password !== formData.confirmPassword) {
      return "Passwords don't match";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));

    if (name === "confirmPassword") {
      const error = validateConfirmPassword();
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    } else {
      const error = validateField(name as keyof SignupFormData, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError("");
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    
    Object.keys(formData).forEach(key => {
      if (key !== "rememberMe") {
        const error = validateField(key as keyof SignupFormData, formData[key as keyof SignupFormData]);
        if (error) newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.keys(newErrors).length === 0) {
      try {
        // Register the user using auth context
        await signup(
          formData.name,
          formData.email,
          formData.contactNumber,
          formData.password
        );
        
        // Get redirect path from location state or default to dashboard
        const from = (location.state as any)?.from?.pathname || "/";
        navigate(from, { replace: true });
      } catch (error) {
        // Handle registration error
        setAuthError("Registration failed. Please try again.");
        console.error("Registration error:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="w-full shadow-lg border-0">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-gray-900">Create an Account</CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Sign up to access the hiring platform
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.name ? "border-red-500" : ""}
              />
              {touchedFields.name && errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@domain.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email ? "border-red-500" : ""}
              />
              {touchedFields.email && errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber" className="text-sm font-medium">
                Contact Number
              </Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                placeholder="Enter your contact number"
                value={formData.contactNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.contactNumber ? "border-red-500" : ""}
              />
              {touchedFields.contactNumber && errors.contactNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.password ? "border-red-500" : ""}
              />
              {touchedFields.password && errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {touchedFields.confirmPassword && errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="rememberMe" 
                name="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({
                    ...prev,
                    rememberMe: checked === true
                  }))
                }
              />
              <Label
                htmlFor="rememberMe"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gray-800 hover:bg-gray-900"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-gray-600 pt-0">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 hover:underline ml-1">
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
