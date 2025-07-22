import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ViewModal } from "@/components/ViewModal";
import { FilterDropdown } from "@/components/FilterDropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as XLSX from "xlsx";
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Save,
  Send,
  CheckCircle,
  Bot,
  Download as DownloadIcon,
  Loader,
  X,
  Briefcase,
  Calendar,
  MapPin,
  Users,
  MoreVertical,
  Play,
} from "lucide-react";

const jobPostingsData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    status: "Active",
    statusColor: "bg-green-100 text-green-800",
    createdDate: "2024-01-15",
    closedDate: null,
    applicants: 47,
  },
  {
    id: 2,
    title: "UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    status: "Active",
    statusColor: "bg-green-100 text-green-800",
    createdDate: "2024-01-12",
    closedDate: null,
    applicants: 23,
  },
  {
    id: 3,
    title: "Backend Engineer",
    department: "Engineering",
    location: "New York, NY",
    type: "Full-time",
    status: "Closed",
    statusColor: "bg-gray-100 text-gray-800",
    createdDate: "2024-01-08",
    closedDate: "2024-01-20",
    applicants: 156,
  },
  {
    id: 4,
    title: "Product Manager",
    department: "Product",
    location: "Austin, TX",
    type: "Full-time",
    status: "Active",
    statusColor: "bg-green-100 text-green-800",
    createdDate: "2024-01-10",
    closedDate: null,
    applicants: 89,
  },
  {
    id: 5,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Seattle, WA",
    type: "Contract",
    status: "Draft",
    statusColor: "bg-yellow-100 text-yellow-800",
    createdDate: "2024-01-18",
    closedDate: null,
    applicants: 0,
  },
];

export default function Jobs() {
  const navigate = useNavigate();

  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState({});

  const exportJobsData = () => {
    // Prepare jobs data for export
    const exportData = jobPostingsData.map((job) => ({
      "Job Title": job.title,
      Department: job.department,
      Location: job.location,
      "Employment Type": job.type,
      Status: job.status,
      "Created Date": job.createdDate,
      "Closed Date": job.closedDate || "N/A",
      "Applicants Count": job.applicants,
    }));

    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    XLSX.utils.book_append_sheet(wb, ws, "Job Postings");

    // Generate filename with current date
    const date = new Date().toISOString().split("T")[0];
    const filename = `job-postings-${date}.xlsx`;

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
        { value: "marketing", label: "Marketing" },
        { value: "sales", label: "Sales" },
      ],
    },
    {
      key: "status",
      label: "Status",
      placeholder: "Select Status",
      options: [
        { value: "active", label: "Active" },
        { value: "draft", label: "Draft" },
        { value: "closed", label: "Closed" },
      ],
    },
  ];

  const handleApplyFilters = (filters: Record<string, string>) => {
    setAppliedFilters(filters);
    // Here you would typically filter the jobPostingsData based on the filters
    console.log("Applied filters:", filters);
  };

  const handleGenerateAI = async () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      setIsGeneratingAI(false);
    }, 3000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 bg-gray-50 min-h-full">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                Job Postings
              </h1>
              <p className="text-gray-600">
                Manage your job postings and track applications
              </p>
            </div>
            <div className="flex gap-3">
              <FilterDropdown
                fields={filterFields}
                onApply={handleApplyFilters}
                initialValues={appliedFilters}
              />
              <Button
                className="bg-gray-800 hover:bg-gray-900 text-white"
                onClick={() => navigate("/jobs/create")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Job Post
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-sm text-gray-600">Total Jobs</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-gray-600">Active Jobs</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">315</p>
                <p className="text-sm text-gray-600">Total Applicants</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1</p>
                <p className="text-sm text-gray-600">Closing Soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search job postings..."
              className="pl-10 border-gray-200 focus:border-gray-300"
            />
          </div>
        </div>

        {/* Job Postings List */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Header Row */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_0.5fr] items-center p-6 bg-gray-50 border-b border-gray-200 min-w-[900px] w-full">
            <div>
              <span className="text-sm font-semibold text-gray-700">
                Job Title
              </span>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-700">
                Department
              </span>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-700">
                Status
              </span>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-700">
                Created Date
              </span>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-700">
                Closed Date
              </span>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-700">
                Applicants
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold text-gray-700">
                Actions
              </span>
            </div>
          </div>

          <div className="space-y-0">
            {jobPostingsData.map((job, index) => (
              <div
                key={job.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_0.5fr] items-center p-6 border-b border-gray-100"
                style={{minHeight: "74px"}}
              >
                  {/* Job Title */}
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {job.location}
                      </span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{job.type}</span>
                    </div>
                  </div>

                  {/* Department */}
                  <div>
                    <p className="text-sm text-gray-600">{job.department}</p>
                  </div>

                  {/* Status */}
                  <div>
                    <Badge
                      className={`${job.statusColor} border-none font-medium`}
                    >
                      {job.status}
                    </Badge>
                  </div>

                  {/* Created Date */}
                  <div>
                    <p className="text-sm text-gray-600">
                      {formatDate(job.createdDate)}
                    </p>
                  </div>

                  {/* Closed Date */}
                  <div>
                    <p className="text-sm text-gray-600">
                      {job.closedDate ? formatDate(job.closedDate) : "-"}
                    </p>
                  </div>

                  {/* Applicants */}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {job.applicants}
                    </p>
                  </div>

                {/* Action Menu */}
                <div className="flex gap-2 justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-600 border-gray-200 hover:bg-gray-50"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedJob(job);
                          setViewModalOpen(true);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      {job.status === "Active" && (
                        <DropdownMenuItem>
                          <X className="mr-2 h-4 w-4" />
                          Close Job Post
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <Play className="mr-2 h-4 w-4" />
                        Post Job
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* View Modal */}
      <ViewModal
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
        type="job"
        data={selectedJob}
      />
    </DashboardLayout>
  );
}
