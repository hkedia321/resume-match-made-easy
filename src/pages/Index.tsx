
import React from "react";
import Hero from "@/components/Hero";
import ReviewContainer from "@/components/ReviewContainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-resume-purple/5 to-white">
      <div className="container mx-auto py-8 px-4">
        <Hero />
        
        <div className="my-12">
          <ReviewContainer />
        </div>
        
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Resume Review App © 2025 | Built to optimize job applications</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
