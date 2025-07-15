import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Settings as SettingsIcon,
  Shield,
  Eye,
  EyeOff,
  Upload,
  Camera,
} from "lucide-react";

export default function Settings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
              <Button className="bg-gray-800 hover:bg-gray-900 text-white">
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

            <div className="space-y-6">
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
                    <Button
                      variant="outline"
                      className="text-gray-700 border-gray-200"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Picture
                    </Button>
                    <p className="text-xs text-gray-500">
                      JPG, PNG or GIF. Max size of 2MB.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Please fill in your details"
                    className="border-gray-200 focus:border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Please fill in your details"
                    className="border-gray-200 focus:border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Please fill in your details"
                  className="border-gray-200 focus:border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  placeholder="Please fill in your details"
                  className="border-gray-200 focus:border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Please fill in your details"
                  className="border-gray-200 focus:border-gray-300 min-h-[100px]"
                />
              </div>
            </div>
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

            <div className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="currentPassword"
                  className="text-sm font-medium"
                >
                  Current Password
                </Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Please fill in your details"
                    className="border-gray-200 focus:border-gray-300 pr-10"
                  />
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Please fill in your details"
                    className="border-gray-200 focus:border-gray-300 pr-10"
                  />
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
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Please fill in your details"
                    className="border-gray-200 focus:border-gray-300 pr-10"
                  />
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
              </div>

              <div className="pt-4">
                <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white">
                  <Shield className="mr-2 h-4 w-4" />
                  Update Security Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
