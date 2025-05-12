
import React from "react";
import ResumeUpload from "./ResumeUpload";
import JobDescriptionInput from "./JobDescriptionInput";

const ReviewContainer: React.FC = () => {
  return (
    <div id="upload-section" className="max-w-3xl mx-auto px-4">
      <div className="flex flex-col gap-6">
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <ResumeUpload />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <JobDescriptionInput />
        </div>
      </div>
      
      <div className="mt-10 text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <div className="bg-gradient-to-r from-resume-blue-light to-resume-blue p-5 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-white mb-3">Ready to improve your resume?</h3>
          <p className="text-white/90 text-sm">
            Upload your resume and add a job description URL to get personalized feedback and increase your chances of landing an interview.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewContainer;
