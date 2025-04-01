
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-vaxtrack-500 mb-6">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved. 
          Please check the URL or navigate back to the homepage.
        </p>
        <Button asChild className="bg-vaxtrack-500 hover:bg-vaxtrack-600">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
