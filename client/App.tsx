import "./global.css";

import React, { StrictMode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Candidates from "./pages/Candidates";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";
import CreateJobPosting from "./pages/CreateJobPosting";
import ResumeScreening from "./pages/ResumeScreening";
import SkillMatching from "./pages/SkillMatching";
import Schedule from "./pages/Schedule";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/candidates" element={<Candidates />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/create" element={<CreateJob />} />
              <Route path="/create-job" element={<CreateJobPosting />} />
              <Route path="/resume-screening" element={<ResumeScreening />} />
              <Route path="/skill-matching" element={<SkillMatching />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/team" element={<Team />} />
              {/* Placeholder routes - will be implemented later */}
              <Route path="/analytics" element={<Index />} />
              <Route path="/interviews" element={<Index />} />
              <Route path="/ai-assistant" element={<Index />} />
              <Route path="/messages" element={<Index />} />
              <Route path="/reports" element={<Index />} />
              <Route path="/settings" element={<Settings />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
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
