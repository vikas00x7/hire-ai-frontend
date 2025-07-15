import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="text-6xl font-bold text-muted-foreground mb-2">
                404
              </div>
              <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
              <p className="text-muted-foreground">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
              <Button asChild>
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
