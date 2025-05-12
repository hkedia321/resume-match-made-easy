
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JobDescriptionInput: React.FC = () => {
  const [url, setUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const { toast } = useToast();

  const validateUrl = (input: string) => {
    if (!input) {
      return true; // Empty is valid (not submitted yet)
    }
    
    try {
      const parsedUrl = new URL(input);
      return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUrl(input);
    setIsValidUrl(validateUrl(input));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "URL required",
        description: "Please enter a job description URL",
        variant: "destructive",
      });
      return;
    }
    
    if (!isValidUrl) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (e.g., https://example.com)",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Job description added",
      description: "Job description URL has been added successfully",
    });
  };

  return (
    <Card className="shadow-md border-resume-purple/20 mt-6">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Link className="h-5 w-5 mr-2 text-resume-purple" />
          Job Description URL
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="https://example.com/job-posting"
                value={url}
                onChange={handleUrlChange}
                className={`border-resume-purple/30 focus:border-resume-purple focus:ring-resume-purple ${
                  !isValidUrl && url ? "border-red-500" : ""
                }`}
              />
              {!isValidUrl && url && (
                <p className="text-red-500 text-xs mt-1">
                  Please enter a valid URL
                </p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-resume-purple hover:bg-resume-purple-dark"
            >
              Add Job Description
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobDescriptionInput;
