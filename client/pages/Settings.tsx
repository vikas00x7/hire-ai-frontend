import React, { useState, useRef } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import {
  settingsFormSchema,
  passwordUpdateSchema,
  type SettingsFormValues,
  type PasswordUpdateValues,
  isValidImageType,
  isValidFileSize,
} from "@/lib/validations/settingsValidation";
import {
  Settings as SettingsIcon,
  Shield,
  Eye,
  EyeOff,
  Upload,
  Camera,
  AlertCircle,
} from "lucide-react";

export default function Settings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Profile form
  const profileForm = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bio: ""
    },
    mode: "onChange", // Validate on change for immediate feedback
  });

  // Password form
  const passwordForm = useForm<PasswordUpdateValues>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
    mode: "onChange", // Validate on change for immediate feedback
  });

  // Handle profile picture upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageError(null);
    
    if (!file) return;
    
    // Validate file type
    if (!isValidImageType(file)) {
      setImageError("Invalid file type. Only JPG, PNG, or GIF files are allowed.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    
    // Validate file size
    if (!isValidFileSize(file)) {
      setImageError("File size exceeds the maximum limit of 2MB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    
    // File is valid - would handle upload here
    toast({
      title: "Profile picture selected",
      description: "Your profile picture is ready to be uploaded.",
    });
  };

  // Handle profile form submission
  const onProfileSubmit = (data: SettingsFormValues) => {
    console.log("Profile form data:", data);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  // Handle password form submission
  const onPasswordSubmit = (data: PasswordUpdateValues) => {
    console.log("Password form data:", data);
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    });
  };

  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 bg-gray-50 min-h-full">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
              <SettingsIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Account Settings
              </h1>
              <p className="text-gray-600">
                Manage your account information and preferences
              </p>
            </div>
            <div className="ml-auto flex gap-3">
              <Button 
                className="bg-gray-800 hover:bg-gray-900 text-white"
                onClick={profileForm.handleSubmit(onProfileSubmit)}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Profile Information
              </h3>
              <p className="text-sm text-gray-600">
                Update your personal details and contact information
              </p>
            </div>

            <Form {...profileForm}>
              <form className="space-y-6">
                {/* Profile Picture Upload */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-900">
                    Profile Picture
                  </h4>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      <Camera className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/jpeg,image/jpg,image/png,image/gif"
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        className="text-gray-700 border-gray-200"
                        onClick={triggerFileInput}
                        type="button"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload New Picture
                      </Button>
                      <p className="text-xs text-gray-500">
                        JPG, PNG or GIF. Max size of 2MB.
                      </p>
                      {imageError && (
                        <div className="flex items-center gap-2 text-red-500 text-xs mt-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{imageError}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={profileForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your first name"
                            className="border-gray-200 focus:border-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your last name"
                            className="border-gray-200 focus:border-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email address"
                          className="border-gray-200 focus:border-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={profileForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your phone number"
                          className="border-gray-200 focus:border-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={profileForm.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Bio
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Write a short bio about yourself (max 500 characters)"
                          className="min-h-[100px] border-gray-200 focus:border-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>

          {/* Security Settings */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Security Settings
              </h3>
              <p className="text-sm text-gray-600">
                Protect your account with security options
              </p>
            </div>

            <Form {...passwordForm}>
              <form className="space-y-6">
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Current Password
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Enter your current password"
                            className="border-gray-200 focus:border-gray-300 pr-10"
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? (
                            <Eye className="h-4 w-4 text-gray-400" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        New Password
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type={showNewPassword ? "text" : "password"}
                            placeholder="8-20 chars with upper, lower, number, special char"
                            className="border-gray-200 focus:border-gray-300 pr-10"
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <Eye className="h-4 w-4 text-gray-400" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Confirm New Password
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Re-enter your new password"
                            className="border-gray-200 focus:border-gray-300 pr-10"
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <Eye className="h-4 w-4 text-gray-400" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <Button 
                    type="button"
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white"
                    onClick={passwordForm.handleSubmit(onPasswordSubmit)}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Update Security Settings
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
