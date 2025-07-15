import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Save,
  Send,
  CheckCircle,
  Bot,
  Download as DownloadIcon,
  Loader,
} from "lucide-react";

export default function CreateJob() {
  const navigate = useNavigate();
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const handleGenerateAI = async () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      setIsGeneratingAI(false);
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 bg-gray-50 min-h-full">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/jobs")}
              className="text-gray-700 border-gray-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                Create New Job Posting
              </h1>
              <p className="text-gray-600">
                Create a comprehensive job posting to attract the right
                candidates
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Quick Actions
                </h3>
                <p className="text-sm text-gray-600">
                  Speed up your job posting creation
                </p>
              </div>
              <div className="space-y-3">
                <Button
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white justify-start"
                  onClick={handleGenerateAI}
                  disabled={isGeneratingAI}
                >
                  {isGeneratingAI ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Bot className="mr-2 h-4 w-4" />
                  )}
                  {isGeneratingAI ? "Generating..." : "Generate with AI"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-gray-700 border-gray-200"
                >
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Import Description
                </Button>
              </div>
            </div>

            {/* Publishing Settings */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Publishing Settings
                </h3>
                <p className="text-sm text-gray-600">
                  Control how your job posting appears
                </p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Post to job boards
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border border-gray-200 rounded">
                      <span className="text-sm">LinkedIn</span>
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex items-center justify-between p-2 border border-gray-200 rounded">
                      <span className="text-sm">Indeed</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Basic Information
                </h3>
              </div>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      placeholder="Please enter the job title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Please select a department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Please enter the location"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employmentType">Employment Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Please select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Job Description
                </h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobSummary">Job Summary</Label>
                  <Textarea
                    id="jobSummary"
                    placeholder="Provide a brief overview of the role and what the candidate will be responsible for..."
                    className="min-h-[120px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsibilities">Key Responsibilities</Label>
                  <Textarea
                    id="responsibilities"
                    placeholder="List the main responsibilities and duties of this position..."
                    className="min-h-[120px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirements">
                    Requirements & Qualifications
                  </Label>
                  <Textarea
                    id="requirements"
                    placeholder="Describe the required skills, experience, and qualifications..."
                    className="min-h-[120px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredSkills">
                    Preferred Skills (Optional)
                  </Label>
                  <Textarea
                    id="preferredSkills"
                    placeholder="List any nice-to-have skills or experience that would be beneficial..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            {/* Compensation & Benefits */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Compensation & Benefits
                </h3>
              </div>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="salaryMin">Minimum Salary</Label>
                    <Input
                      id="salaryMin"
                      placeholder="e.g., $80,000"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salaryMax">Maximum Salary</Label>
                    <Input
                      id="salaryMax"
                      placeholder="e.g., $120,000"
                      type="text"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefits Package</Label>
                  <Textarea
                    id="benefits"
                    placeholder="Describe the benefits package including health insurance, retirement plans, PTO, etc..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workArrangement">Work Arrangement</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work arrangement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additionalPerks">
                    Additional Perks (Optional)
                  </Label>
                  <Textarea
                    id="additionalPerks"
                    placeholder="Mention any additional perks like flexible hours, learning budget, gym membership, etc..."
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/jobs")}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button variant="outline" className="flex-1">
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                <Button
                  className="flex-1 bg-gray-800 hover:bg-gray-900"
                  onClick={() => navigate("/jobs")}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Publish Job
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
