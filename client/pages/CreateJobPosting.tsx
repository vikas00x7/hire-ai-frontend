import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Save,
  Send,
  CheckCircle,
  DollarSign,
  Target,
  Plus,
  Lightbulb,
  Globe,
} from "lucide-react";

export default function CreateJobPosting() {
  return (
    <DashboardLayout>
      <div className="space-y-6 bg-gray-50 min-h-full">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                Create Job Posting
              </h1>
              <p className="text-gray-600">
                Create a new job posting with AI-powered recommendations
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="text-gray-700 border-gray-200"
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button className="bg-gray-800 hover:bg-gray-900 text-white">
                <Send className="mr-2 h-4 w-4" />
                Publish Job
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Basic Information
                </h3>
                <p className="text-sm text-gray-600">
                  Essential details about the position
                </p>
              </div>

              <div className="grid gap-6">
                {/* First Row */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle" className="text-sm font-medium">
                      Job Title
                    </Label>
                    <Input
                      id="jobTitle"
                      placeholder="e.g. Senior Frontend Developer"
                      className="border-gray-200 focus:border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-sm font-medium">
                      Department
                    </Label>
                    <Select>
                      <SelectTrigger className="border-gray-200">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Second Row */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium">
                      Location
                    </Label>
                    <Input
                      id="location"
                      placeholder="e.g. San Francisco, CA"
                      className="border-gray-200 focus:border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="employmentType"
                      className="text-sm font-medium"
                    >
                      Employment Type
                    </Label>
                    <Select>
                      <SelectTrigger className="border-gray-200">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Third Row */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="experienceLevel"
                      className="text-sm font-medium"
                    >
                      Experience Level
                    </Label>
                    <Select>
                      <SelectTrigger className="border-gray-200">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                        <SelectItem value="lead">Lead</SelectItem>
                        <SelectItem value="executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="hiringManager"
                      className="text-sm font-medium"
                    >
                      Hiring Manager
                    </Label>
                    <Select>
                      <SelectTrigger className="border-gray-200">
                        <SelectValue placeholder="Select manager" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        <SelectItem value="mike">Mike Chen</SelectItem>
                        <SelectItem value="emily">Emily Rodriguez</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Job Description
                </h3>
                <p className="text-sm text-gray-600">
                  Detailed information about the role
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="jobSummary" className="text-sm font-medium">
                    Job Summary
                  </Label>
                  <Textarea
                    id="jobSummary"
                    placeholder="Provide a brief overview of the role and what the candidate will be doing..."
                    className="border-gray-200 focus:border-gray-300 min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="keyResponsibilities"
                    className="text-sm font-medium"
                  >
                    Key Responsibilities
                  </Label>
                  <Textarea
                    id="keyResponsibilities"
                    placeholder="List the main responsibilities and duties for this position..."
                    className="border-gray-200 focus:border-gray-300 min-h-[120px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations Sidebar */}
          <div className="space-y-6">
            {/* AI Recommendations */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  AI Recommendations
                </h3>
                <p className="text-sm text-gray-600">
                  Smart suggestions to improve your posting
                </p>
              </div>

              <div className="space-y-4">
                {/* Optimize job title */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Lightbulb className="h-3 w-3 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-900 mb-1">
                        Optimize job title
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">
                        Consider "Senior Frontend Developer" for better
                        visibility
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        View Suggestion
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Salary benchmark */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <DollarSign className="h-3 w-3 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-900 mb-1">
                        Salary benchmark
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">
                        Market rate: $135k - $190k for this role
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Skill matching */}
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Target className="h-3 w-3 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-900 mb-1">
                        Skill matching
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">
                        Add "GraphQL" to improve candidate quality
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-purple-600 border-purple-200 hover:bg-purple-50"
                      >
                        Add Skill
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Publishing Settings */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Publishing Settings
                </h3>
                <p className="text-sm text-gray-600">
                  Control how and where your posting appears
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Post to Job Boards
                  </Label>
                  <p className="text-xs text-gray-600">
                    Automatically post to external sites
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">
                            Li
                          </span>
                        </div>
                        <span className="text-sm font-medium">LinkedIn</span>
                      </div>
                      <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                          <span className="text-xs font-bold text-green-600">
                            In
                          </span>
                        </div>
                        <span className="text-sm font-medium">Indeed</span>
                      </div>
                      <div className="w-4 h-4 bg-green-600 rounded-sm flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                          <Globe className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium">
                          Company Site
                        </span>
                      </div>
                      <div className="w-4 h-4 bg-purple-600 rounded-sm flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
