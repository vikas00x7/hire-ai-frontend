import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import * as XLSX from "xlsx";
import {
  Users,
  Briefcase,
  Calendar,
  Brain,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Clock,
  CheckCircle,
  Play,
  MoreHorizontal,
  Star,
  Target,
  UserPlus,
  FileText,
  Settings,
  Info,
  Loader,
} from "lucide-react";

const metricsData = [
  {
    title: "Total Candidates",
    value: "1,247",
    subtitle: "1.2% hiring last month",
    icon: Users,
  },
  {
    title: "Active Jobs",
    value: "24",
    subtitle: "Active this week",
    icon: Briefcase,
  },
  {
    title: "Interviews Scheduled",
    value: "89",
    subtitle: "All time",
    icon: Calendar,
  },
  {
    title: "AI Match Score",
    value: "94%",
    subtitle: "Average score",
    icon: Brain,
  },
];

const hiringPipelineData = [
  { stage: "Applied", count: 342 },
  { stage: "Screened", count: 156 },
  { stage: "Interview", count: 83 },
  { stage: "Final Review", count: 23 },
];

const aiInsights = [
  {
    title: "High-match candidate identified",
    subtitle: "Based on experience, skills and work history",
  },
  {
    title: "Salary range optimization",
    subtitle: "Increase salary by 15% for better candidates",
  },
  {
    title: "Interview scheduling conflict",
    subtitle: "3 interviews need rescheduling",
  },
];

const topCandidates = [
  {
    name: "Michael Johnson",
    role: "Senior Frontend Developer",
    matchScore: 98,
  },
  {
    name: "Sarah Chen",
    role: "UX Designer",
    matchScore: 96,
  },
];

const quickActions = [
  "Run AI Screening",
  "Schedule Interviews",
  "Generate Report",
];

export default function Dashboard() {
  const [isScreeningLoading, setIsScreeningLoading] = useState(false);
  const navigate = useNavigate();

  const exportDashboardReport = () => {
    // Create dashboard report data
    const reportData = {
      overview: metricsData.map((metric) => ({
        Metric: metric.title,
        Value: metric.value,
        Description: metric.subtitle,
      })),
      hiringPipeline: hiringPipelineData.map((stage) => ({
        Stage: stage.stage,
        Count: stage.count,
      })),
      topCandidates: topCandidates.map((candidate) => ({
        Name: candidate.name,
        Role: candidate.role,
        "Match Score": `${candidate.matchScore}%`,
      })),
      aiInsights: aiInsights.map((insight, index) => ({
        "Insight #": index + 1,
        Title: insight.title,
        Description: insight.subtitle,
      })),
    };

    // Create workbook
    const wb = XLSX.utils.book_new();

    // Add worksheets
    const overviewWs = XLSX.utils.json_to_sheet(reportData.overview);
    const pipelineWs = XLSX.utils.json_to_sheet(reportData.hiringPipeline);
    const candidatesWs = XLSX.utils.json_to_sheet(reportData.topCandidates);
    const insightsWs = XLSX.utils.json_to_sheet(reportData.aiInsights);

    XLSX.utils.book_append_sheet(wb, overviewWs, "Overview");
    XLSX.utils.book_append_sheet(wb, pipelineWs, "Hiring Pipeline");
    XLSX.utils.book_append_sheet(wb, candidatesWs, "Top Candidates");
    XLSX.utils.book_append_sheet(wb, insightsWs, "AI Insights");

    // Generate filename with current date
    const date = new Date().toISOString().split("T")[0];
    const filename = `dashboard-report-${date}.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);
  };

  const handleQuickAction = async (action: string, index: number) => {
    if (index === 0) {
      // Run AI Screening
      setIsScreeningLoading(true);
      // Simulate AI screening process
      setTimeout(() => {
        setIsScreeningLoading(false);
      }, 3000);
    } else if (index === 1) {
      // Schedule Interviews - navigate to top of page
      navigate("/schedule");
      // Scroll to top when navigating
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else if (index === 2) {
      // Generate Report - export .xlsx file
      exportDashboardReport();
    }
  };

  return (
    <div className="space-y-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, Sarah. Here's your hiring overview.
        </p>
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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Hiring Pipeline */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Hiring Pipeline
            </h3>
            <p className="text-sm text-gray-600">
              Candidate progress through stages
            </p>
          </div>
          <div className="space-y-4">
            {hiringPipelineData.map((stage, index) => {
              const maxWidth = Math.max(
                ...hiringPipelineData.map((s) => s.count),
              );
              const width = (stage.count / maxWidth) * 100;

              return (
                <div key={stage.stage} className="flex items-center gap-4">
                  <div className="flex items-center gap-3 w-20">
                    <div className="w-2 h-2 rounded-full bg-gray-800" />
                    <span className="text-sm font-medium text-gray-700">
                      {stage.stage}
                    </span>
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-800 rounded-full transition-all duration-300"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 min-w-[2rem] text-right">
                      {stage.count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent AI Insights */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Recent AI Insights
            </h3>
            <p className="text-sm text-gray-600">
              AI-driven recruitment recommendations
            </p>
          </div>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Info className="h-3 w-3 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900">
                    {insight.title}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {insight.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Candidates */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Top Candidates
              </h3>
              <p className="text-sm text-gray-600">
                AI filtered candidates requiring attention
              </p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-400">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {topCandidates.map((candidate, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {candidate.name}
                    </p>
                    <p className="text-sm text-gray-600">{candidate.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-semibold text-gray-900">
                        {candidate.matchScore}
                      </span>
                      <span>%</span>
                    </div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide text-center">
                      MATCH SCORE
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gray-800 hover:bg-gray-900 text-white"
                    onClick={() => {
                      navigate("/schedule");
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }, 100);
                    }}
                  >
                    Schedule Interview
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Quick Actions
            </h3>
            <p className="text-sm text-gray-600">Frequently used tools</p>
          </div>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className={`w-full justify-start gap-3 h-12 ${
                  index === 0
                    ? "bg-gray-800 hover:bg-gray-900 text-white"
                    : "text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handleQuickAction(action, index)}
                disabled={index === 0 && isScreeningLoading}
              >
                {index === 0 &&
                  (isScreeningLoading ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4" />
                  ))}
                {index === 1 && <Calendar className="h-4 w-4" />}
                {index === 2 && <FileText className="h-4 w-4" />}
                {index === 0 && isScreeningLoading
                  ? "AI Screening in Progress..."
                  : action}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
