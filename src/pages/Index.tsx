import React from "react";
import Hero from "@/components/Hero";
import StepsContainer from "@/components/StepsContainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-resume-blue/5 to-white">
      <div className="container mx-auto py-8 px-4">
        <Hero />

        <div className="my-16">
          <StepsContainer />
        </div>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Resume Lens © 2025 | Built to optimize job applications</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
