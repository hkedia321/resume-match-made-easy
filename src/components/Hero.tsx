import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import bgMan from "../manbg.png";

const Hero: React.FC = () => {
  return (
    <div className="pb-12 text-center animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-4">
        <img src={bgMan} alt="Background Man" className="mx-auto mb-4 w-3/4" />
        <div className="flex items-center justify-center">
          <Search className="h-10 w-10 text-resume-blue mr-2" strokeWidth={2} />
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-resume-blue to-resume-blue-light">
            Resume Lens
          </h1>
        </div>
      </div>
      <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-600">
        Match your resume to job descriptions and get instant feedback to
        increase your chances of landing an interview.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Button
          className="bg-resume-blue hover:bg-resume-blue-dark text-white"
          onClick={() =>
            document
              .getElementById("upload-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Upload Resume
        </Button>
      </div>
    </div>
  );
};

export default Hero;
