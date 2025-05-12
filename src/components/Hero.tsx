
import React from "react";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <div className="pt-16 pb-12 text-center animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-resume-blue to-resume-blue-light">
        Resume Review
      </h1>
      <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-600">
        Match your resume to job descriptions and get instant feedback to increase your chances of landing an interview.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Button
          className="bg-resume-blue hover:bg-resume-blue-dark text-white"
          onClick={() => document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" })}
        >
          Upload Resume
        </Button>
        <Button
          variant="outline" 
          className="border-resume-blue text-resume-blue hover:bg-resume-blue/10"
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default Hero;
