import React, { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Users,
  Briefcase,
  Calendar,
  MessageSquare,
  Settings,
  Search,
  Bell,
  User,
  LogOut,
  Home,
  FileText,
  Zap,
  Target,
  Brain,
  UserCheck,
  Clock,
  UserPlus,
  ChevronLeft,
  Menu,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface DashboardLayoutProps {
  children: ReactNode;
}

const overviewItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    url: "/",
  },
  {
    title: "Candidates",
    icon: Users,
    url: "/candidates",
  },
  {
    title: "Job Postings",
    icon: Briefcase,
    url: "/jobs",
  },
];

const aiToolsItems = [
  {
    title: "Resume Screening",
    icon: FileText,
    url: "/resume-screening",
  },
  {
    title: "Skill Matching",
    icon: Target,
    url: "/skill-matching",
  },
];

const managementItems = [
  {
    title: "Schedule",
    icon: Calendar,
    url: "/schedule",
  },
  {
    title: "Team",
    icon: UserCheck,
    url: "/team",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    // Handle logout logic here - could redirect to login page, clear auth tokens, etc.
    console.log("User logged out");
    // For demo purposes, just show an alert
    alert("You have been logged out!");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200 bg-white">
          <SidebarHeader className="border-b border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  <span style={{ color: "rgb(255, 255, 255)" }}>HireAI</span>
                </h2>
                <p className="text-xs text-gray-500">
                  <span style={{ color: "rgb(255, 255, 255)" }}>
                    AI Hiring Platform
                  </span>
                </p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-3 py-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-2">
                <span style={{ color: "rgb(255, 255, 255)" }}>Overview</span>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {overviewItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.url}
                        className="w-full justify-start gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:bg-opacity-10 data-[active=true]:bg-gray-800 data-[active=true]:text-white data-[active=true]:border data-[active=true]:border-white data-[active=true]:rounded-lg"
                      >
                        <Link to={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>
                            <span style={{ color: "rgb(255, 255, 255)" }}>
                              {item.title}
                            </span>
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-6">
              <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-2">
                <span style={{ color: "rgb(255, 255, 255)" }}>AI Tools</span>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {aiToolsItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.url}
                        className="w-full justify-start gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:bg-opacity-10 data-[active=true]:bg-gray-800 data-[active=true]:text-white data-[active=true]:border data-[active=true]:border-white data-[active=true]:rounded-lg"
                      >
                        <Link to={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>
                            <span style={{ color: "rgb(255, 255, 255)" }}>
                              {item.title}
                            </span>
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-6">
              <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-2">
                <span style={{ color: "rgb(255, 255, 255)" }}>Management</span>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {managementItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.url}
                        className="w-full justify-start gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:bg-opacity-10 data-[active=true]:bg-gray-800 data-[active=true]:text-white data-[active=true]:border data-[active=true]:border-white data-[active=true]:rounded-lg"
                      >
                        <Link to={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>
                            <span style={{ color: "rgb(255, 255, 255)" }}>
                              {item.title}
                            </span>
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-4">
            {/* User Info with Small Logout Button */}
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-gray-200">SA</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">
                    <span style={{ color: "rgb(255, 255, 255)" }}>Sarah</span>
                  </span>
                  <span className="text-xs text-gray-500">
                    <span style={{ color: "rgb(255, 255, 255)" }}>
                      HR Manager
                    </span>
                  </span>
                </div>
              </div>

              {/* Small Logout Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="h-8 w-8 p-0 text-white hover:bg-red-500 hover:bg-opacity-20"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 bg-gray-50">
          <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
