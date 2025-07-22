import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ViewModal } from "@/components/ViewModal";
import { FilterDropdown } from "@/components/FilterDropdown";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { candidateFormSchema, type CandidateFormValues } from "@/lib/validations/candidateValidation";

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
  const [showAddCandidateForm, setShowAddCandidateForm] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [formSubmitError, setFormSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CandidateFormValues>({
    resolver: zodResolver(candidateFormSchema),
    mode: "onChange",
  });

  const onSubmitCandidate = (data: CandidateFormValues) => {
    try {
      // Here you would typically send the form data to your backend API
      console.log("Form submitted successfully:", data);
      
      // Close form and reset values on success
      setShowAddCandidateForm(false);
      reset();
      setFormSubmitError(null);
      
      // You might want to refresh the candidate list after adding
      // or show a success message
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormSubmitError("An error occurred while adding the candidate. Please try again.");
    }
  };
  
  const handleCancelForm = () => {
    setShowAddCandidateForm(false);
    reset();
    setFormSubmitError(null);
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
              <FilterDropdown
                fields={filterFields}
                onApply={handleApplyFilters}
                initialValues={appliedFilters}
              />
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
                <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Candidate</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmitCandidate)} className="space-y-4 py-4">
                    {formSubmitError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm">
                        {formSubmitError}
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="Enter candidate's full name"
                        {...register("fullName")}
                        className={errors.fullName ? "border-red-500" : ""}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        {...register("email")}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Enter phone number"
                        {...register("phone")}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">
                        Position Applied For
                      </Label>
                      <Input
                        id="position"
                        placeholder="e.g. Senior Frontend Developer"
                        {...register("position")}
                        className={errors.position ? "border-red-500" : ""}
                      />
                      {errors.position && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.position.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">
                        Years of Experience
                      </Label>
                      <Input
                        id="experience"
                        placeholder="e.g. 5"
                        {...register("experience")}
                        className={errors.experience ? "border-red-500" : ""}
                      />
                      {errors.experience && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.experience.message}
                        </p>
                      )}
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
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={handleCancelForm}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gray-800 hover:bg-gray-900"
                        disabled={!isValid}
                      >
                        Add Candidate
                      </Button>
                    </div>
                  </form>
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
        <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
          {/* Header Row */}
          <div className="grid grid-cols-[1.5fr_1.5fr_1fr_1fr_0.8fr_0.8fr_1.4fr] items-center p-6 bg-gray-50 border-b border-gray-200 min-w-[900px] w-full">
              <div>
                <span className="text-sm font-semibold text-gray-700">
                  Name
                </span>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-700">
                  Role
                </span>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-700">
                  Phase
                </span>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-700">
                  Apply Date
                </span>
              </div>
              <div className="text-center">
                <span className="text-sm font-semibold text-gray-700">
                  ATS Score
                </span>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-700">
                  Experience
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-700">
                  Actions
                </span>
              </div>
          </div>

          <div className="space-y-0">
            {candidatesData.map((candidate, index) => (
              <div
                key={candidate.id}
                className="grid grid-cols-[1.5fr_1.5fr_1fr_1fr_0.8fr_0.8fr_1.4fr] items-center p-6 border-b border-gray-100"
                style={{minHeight: "74px"}}
              >
                  {/* Name */}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {candidate.name}
                    </h3>
                  </div>

                  {/* Role */}
                  <div>
                    <p className="text-sm text-gray-600">
                      {candidate.position}
                    </p>
                  </div>

                  {/* Phase */}
                  <div>
                    <Badge
                      className={`${candidate.statusColor} border-none font-medium`}
                    >
                      {candidate.status}
                    </Badge>
                  </div>

                  {/* Apply Date */}
                  <div>
                    <p className="text-sm text-gray-600">
                      {candidate.appliedDate}
                    </p>
                  </div>

                  {/* ATS Score */}
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                      <span className="text-sm font-bold text-green-800">
                        {candidate.matchScore}%
                      </span>
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {candidate.experience}
                    </p>
                  </div>

                {/* Action Buttons */}
                <div className="flex gap-2 justify-end">
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
                    onClick={() => {
                      navigate("/schedule");
                      window.scrollTo(0, 0);
                    }}
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
