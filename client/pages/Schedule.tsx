import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ViewModal } from "@/components/ViewModal";
import { FilterDropdown } from "@/components/FilterDropdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import * as XLSX from "xlsx";
import {
  Calendar,
  Clock,
  Users,
  Video,
  Filter,
  Download,
  Send,
  Eye,
  FileText,
  Settings,
  Plus,
  MoreHorizontal,
} from "lucide-react";

const upcomingInterviews = [
  {
    id: 1,
    candidate: "Michael Johnson",
    position: "Senior Frontend Developer",
    date: "Today",
    time: "2:00 PM - 3:00 PM",
    type: "Initial Panel",
    avatar: "MJ",
  },
  {
    id: 2,
    candidate: "Sarah Chen",
    position: "UX Designer",
    date: "Tomorrow",
    time: "10:00 AM - 11:00 AM",
    type: "Initial Panel",
    avatar: "SC",
  },
  {
    id: 3,
    candidate: "David Rodriguez",
    position: "Backend Engineer",
    date: "Friday",
    time: "3:30 PM - 4:30 PM",
    type: "Initial Panel",
    avatar: "DR",
  },
  {
    id: 4,
    candidate: "Emily Wilson",
    position: "Product Manager",
    date: "Friday",
    time: "1:00 PM - 2:00 PM",
    type: "Initial Panel",
    avatar: "EW",
  },
];

const panelMembers = [
  {
    id: 1,
    name: "Sarah Martinez",
    role: "Senior Manager",
    avatar: "SM",
    available: true,
  },
  {
    id: 2,
    name: "John Davis",
    role: "Tech Lead",
    avatar: "JD",
    available: true,
  },
  {
    id: 3,
    name: "Lisa Kumar",
    role: "Senior UX",
    avatar: "LK",
    available: true,
  },
  {
    id: 4,
    name: "Mark Thompson",
    role: "HR Manager",
    avatar: "MT",
    available: false,
  },
];

const quickActions = [
  "Send Bulk Invitations",
  "Reschedule Interviews",
  "View Calendar",
  "Set Reminders",
];

export default function Schedule() {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [teamMembersModalOpen, setTeamMembersModalOpen] = useState(false);

  const exportScheduleData = () => {
    // Prepare schedule data for export
    const exportData = upcomingInterviews.map((interview) => ({
      Candidate: interview.candidate,
      Position: interview.position,
      Date: interview.date,
      Time: interview.time,
      "Interview Type": interview.type,
    }));

    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    XLSX.utils.book_append_sheet(wb, ws, "Schedule Data");

    // Generate filename with current date
    const date = new Date().toISOString().split("T")[0];
    const filename = `schedule-data-${date}.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);
  };

  const filterFields = [
    {
      key: "time",
      label: "Time Period",
      placeholder: "Select Time Period",
      options: [
        { value: "today", label: "Today" },
        { value: "week", label: "This Week" },
        { value: "next-week", label: "Next Week" },
        { value: "month", label: "This Month" },
      ],
    },
    {
      key: "department",
      label: "Department",
      placeholder: "Select Department",
      options: [
        { value: "engineering", label: "Engineering" },
        { value: "design", label: "Design" },
        { value: "product", label: "Product" },
        { value: "marketing", label: "Marketing" },
      ],
    },
  ];

  const handleApplyFilters = (filters: Record<string, string>) => {
    setAppliedFilters(filters);
    // Here you would typically filter the upcomingInterviews based on the filters
    console.log("Applied filters:", filters);
  };

  const handleQuickAction = (action: string, index: number) => {
    // Implementation for quick actions
    console.log(`Action selected: ${action}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 bg-gray-50 min-h-full">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                Schedule
              </h1>
              <p className="text-gray-600">
                Manage interviews and coordinate with your team
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-gray-800 hover:bg-gray-900 text-white">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Interview
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Upcoming Interviews */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Upcoming Interviews
                  </h3>
                  <p className="text-sm text-gray-600">
                    Scheduled interviews for this week
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

            <div className="p-6">
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="/placeholder.svg"
                          alt={interview.candidate}
                        />
                        <AvatarFallback className="bg-gray-200 text-gray-700">
                          {interview.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {interview.candidate}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {interview.position}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {interview.date}, {interview.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {interview.type}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-600 border-gray-200 hover:bg-gray-50"
                        onClick={() => {
                          setSelectedInterview(interview);
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
                        <Video className="mr-1 h-3 w-3" />
                        Invite Candidate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel Members */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Panel Members
              </h3>
              <p className="text-sm text-gray-600">
                Available team members for interviews
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {panelMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt={member.name} />
                        <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-600">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          member.available ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <span className="text-xs text-gray-500">
                        {member.available ? "Available" : "Busy"}
                      </span>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 text-blue-600 border-blue-200 hover:bg-blue-50"
                  onClick={() => setTeamMembersModalOpen(true)}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Invite More Panel Members
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Schedule New Interview */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Schedule New Interview
              </h3>
              <p className="text-sm text-gray-600">
                Create a new interview slot
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="candidate" className="text-sm font-medium">
                  Select Candidate
                </Label>
                <Select>
                  <SelectTrigger className="border-gray-200">
                    <SelectValue placeholder="Choose candidate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="michael-johnson">
                      Michael Johnson
                    </SelectItem>
                    <SelectItem value="sarah-chen">Sarah Chen</SelectItem>
                    <SelectItem value="david-rodriguez">
                      David Rodriguez
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    className="border-gray-200 focus:border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm font-medium">
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    className="border-gray-200 focus:border-gray-300"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="interviewType"
                    className="text-sm font-medium"
                  >
                    Interview Type
                  </Label>
                  <Select>
                    <SelectTrigger className="border-gray-200">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="initial">Initial Panel</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                      <SelectItem value="final">Final Round</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-sm font-medium">
                    Duration
                  </Label>
                  <Select>
                    <SelectTrigger className="border-gray-200">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Interview
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Quick Actions
              </h3>
              <p className="text-sm text-gray-600">
                Commonly used scheduling tools
              </p>
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
                >
                  {index === 0 && <Send className="h-4 w-4" />}
                  {index === 1 && <Clock className="h-4 w-4" />}
                  {index === 2 && <Eye className="h-4 w-4" />}
                  {index === 3 && <Settings className="h-4 w-4" />}
                  {index === 4 && <FileText className="h-4 w-4" />}
                  {action}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>



      {/* View Modal */}
      <ViewModal
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
        type="interview"
        data={selectedInterview}
      />

      {/* Team Members Modal */}
      <div className={`fixed inset-0 bg-black/50 z-50 ${teamMembersModalOpen ? 'flex' : 'hidden'} items-center justify-center`}>
        <div className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Panel Members</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTeamMembersModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </Button>
          </div>

          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="space-y-4">
              {panelMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt={member.name} />
                      <AvatarFallback className="bg-gray-200 text-gray-700">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 mr-2">
                      <div
                        className={`w-2 h-2 rounded-full ${member.available ? "bg-green-500" : "bg-red-500"}`}
                      />
                      <span className="text-xs text-gray-500">
                        {member.available ? "Available" : "Busy"}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`text-xs h-8 px-3 ${member.available ? 'text-blue-600 border-blue-200 hover:bg-blue-50' : 'text-gray-400 border-gray-200 cursor-not-allowed'}`}
                      disabled={!member.available}
                      onClick={() => {
                        if (member.available) {
                          console.log(`Invite sent to ${member.name}`);
                        }
                      }}
                    >
                      <Send className="mr-1 h-3 w-3" />
                      Send Invite
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setTeamMembersModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
