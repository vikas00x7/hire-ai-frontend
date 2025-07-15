import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
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
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);

  const handleRunAnalysis = async () => {
    setIsAnalysisLoading(true);
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalysisLoading(false);
    }, 3000);
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
              <Button className="bg-gray-800 hover:bg-gray-900 text-white">
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
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Sort
                </Button>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {screeningResults.map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <Checkbox />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
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
                          {candidate.position} • {candidate.experience}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold text-gray-900">
                          {candidate.matchScore}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">Match</p>
                    </div>

                    <div className="flex gap-1">
                      {candidate.badges.map((badge, index) => (
                        <Badge
                          key={index}
                          className={`${candidate.badgeColor} border-none text-xs`}
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      size="sm"
                      className="bg-gray-800 hover:bg-gray-900 text-white"
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
      </div>
    </DashboardLayout>
  );
}
