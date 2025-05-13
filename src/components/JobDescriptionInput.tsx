import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileSearch, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JobDescriptionInputProps {
  onUrlSubmit: (url: string) => void;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  onUrlSubmit,
}) => {
  const [url, setUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
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

    onUrlSubmit(url);
    toast({
      title: "Job description added",
      description: "Job description URL has been added successfully",
    });
    setIsEditing(false);
  };

  return (
    <Card className="shadow-md border-resume-blue/20">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative flex items-center">
              <Input
                type="text"
                placeholder="https://example.com/job-posting"
                value={url}
                onChange={handleUrlChange}
                className={`border-resume-blue/30 focus:border-resume-blue focus:ring-resume-blue ${
                  !isValidUrl && url ? "border-red-500" : ""
                } ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
                disabled={!isEditing}
              />
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-resume-blue hover:text-resume-blue-dark bg-white rounded-full border border-resume-blue/20 shadow-sm"
                  aria-label="Edit URL"
                >
                  <Pencil size={18} />
                </button>
              )}
            </div>
            {!isValidUrl && url && (
              <p className="text-red-500 text-xs mt-1">
                Please enter a valid URL
              </p>
            )}
            <Button
              type="submit"
              className="w-full bg-resume-blue hover:bg-resume-blue-dark"
              disabled={!isEditing}
            >
              {isEditing ? "Add Job Description" : "Added"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobDescriptionInput;
