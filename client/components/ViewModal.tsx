import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  Award,
  Clock,
  Building,
  FileText,
  Star,
  X,
} from "lucide-react";

interface ViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "candidate" | "team-member" | "job" | "interview";
  data: any;
}

export function ViewModal({ open, onOpenChange, type, data }: ViewModalProps) {
  if (!data) return null;

  const renderCandidateView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/placeholder.svg" alt={data.name} />
          <AvatarFallback className="bg-gray-200 text-gray-700 text-lg">
            {data.name
              ?.split(" ")
              .map((n: string) => n[0])
              .join("") || "N/A"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900">{data.name}</h3>
          <p className="text-lg text-gray-600">{data.position}</p>
          <div className="flex items-center gap-4 mt-3">
            <Badge className={`${data.statusColor} border-none`}>
              {data.status}
            </Badge>
            {data.matchScore && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-xs font-bold text-green-800">
                    {data.matchScore}%
                  </span>
                </div>
                <span className="text-sm text-gray-500">Match Score</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3">
          Contact Information
        </h4>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {data.email ||
                `${data.name?.toLowerCase().replace(" ", ".")}@example.com`}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {data.phone || "+1 (555) 123-4567"}
            </span>
          </div>
        </div>
      </div>

      {/* Professional Details */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3">
          Professional Details
        </h4>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <Briefcase className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              Experience: {data.experience}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              Applied: {data.appliedDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeamMemberView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/placeholder.svg" alt={data.name} />
          <AvatarFallback className="bg-gray-200 text-gray-700 text-lg">
            {data.avatar ||
              data.name
                ?.split(" ")
                .map((n: string) => n[0])
                .join("") ||
              "N/A"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900">{data.name}</h3>
          <p className="text-lg text-gray-600">{data.designation}</p>
          <p className="text-md text-gray-500">{data.department}</p>
        </div>
      </div>

      {/* Work Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3">Work Information</h4>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <Building className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              Department: {data.department}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              Joined: {data.joinDate}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Award className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              Experience: {data.experience}
            </span>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3">
          Contact Information
        </h4>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {data.email ||
                `${data.name?.toLowerCase().replace(" ", ".")}@company.com`}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {data.phone || "+1 (555) 987-6543"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderJobView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-gray-900">{data.title}</h3>
        <div className="flex items-center gap-4">
          <Badge className={`${data.statusColor} border-none`}>
            {data.status}
          </Badge>
          <span className="text-sm text-gray-500">{data.department}</span>
        </div>
      </div>

      {/* Job Details */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3">Job Details</h4>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              Location: {data.location}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Type: {data.type}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              Created: {data.createdDate}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              Applicants: {data.applicants}
            </span>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3">Job Description</h4>
        <p className="text-sm text-gray-600">
          We are looking for a skilled {data.title} to join our{" "}
          {data.department} team. The ideal candidate will have strong technical
          skills and experience in relevant technologies.
        </p>
      </div>
    </div>
  );

  const renderInterviewView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-6">
        <Avatar className="h-16 w-16">
          <AvatarImage src="/placeholder.svg" alt={data.candidate} />
          <AvatarFallback className="bg-gray-200 text-gray-700">
            {data.avatar ||
              data.candidate
                ?.split(" ")
                .map((n: string) => n[0])
                .join("") ||
              "N/A"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900">{data.candidate}</h3>
          <p className="text-lg text-gray-600">{data.position}</p>
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 mt-2"
          >
            {data.type}
          </Badge>
        </div>
      </div>

      {/* Interview Details */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3">Interview Details</h4>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Date: {data.date}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Time: {data.time}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3">Interview Notes</h4>
        <p className="text-sm text-gray-600">
          Scheduled {data.type.toLowerCase()} interview for {data.candidate}
          applying for {data.position} position.
        </p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (type) {
      case "candidate":
        return renderCandidateView();
      case "team-member":
        return renderTeamMemberView();
      case "job":
        return renderJobView();
      case "interview":
        return renderInterviewView();
      default:
        return <div>Invalid type</div>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {type === "candidate" && "Candidate Details"}
            {type === "team-member" && "Team Member Details"}
            {type === "job" && "Job Posting Details"}
            {type === "interview" && "Interview Details"}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">{renderContent()}</div>
        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
