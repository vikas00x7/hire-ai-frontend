import "./global.css";

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute, PublicRoute } from "@/components/ProtectedRoute";
import Index from "@/pages/Index";
import Candidates from "@/pages/Candidates";
import Jobs from "@/pages/Jobs";
import CreateJob from "@/pages/CreateJob";
import CreateJobPosting from "@/pages/CreateJobPosting";
import ResumeScreening from "@/pages/ResumeScreening";
import SkillMatching from "@/pages/SkillMatching";
import Schedule from "@/pages/Schedule";
import Team from "@/pages/Team";
import Settings from "@/pages/Settings";
import SignIn from "@/pages/SignIn";
import Signup from "@/pages/Signup";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <TooltipProvider>
              <Routes>
                {/* Public Routes - accessible only when not authenticated */}
                <Route 
                  path="/signup" 
                  element={
                    <PublicRoute>
                      <Signup />
                    </PublicRoute>
                  } 
                />
                <Route 
                  path="/signin" 
                  element={
                    <PublicRoute>
                      <SignIn />
                    </PublicRoute>
                  } 
                />
                
                {/* Protected Routes - require authentication */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path="/candidates" 
                  element={
                    <ProtectedRoute>
                      <Candidates />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/jobs" 
                  element={
                    <ProtectedRoute>
                      <Jobs />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/jobs/create" 
                  element={
                    <ProtectedRoute>
                      <CreateJob />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/create-job" 
                  element={
                    <ProtectedRoute>
                      <CreateJobPosting />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/resume-screening" 
                  element={
                    <ProtectedRoute>
                      <ResumeScreening />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/skill-matching" 
                  element={
                    <ProtectedRoute>
                      <SkillMatching />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/schedule" 
                  element={
                    <ProtectedRoute>
                      <Schedule />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/team" 
                  element={
                    <ProtectedRoute>
                      <Team />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/analytics" 
                  element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/interviews" 
                  element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/ai-assistant" 
                  element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/messages" 
                  element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/reports" 
                  element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Catch all route - redirect to signin */}
                <Route path="*" element={<Navigate to="/signin" replace />} />
              </Routes>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found");
}
