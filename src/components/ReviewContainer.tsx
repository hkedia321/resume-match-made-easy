
import React from "react";
import ResumeUpload from "./ResumeUpload";
import JobDescriptionInput from "./JobDescriptionInput";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, FileSearch, ArrowDown } from "lucide-react";

const ReviewContainer: React.FC = () => {
  return (
    <div id="upload-section" className="max-w-3xl mx-auto px-4">
      <div className="flex flex-col gap-12 relative">
        {/* Step 1 */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center mb-3">
            <div className="bg-resume-blue text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold mr-2">
              1
            </div>
            <h3 className="text-lg font-semibold text-resume-blue">Upload Your Resume</h3>
          </div>
          <ResumeUpload />
        </div>
        
        {/* Connection line 1-2 */}
        <div className="absolute left-3.5 top-[150px] h-[120px] border-l-2 border-dashed border-resume-blue/50 z-0"></div>
        
        {/* Step 2 */}
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center mb-3">
            <div className="bg-resume-blue text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold mr-2">
              2
            </div>
            <h3 className="text-lg font-semibold text-resume-blue">Add Job Description</h3>
          </div>
          <JobDescriptionInput />
        </div>
        
        {/* Connection line 2-3 */}
        <div className="absolute left-3.5 top-[360px] h-[120px] border-l-2 border-dashed border-resume-blue/50 z-0"></div>
        
        {/* Step 3 */}
        <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="flex items-center mb-3">
            <div className="bg-resume-blue text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold mr-2">
              3
            </div>
            <h3 className="text-lg font-semibold text-resume-blue">Review Results</h3>
          </div>
          <Card className="shadow-md border-gray-200 bg-gray-100 opacity-70">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center py-6">
                <FileSearch className="h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-bold text-gray-500 mb-2">Resume Analysis</h3>
                <p className="text-gray-500">
                  Your resume analysis will appear here after completing steps 1 and 2
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReviewContainer;
