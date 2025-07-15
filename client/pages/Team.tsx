import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ViewModal } from "@/components/ViewModal";
import { FilterModal } from "@/components/FilterModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as XLSX from "xlsx";
import {
  Users,
  Filter,
  Download,
  Plus,
  Search,
  MessageSquare,
  Eye,
  Calendar,
  CheckCircle,
  Info,
  Building,
  TrendingUp,
  Award,
  Edit,
  Trash2,
  Upload,
  Camera,
} from "lucide-react";

const metricsData = [
  {
    title: "Total Members",
    value: "28",
    subtitle: "Active this week",
    icon: Users,
  },
  {
    title: "Active",
    value: "25",
    subtitle: "This week now",
    icon: TrendingUp,
  },
  {
    title: "Departments",
    value: "6",
    subtitle: "Across all team",
    icon: Building,
  },
  {
    title: "Performance",
    value: "94%",
    subtitle: "Avg team score",
    icon: Award,
  },
];

const teamMembers = [
  {
    id: 1,
    name: "Alex Wilson",
    designation: "Engineering Manager",
    department: "Engineering",
    joinDate: "Jan 2023",
    experience: "8 years",
    avatar: "AW",
  },
  {
    id: 2,
    name: "Sarah Davis",
    designation: "Senior Designer",
    department: "Design",
    joinDate: "Mar 2023",
    experience: "3 years",
    avatar: "SD",
  },
  {
    id: 3,
    name: "Marcus Kim",
    designation: "Full Stack Developer",
    department: "Engineering",
    joinDate: "Feb 2023",
    experience: "4 years",
    avatar: "MK",
  },
  {
    id: 4,
    name: "James Rodriguez",
    designation: "Product Manager",
    department: "Product",
    joinDate: "Dec 2022",
    experience: "6 years",
    avatar: "JR",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    designation: "HR Specialist",
    department: "Human Resources",
    joinDate: "Apr 2024",
    experience: "3 years",
    avatar: "LT",
  },
  {
    id: 6,
    name: "Robert Nelson",
    designation: "DevOps Engineer",
    department: "Engineering",
    joinDate: "May 2023",
    experience: "7 years",
    avatar: "RN",
  },
];

export default function Team() {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState({});

  const exportTeamData = () => {
    // Prepare team data for export
    const exportData = teamMembers.map((member) => ({
      Name: member.name,
      Designation: member.designation,
      Department: member.department,
      "Join Date": member.joinDate,
      Experience: member.experience,
    }));

    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    XLSX.utils.book_append_sheet(wb, ws, "Team Data");

    // Generate filename with current date
    const date = new Date().toISOString().split("T")[0];
    const filename = `team-data-${date}.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);
  };

  const filterFields = [
    {
      key: "department",
      label: "Department",
      placeholder: "Select Department",
      options: [
        { value: "engineering", label: "Engineering" },
        { value: "design", label: "Design" },
        { value: "product", label: "Product" },
        { value: "hr", label: "Human Resources" },
        { value: "marketing", label: "Marketing" },
      ],
    },
    {
      key: "experience",
      label: "Experience",
      placeholder: "Select Experience",
      options: [
        { value: "0-2", label: "0-2 years" },
        { value: "3-5", label: "3-5 years" },
        { value: "6+", label: "6+ years" },
      ],
    },
  ];

  const handleApplyFilters = (filters: Record<string, string>) => {
    setAppliedFilters(filters);
    // Here you would typically filter the teamMembers based on the filters
    console.log("Applied filters:", filters);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 bg-gray-50 min-h-full">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                Team
              </h1>
              <p className="text-gray-600">Manage and connect team members</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="text-gray-700 border-gray-200"
                onClick={() => setShowFilterModal(true)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button
                variant="outline"
                className="text-gray-700 border-gray-200"
                onClick={exportTeamData}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Dialog
                open={showAddMemberModal}
                onOpenChange={setShowAddMemberModal}
              >
                <DialogTrigger asChild>
                  <Button className="bg-gray-800 hover:bg-gray-900 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Team Member</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    {/* Profile Picture Upload */}
                    <div className="space-y-4">
                      <h4 className="text-md font-medium text-gray-900">
                        Profile Picture (Optional)
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
                            Upload Picture
                          </Button>
                          <p className="text-xs text-gray-500">
                            JPG, PNG. Max size 2MB.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Basic Information */}
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          placeholder="Enter full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter email address"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter phone number"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience (Years) *</Label>
                        <Input
                          id="experience"
                          type="number"
                          placeholder="e.g., 5"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="department">Department *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="engineering">
                              Engineering
                            </SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="product">Product</SelectItem>
                            <SelectItem value="hr">Human Resources</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="designation">Designation *</Label>
                        <Input
                          id="designation"
                          placeholder="e.g., Senior Developer"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">Role Description</Label>
                      <Textarea
                        id="role"
                        placeholder="Brief description of the role and responsibilities..."
                        className="min-h-[80px]"
                      />
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-2">
                      <Label htmlFor="memberResume">
                        Resume or CV (Optional)
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                        <input
                          type="file"
                          id="memberResume"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                        />
                        <label
                          htmlFor="memberResume"
                          className="cursor-pointer flex flex-col items-center gap-2"
                        >
                          <Upload className="h-8 w-8 text-gray-400" />
                          <div className="text-sm text-gray-600">
                            <span className="font-medium text-blue-600 hover:text-blue-500">
                              Click to upload
                            </span>
                            {" or drag and drop"}
                          </div>
                          <div className="text-xs text-gray-500">
                            PDF, DOC up to 10MB
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setShowAddMemberModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="flex-1 bg-gray-800 hover:bg-gray-900"
                        onClick={() => {
                          // Handle form submission here
                          setShowAddMemberModal(false);
                        }}
                      >
                        Add Member
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metricsData.map((metric, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-600 font-medium">
                      {metric.title}
                    </p>
                    <Info className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                  <p className="text-xs text-gray-500">{metric.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search team members..."
              className="pl-10 border-gray-200 focus:border-gray-300"
            />
          </div>
        </div>

        {/* Team Members List */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Header Row */}
          <div className="flex items-center justify-between p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-4 flex-1">
              <div className="min-w-[200px]">
                <span className="text-sm font-semibold text-gray-700">
                  Name
                </span>
              </div>
              <div className="min-w-[120px]">
                <span className="text-sm font-semibold text-gray-700">
                  Department
                </span>
              </div>
              <div className="min-w-[140px]">
                <span className="text-sm font-semibold text-gray-700">
                  Designation
                </span>
              </div>
              <div className="min-w-[100px]">
                <span className="text-sm font-semibold text-gray-700">
                  Experience
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-sm font-semibold text-gray-700">
                Actions
              </span>
            </div>
          </div>

          <div className="space-y-0">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`flex items-center justify-between p-6 ${
                  index !== teamMembers.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Member Info */}
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" alt={member.name} />
                      <AvatarFallback className="bg-gray-200 text-gray-700">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Joined: {member.joinDate}
                      </p>
                    </div>
                  </div>

                  {/* Department */}
                  <div className="min-w-[120px]">
                    <p className="text-sm text-gray-600">{member.department}</p>
                  </div>

                  {/* Designation */}
                  <div className="min-w-[140px]">
                    <p className="text-sm font-medium text-gray-900">
                      {member.designation}
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="min-w-[100px]">
                    <p className="text-sm font-medium text-gray-900">
                      {member.experience}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-600 border-gray-200 hover:bg-gray-50"
                    onClick={() => {
                      setSelectedMember(member);
                      setViewModalOpen(true);
                    }}
                  >
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="mr-1 h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-6 border-t border-gray-100">
            <p className="text-sm text-gray-600">Showing 1-6 of 28 members</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-gray-600 border-gray-200"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-800 text-white border-gray-800"
              >
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-gray-600 border-gray-200"
              >
                2
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-gray-600 border-gray-200"
              >
                3
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-gray-600 border-gray-200"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal
        open={showFilterModal}
        onOpenChange={setShowFilterModal}
        title="Filter Team Members"
        fields={filterFields}
        onApply={handleApplyFilters}
        initialValues={appliedFilters}
      />

      {/* View Modal */}
      <ViewModal
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
        type="team-member"
        data={selectedMember}
      />
    </DashboardLayout>
  );
}
