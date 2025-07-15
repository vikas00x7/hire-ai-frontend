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
import * as XLSX from "xlsx";
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
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  Filter,
  Download,
  Users,
  Eye,
  MessageSquare,
  Calendar,
  CheckCircle,
  Info,
  X,
  Upload,
  FileText,
} from "lucide-react";

const metricsData = [
  {
    title: "Total Candidates",
    value: "1,247",
    subtitle: "20.1% from last month",
    icon: Users,
  },
  {
    title: "Interviewed",
    value: "342",
    subtitle: "16 shortlisted",
    icon: Calendar,
  },
  {
    title: "Hired",
    value: "76",
    subtitle: "This month",
    icon: CheckCircle,
  },
  {
    title: "Avg Match Score",
    value: "87%",
    subtitle: "Above industry avg",
    icon: Info,
  },
];

const candidatesData = [
  {
    id: 1,
    name: "Michael Johnson",
    position: "Senior Frontend Developer",
    appliedDate: "2 days ago",
    status: "New",
    statusColor: "bg-blue-100 text-blue-800",
    matchScore: 98,
    experience: "5 years",
  },
  {
    id: 2,
    name: "Sarah Chen",
    position: "UX Designer",
    appliedDate: "1 week ago",
    status: "Screening",
    statusColor: "bg-yellow-100 text-yellow-800",
    matchScore: 96,
    experience: "3 years",
  },
  {
    id: 3,
    name: "David Rodriguez",
    position: "Backend Engineer",
    appliedDate: "3 days ago",
    status: "Interview",
    statusColor: "bg-green-100 text-green-800",
    matchScore: 94,
    experience: "7 years",
  },
  {
    id: 4,
    name: "Emily Martinez",
    position: "Product Manager",
    appliedDate: "5 days ago",
    status: "New",
    statusColor: "bg-blue-100 text-blue-800",
    matchScore: 92,
    experience: "4 years",
  },
  {
    id: 5,
    name: "James Liu",
    position: "DevOps Engineer",
    appliedDate: "1 week ago",
    status: "Screening",
    statusColor: "bg-yellow-100 text-yellow-800",
    matchScore: 89,
    experience: "6 years",
  },
];

export default function Candidates() {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddCandidateForm, setShowAddCandidateForm] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const exportCandidatesData = () => {
    // Prepare candidates data for export
    const exportData = candidatesData.map((candidate) => ({
      Name: candidate.name,
      Position: candidate.position,
      "Applied Date": candidate.appliedDate,
      Status: candidate.status,
      "Match Score": `${candidate.matchScore}%`,
      Experience: candidate.experience,
    }));

    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    XLSX.utils.book_append_sheet(wb, ws, "Candidates");

    // Generate filename with current date
    const date = new Date().toISOString().split("T")[0];
    const filename = `candidates-data-${date}.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);
  };

  const filterFields = [
    {
      key: "role",
      label: "Job Role",
      placeholder: "Select Role",
      options: [
        { value: "frontend", label: "Frontend Developer" },
        { value: "backend", label: "Backend Developer" },
        { value: "fullstack", label: "Fullstack Developer" },
        { value: "designer", label: "UX/UI Designer" },
        { value: "product", label: "Product Manager" },
      ],
    },
    {
      key: "experience",
      label: "Experience",
      placeholder: "Select Experience",
      options: [
        { value: "1-2", label: "1-2 years" },
        { value: "3-5", label: "3-5 years" },
        { value: "5-8", label: "5-8 years" },
        { value: "8+", label: "8+ years" },
      ],
    },
    {
      key: "phase",
      label: "Phase",
      placeholder: "Select Phase",
      options: [
        { value: "new", label: "New" },
        { value: "screening", label: "Screening" },
        { value: "interview", label: "Interview" },
      ],
    },
  ];

  const handleApplyFilters = (filters: Record<string, string>) => {
    setAppliedFilters(filters);
    // Here you would typically filter the candidatesData based on the filters
    console.log("Applied filters:", filters);
  };
  const [appliedFilters, setAppliedFilters] = useState({});

  return (
    <DashboardLayout>
      <div className="space-y-6 bg-gray-50 min-h-full">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                Candidates
              </h1>
              <p className="text-gray-600">
                Manage and review candidate applications
              </p>
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
                onClick={exportCandidatesData}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Dialog
                open={showAddCandidateForm}
                onOpenChange={setShowAddCandidateForm}
              >
                <DialogTrigger asChild>
                  <Button className="bg-gray-800 hover:bg-gray-900 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Candidate
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Candidate</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="candidateName">Full Name</Label>
                      <Input
                        id="candidateName"
                        placeholder="Enter candidate's full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="candidateEmail">Email Address</Label>
                      <Input
                        id="candidateEmail"
                        type="email"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="candidatePhone">Phone Number</Label>
                      <Input
                        id="candidatePhone"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="candidatePosition">
                        Position Applied For
                      </Label>
                      <Input
                        id="candidatePosition"
                        placeholder="e.g. Senior Frontend Developer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="candidateExperience">
                        Years of Experience
                      </Label>
                      <Input
                        id="candidateExperience"
                        type="number"
                        placeholder="e.g. 5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="candidateResume">Resume Upload</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                        <input
                          type="file"
                          id="candidateResume"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                        />
                        <label
                          htmlFor="candidateResume"
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
                    <div className="flex gap-3 pt-4">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setShowAddCandidateForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="flex-1 bg-gray-800 hover:bg-gray-900"
                        onClick={() => {
                          // Handle form submission here
                          setShowAddCandidateForm(false);
                        }}
                      >
                        Add Candidate
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
              placeholder="Search candidates..."
              className="pl-10 border-gray-200 focus:border-gray-300"
            />
          </div>
        </div>

        {/* Candidates List */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Header Row */}
          <div className="flex items-center justify-between p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-4 flex-1">
              <div className="min-w-[150px]">
                <span className="text-sm font-semibold text-gray-700">
                  Name
                </span>
              </div>
              <div className="min-w-[140px]">
                <span className="text-sm font-semibold text-gray-700">
                  Role
                </span>
              </div>
              <div className="min-w-[100px]">
                <span className="text-sm font-semibold text-gray-700">
                  Phase
                </span>
              </div>
              <div className="min-w-[100px]">
                <span className="text-sm font-semibold text-gray-700">
                  Apply Date
                </span>
              </div>
              <div className="min-w-[120px] text-center">
                <span className="text-sm font-semibold text-gray-700">
                  ATS Score
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
            {candidatesData.map((candidate, index) => (
              <div
                key={candidate.id}
                className={`flex items-center justify-between p-6 ${
                  index !== candidatesData.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Name */}
                  <div className="min-w-[150px]">
                    <h3 className="font-semibold text-gray-900">
                      {candidate.name}
                    </h3>
                  </div>

                  {/* Role */}
                  <div className="min-w-[140px]">
                    <p className="text-sm text-gray-600">
                      {candidate.position}
                    </p>
                  </div>

                  {/* Phase */}
                  <div className="min-w-[100px]">
                    <Badge
                      className={`${candidate.statusColor} border-none font-medium`}
                    >
                      {candidate.status}
                    </Badge>
                  </div>

                  {/* Apply Date */}
                  <div className="min-w-[100px]">
                    <p className="text-sm text-gray-600">
                      {candidate.appliedDate}
                    </p>
                  </div>

                  {/* ATS Score */}
                  <div className="min-w-[120px] text-center">
                    <div className="flex items-center gap-1">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-green-800">
                          {candidate.matchScore}%
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Match Score</p>
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="min-w-[100px]">
                    <p className="text-sm font-medium text-gray-900">
                      {candidate.experience}
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
                      setSelectedCandidate(candidate);
                      setViewModalOpen(true);
                    }}
                  >
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gray-800 hover:bg-gray-900 text-white"
                  >
                    <Calendar className="mr-1 h-3 w-3" />
                    Interview
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-6 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Showing 1-5 of 1,247 candidates
            </p>
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
        title="Filter Candidates"
        fields={filterFields}
        onApply={handleApplyFilters}
        initialValues={appliedFilters}
      />

      {/* View Modal */}
      <ViewModal
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
        type="candidate"
        data={selectedCandidate}
      />
    </DashboardLayout>
  );
}
