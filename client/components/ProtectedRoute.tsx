// @ts-expect-error - React import compatibility
import React from "react";
// @ts-expect-error - React Router DOM import compatibility
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  // Show nothing while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect to signin page
  if (!isAuthenticated) {
    // Pass the current location to signin so user can be redirected back after login
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  
  // If authenticated, render children
  return <>{children}</>;
}

export function PublicRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  // Show nothing while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  // If authenticated, redirect to dashboard
  if (isAuthenticated) {
    // Get the return path or go to the dashboard by default
    const returnPath = location.state?.from?.pathname || "/";
    return <Navigate to={returnPath} replace />;
  }
  
  // If not authenticated, render children (signin, signup pages)
  return <>{children}</>;
}
