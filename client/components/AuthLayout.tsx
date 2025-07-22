import React, { ReactNode } from "react";
import { Brain } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      {/* Left side: Branding (60% on desktop) */}
      <div className="w-full md:w-3/5 bg-gray-900 flex flex-col items-center justify-center p-8 relative">
        <div className="absolute top-8 left-8 md:static md:mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white">
            <Brain className="h-8 w-8 text-gray-900" />
          </div>
        </div>
        
        <div className="text-center max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">HireAI</h1>
          <p className="text-xl text-gray-300 mb-8">AI Hiring Platform</p>
          <p className="text-gray-400">Powered by Biz4 Group</p>
        </div>
        
        <div className="hidden md:block absolute bottom-8 left-0 right-0 text-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} HireAI. All rights reserved.</p>
        </div>
      </div>

      {/* Right side: Form (40% on desktop) */}
      <div className="w-full md:w-2/5 bg-white flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
