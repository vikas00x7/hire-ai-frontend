import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FilterDropdown } from "@/components/FilterDropdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
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
import * as XLSX from "xlsx";
import {
  Download,
  Filter,
  Target,
  Brain,
  TrendingUp,
  Users,
  Settings,
  Play,
  BarChart3,
  Star,
  CheckCircle,
  Info,
  Loader,
} from "lucide-react";

const skillCompatibilityData = [
  {
    category: "Technical Skills",
    percentage: 92,
    color: "bg-blue-500",
  },
  {
    category: "Soft Skills",
    percentage: 80,
    color: "bg-green-500",
  },
  {
    category: "Experience",
    percentage: 78,
    color: "bg-purple-500",
  },
  {
    category: "Cultural Fit",
    percentage: 80,
    color: "bg-orange-500",
  },
];

const matchScoringCriteria = [
  {
    category: "Technical Skills",
    weight: 40,
    icon: Brain,
  },
  {
    category: "Soft Skills",
    weight: 25,
    icon: Users,
  },
  {
    category: "Experience",
    weight: 20,
    icon: TrendingUp,
  },
  {
    category: "Cultural Fit",
    weight: 15,
    icon: Target,
  },
];

const candidatesData = [
  {
    id: 1,
    name: "Michael Johnson",
    experience: "5 years experience",
    overallScore: 95,
    skills: {
      React: { level: "Expert", color: "bg-green-600" },
      JavaScript: { level: "Advanced", color: "bg-blue-600" },
      TypeScript: { level: "Advanced", color: "bg-blue-600" },
      CSS: { level: "Intermediate", color: "bg-yellow-600" },
    },
  },
  {
    id: 2,
    name: "Sarah Chen",
    experience: "4 years experience",
    overallScore: 94,
    skills: {
      React: { level: "Advanced", color: "bg-blue-600" },
      JavaScript: { level: "Expert", color: "bg-green-600" },
      TypeScript: { level: "Intermediate", color: "bg-yellow-600" },
      CSS: { level: "Advanced", color: "bg-blue-600" },
    },
  },
  {
    id: 3,
    name: "David Rodriguez",
    experience: "6 years experience",
    overallScore: 92,
    skills: {
      React: { level: "Intermediate", color: "bg-yellow-600" },
      JavaScript: { level: "Advanced", color: "bg-blue-600" },
      TypeScript: { level: "Beginner", color: "bg-gray-600" },
      CSS: { level: "Advanced", color: "bg-blue-600" },
    },
  },
  {
    id: 4,
    name: "Emily Watson",
    experience: "3 years experience",
    overallScore: 92,
    skills: {
      React: { level: "Intermediate", color: "bg-yellow-600" },
      JavaScript: { level: "Intermediate", color: "bg-yellow-600" },
      TypeScript: { level: "Beginner", color: "bg-gray-600" },
      CSS: { level: "Intermediate", color: "bg-yellow-600" },
    },
  },
];

export default function SkillMatching() {
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [isWeightAdjustmentEnabled, setIsWeightAdjustmentEnabled] =
    useState(false);
  const [weights, setWeights] = useState({
    technical: 40,
    soft: 25,
    experience: 20,
    cultural: 15,
  });

  const [appliedFilters, setAppliedFilters] = useState({});
  const [selectedCandidate, setSelectedCandidate] = useState<typeof candidatesData[0] | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const exportSkillMatchingResults = () => {
    // Prepare skill matching data for export
    const exportData = candidatesData.map((candidate) => ({
      Name: candidate.name,
      Experience: candidate.experience,
      "Overall Score": `${candidate.overallScore}%`,
      "React Level": candidate.skills.React.level,
      "JavaScript Level": candidate.skills.JavaScript.level,
      "TypeScript Level": candidate.skills.TypeScript.level,
      "CSS Level": candidate.skills.CSS.level,
    }));

    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    XLSX.utils.book_append_sheet(wb, ws, "Skill Matching Results");

    // Generate filename with current date
    const date = new Date().toISOString().split("T")[0];
    const filename = `skill-matching-results-${date}.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);
  };

  const filterFields = [
    {
      key: "score",
      label: "Score Range",
      placeholder: "Select Score Range",
      options: [
        { value: "90-100", label: "90-100%" },
        { value: "80-89", label: "80-89%" },
        { value: "70-79", label: "70-79%" },
        { value: "below-70", label: "Below 70%" },
      ],
    },
    {
      key: "domain",
      label: "Domain",
      placeholder: "Select Domain",
      options: [
        { value: "frontend", label: "Frontend Development" },
        { value: "backend", label: "Backend Development" },
        { value: "fullstack", label: "Full Stack" },
        { value: "design", label: "UI/UX Design" },
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
    // Here you would typically filter the candidatesData based on the filters
    console.log("Applied filters:", filters);
  };

  const handleRunAnalysis = async () => {
    setIsAnalysisLoading(true);
    setTimeout(() => {
      setIsAnalysisLoading(false);
    }, 3000);
  };

  const handleWeightChange = (category: string, value: number[]) => {
    setWeights((prev) => ({ ...prev, [category]: value[0] }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 bg-gray-50 min-h-full">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                Skill Matching
              </h1>
              <p className="text-gray-600">
                AI-powered candidate skill compatibility analysis
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                className="bg-gray-800 hover:bg-gray-900 text-white"
                onClick={handleRunAnalysis}
                disabled={isAnalysisLoading}
              >
                {isAnalysisLoading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Play className="mr-2 h-4 w-4" />
                )}
                {isAnalysisLoading
                  ? "Analysis in Progress..."
                  : "Run New Analysis"}
              </Button>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Search & Filter
            </h3>
            <p className="text-sm text-gray-600">
              Configure matching parameters
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="jobPosition" className="text-sm font-medium">
                Job Position
              </Label>
              <Select>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Please enter the data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend-developer">
                    Frontend Developer
                  </SelectItem>
                  <SelectItem value="backend-developer">
                    Backend Developer
                  </SelectItem>
                  <SelectItem value="fullstack-developer">
                    Fullstack Developer
                  </SelectItem>
                  <SelectItem value="ui-ux-designer">UI/UX Designer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experienceLevel" className="text-sm font-medium">
                Experience Level
              </Label>
              <Select>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Please enter the data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid-level (2-5 years)</SelectItem>
                  <SelectItem value="senior">Senior (5+ years)</SelectItem>
                  <SelectItem value="lead">Lead (8+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minMatchScore" className="text-sm font-medium">
                Minimum Match Score
              </Label>
              <Input
                id="minMatchScore"
                placeholder="Please enter the data"
                className="border-gray-200 focus:border-gray-300"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Skill Compatibility Overview */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Skill Compatibility Overview
              </h3>
              <p className="text-sm text-gray-600">
                AI-analyzed skill matching for Frontend Developer
              </p>
            </div>

            <div className="mb-6">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-gray-900 mb-2">87%</div>
                <p className="text-sm text-gray-600">Overall Match Score</p>
              </div>
            </div>

            <div className="space-y-4">
              {skillCompatibilityData.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${skill.color}`}
                      ></div>
                      <span className="font-medium text-gray-900">
                        {skill.category}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {skill.percentage}%
                    </span>
                  </div>
                  <Progress
                    value={skill.percentage}
                    className="h-3"
                    // Custom styling for different colors
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Match Scoring Criteria */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Match Scoring Criteria
              </h3>
              <p className="text-sm text-gray-600">
                Adjust skill weighting for better matching
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {matchScoringCriteria.map((criteria, index) => {
                const weightKey = criteria.category
                  .toLowerCase()
                  .includes("technical")
                  ? "technical"
                  : criteria.category.toLowerCase().includes("soft")
                    ? "soft"
                    : criteria.category.toLowerCase().includes("experience")
                      ? "experience"
                      : "cultural";
                const currentWeight =
                  weights[weightKey as keyof typeof weights];
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <criteria.icon className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-gray-900">
                          {criteria.category}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {currentWeight}%
                      </span>
                    </div>
                    {isWeightAdjustmentEnabled ? (
                      <Slider
                        value={[currentWeight]}
                        onValueChange={(value) =>
                          handleWeightChange(weightKey, value)
                        }
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    ) : (
                      <Progress value={currentWeight} className="h-2" />
                    )}
                  </div>
                );
              })}
            </div>

            <Button
              className="w-full bg-gray-800 hover:bg-gray-900 text-white"
              onClick={() =>
                setIsWeightAdjustmentEnabled(!isWeightAdjustmentEnabled)
              }
            >
              <Settings className="mr-2 h-4 w-4" />
              {isWeightAdjustmentEnabled ? "Save Weights" : "Adjust Weights"}
            </Button>
          </div>
        </div>

        {/* Candidate Skill Comparison */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Candidate Skill Comparison
                </h3>
                <p className="text-sm text-gray-600">
                  Detailed skill breakdown for top matching candidates
                </p>
              </div>
              <div>
                <FilterDropdown
                  fields={filterFields}
                  onApply={handleApplyFilters}
                  initialValues={appliedFilters}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Overall Score
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    React
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    JavaScript
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    TypeScript
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CSS
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {candidatesData.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {candidate.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {candidate.experience}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-green-800">
                            {candidate.overallScore}%
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        className={`${candidate.skills.React.color} text-white border-none`}
                      >
                        {candidate.skills.React.level}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        className={`${candidate.skills.JavaScript.color} text-white border-none`}
                      >
                        {candidate.skills.JavaScript.level}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        className={`${candidate.skills.TypeScript.color} text-white border-none`}
                      >
                        {candidate.skills.TypeScript.level}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        className={`${candidate.skills.CSS.color} text-white border-none`}
                      >
                        {candidate.skills.CSS.level}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        size="sm"
                        className="bg-gray-800 hover:bg-gray-900 text-white"
                        onClick={() => {
                          setSelectedCandidate(candidate);
                          setIsDetailsModalOpen(true);
                        }}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-6 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Showing 1-4 of 47 candidates
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

      {/* Candidate Details Modal */}
      {selectedCandidate && (
        <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Candidate Profile
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Complete skill assessment and contact information
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-6">
              {/* Candidate Header */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-gray-700">
                    {selectedCandidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedCandidate.name}
                  </h3>
                  <p className="text-gray-600">{selectedCandidate.experience}</p>
                </div>
                <div className="ml-auto flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-green-800">
                      {selectedCandidate.overallScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Skill Levels */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-900">Skill Assessment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(selectedCandidate.skills).map(([skill, details]: [string, any]) => (
                    <div key={skill} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${details.color}`}></div>
                        <span className="text-sm text-gray-900">{skill}</span>
                      </div>
                      <Badge className={`${details.color} text-white border-none`}>
                        {details.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h4 className="text-md font-semibold text-gray-900">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="text-gray-900">candidate@example.com</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="text-gray-900">+91-9876543210</p>
                  </div>
                </div>
              </div>

              {/* Resume Link */}
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-2">Resume</h4>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-700 border-gray-200"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                className="text-gray-700 border-gray-200"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                Close
              </Button>
              <Button className="bg-gray-800 hover:bg-gray-900 text-white">
                Schedule Interview
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

    </DashboardLayout>
  );
}
