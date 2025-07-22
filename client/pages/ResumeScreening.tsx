import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Upload,
  Filter,
  Search,
  FileText,
  Brain,
  Target,
  Clock,
  Star,
  Users,
  CheckCircle,
  Calendar,
  Mail,
  Download,
  Zap,
  Info,
  TrendingUp,
  GraduationCap,
  Code,
  Heart,
  Loader,
} from "lucide-react";

const metricsData = [
  {
    title: "Total Resumes",
    value: "2,847",
    subtitle: "197 this week",
    icon: FileText,
  },
  {
    title: "AI Processed",
    value: "2,654",
    subtitle: "91% completion rate",
    icon: Brain,
  },
  {
    title: "High Match",
    value: "234",
    subtitle: "16% match score",
    icon: Target,
  },
  {
    title: "Pending Review",
    value: "67",
    subtitle: "Requires manual review",
    icon: Clock,
  },
];

const screeningResults = [
  {
    id: 1,
    name: "Michael Johnson",
    position: "Senior React Developer",
    experience: "5 years exp",
    matchScore: 96,
    badges: ["Shortlist"],
    badgeColor: "bg-green-100 text-green-800",
  },
  {
    id: 2,
    name: "Sarah Chen",
    position: "Senior UX Designer",
    experience: "4+ years exp",
    matchScore: 94,
    badges: ["Fit for", "Design"],
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    name: "David Rodriguez",
    position: "Backend Engineer",
    experience: "4+ years exp",
    matchScore: 87,
    badges: ["Quality", "Python"],
    badgeColor: "bg-purple-100 text-purple-800",
  },
];

const aiSummaryData = [
  {
    category: "Technical Skills",
    count: 231,
    percentage: 85,
    icon: Code,
    color: "bg-blue-500",
  },
  {
    category: "Experience Level",
    count: 187,
    percentage: 65,
    icon: TrendingUp,
    color: "bg-green-500",
  },
  {
    category: "Education",
    count: 156,
    percentage: 55,
    icon: GraduationCap,
    color: "bg-purple-500",
  },
  {
    category: "Soft Skills",
    count: 98,
    percentage: 35,
    icon: Heart,
    color: "bg-orange-500",
  },
];

export default function ResumeScreening() {
  const navigate = useNavigate();
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleRunAnalysis = async () => {
    setIsAnalysisLoading(true);
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalysisLoading(false);
    }, 3000);
  };

  const handleResumeUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Process uploaded files
      console.log("Files uploaded:", files);
      // Here you would typically send the files to a server or process them
    }
  };
  
  const showCandidateDetails = (candidate: any) => {
    setSelectedCandidate(candidate);
    setIsDetailsModalOpen(true);
  };
  
  const handleScheduleRedirect = () => {
    navigate("/schedule");
    window.scrollTo(0, 0);
  };
  
  const handleExport = () => {
    // In a real implementation, this would create and download an Excel file
    console.log("Exporting selected candidates as Excel");
    // Mock export functionality
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(screeningResults)], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}))
    a.download = "candidates.xlsx";
    a.click();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 bg-gray-50 min-h-full">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                Resume Screening
              </h1>
              <p className="text-gray-600">
                AI-powered resume analysis and candidate filtering
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept=".pdf,.doc,.docx"
                multiple
              />
              <Button 
                className="bg-gray-800 hover:bg-gray-900 text-white"
                onClick={handleResumeUpload}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Resumes
              </Button>
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

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quick Filters */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Quick Filters
              </h3>
              <p className="text-sm text-gray-600">
                Filter resumes by criteria
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="experience" defaultChecked />
                  <label
                    htmlFor="experience"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    5+ Years Experience
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tech-skills" defaultChecked />
                  <label
                    htmlFor="tech-skills"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Strong Technical Skills
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="education" />
                  <label
                    htmlFor="education"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Bachelor's Degree+
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="location" />
                  <label
                    htmlFor="location"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Local Candidates
                  </label>
                </div>
              </div>

              <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white">
                <Search className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Screening Results */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Screening Results
                </h3>
                <p className="text-sm text-gray-600">
                  AI-analyzed candidate profiles
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {screeningResults.map((candidate) => (
                <div
                  key={candidate.id}
                  className="grid grid-cols-[auto_2fr_1fr_1fr_1fr] gap-6 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  style={{minHeight: "74px"}}
                >
                  {/* Checkbox */}
                  <div className="flex items-center justify-center">
                    <Checkbox />
                  </div>
                  
                  {/* Candidate Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-gray-700">
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {candidate.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {candidate.position}
                      </p>
                      <p className="text-xs text-gray-500">
                        {candidate.experience}
                      </p>
                    </div>
                  </div>

                  {/* Match Score */}
                  <div className="flex items-center">
                    <div className="text-center w-full">
                      <span className="font-semibold text-gray-900">
                        {candidate.matchScore}%
                      </span>
                      <p className="text-xs text-gray-500">Match</p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1 items-center">
                    {candidate.badges.map((badge, index) => (
                      <Badge
                        key={index}
                        className={`${candidate.badgeColor} border-none text-xs`}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  {/* Review Button */}
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      className="bg-gray-800 hover:bg-gray-900 text-white w-full max-w-[80px]"
                      onClick={() => showCandidateDetails(candidate)}
                    >
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* AI Screening Summary */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                AI Screening Summary
              </h3>
              <p className="text-sm text-gray-600">
                Analysis breakdown by categories
              </p>
            </div>

            <div className="space-y-4">
              {aiSummaryData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${item.color}`}
                      ></div>
                      <span className="font-medium text-gray-900">
                        {item.category}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {item.count}
                    </span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Bulk Actions
              </h3>
              <p className="text-sm text-gray-600">
                Manage multiple candidates at once
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-900">
                    Select all high-match candidates
                  </span>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    24+
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-600 border-gray-200"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Shortlist
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-600 border-gray-200"
                  onClick={handleScheduleRedirect}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-600 border-gray-200"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-600 border-gray-200"
                  onClick={handleExport}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>

              <Button
                className="w-full bg-gray-800 hover:bg-gray-900 text-white"
                onClick={handleRunAnalysis}
                disabled={isAnalysisLoading}
              >
                {isAnalysisLoading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="mr-2 h-4 w-4" />
                )}
                {isAnalysisLoading
                  ? "Analysis in Progress..."
                  : "Run Advanced AI Analysis"}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Candidate Details Modal */}
        <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Candidate Details</DialogTitle>
              <DialogDescription className="text-gray-600">
                Full profile information
              </DialogDescription>
            </DialogHeader>
            {selectedCandidate && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      {selectedCandidate.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedCandidate.name}
                    </h3>
                    <p className="text-sm text-gray-600">{selectedCandidate.position}</p>
                  </div>
                </div>
                
                <div className="border-t border-b border-gray-200 py-4">
                  <dl className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <dt className="text-sm font-medium text-gray-500">Experience</dt>
                      <dd className="text-sm text-gray-900 col-span-2">
                        {selectedCandidate.experience}
                      </dd>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <dt className="text-sm font-medium text-gray-500">Match Score</dt>
                      <dd className="text-sm text-gray-900 col-span-2">
                        <span>{selectedCandidate.matchScore}%</span>
                      </dd>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <dt className="text-sm font-medium text-gray-500">Tags</dt>
                      <dd className="text-sm text-gray-900 col-span-2">
                        <div className="flex flex-wrap gap-2">
                          {selectedCandidate.badges.map((badge: string, index: number) => (
                            <Badge
                              key={index}
                              className={`${selectedCandidate.badgeColor} border-none text-xs`}
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </dd>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <dt className="text-sm font-medium text-gray-500">Contact</dt>
                      <dd className="text-sm text-gray-900 col-span-2">
                        email@example.com<br />
                        +91-9876543210
                      </dd>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <dt className="text-sm font-medium text-gray-500">Resume</dt>
                      <dd className="text-sm text-blue-600 col-span-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-200"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          View Resume
                        </Button>
                      </dd>
                    </div>
                  </dl>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsDetailsModalOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-gray-800 hover:bg-gray-900 text-white"
                    onClick={handleScheduleRedirect}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Interview
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
