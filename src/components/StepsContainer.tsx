import React, { useState } from "react";
import ResumeUpload from "./ResumeUpload";
import JobDescriptionInput from "./JobDescriptionInput";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, FileSearch, ArrowDown, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import mockResponse from "./mockResponse.json";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const StepsContainer: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobUrl, setJobUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<any | null>();
  const { toast } = useToast();
  const [animatedScore, setAnimatedScore] = useState(0);

  const handleResumeUpload = (file: File) => {
    setResumeFile(file);
  };

  const handleJobUrlSubmit = (url: string) => {
    setJobUrl(url);
  };

  const compareResumeWithJob = async () => {
    if (!resumeFile || !jobUrl) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", resumeFile);
      formData.append("job_url", jobUrl);

      const response = await fetch(`${API_URL}/compare-resume-job`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to compare resume with job");
      }

      const data = await response.json();
      setComparisonResult(data.comparison_result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to compare resume with job description",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Call compareResumeWithJob when both resume and job URL are available
  React.useEffect(() => {
    if (resumeFile && jobUrl) {
      compareResumeWithJob();
    }
  }, [resumeFile, jobUrl]);

  React.useEffect(() => {
    if (comparisonResult && typeof comparisonResult.match_score === "number") {
      setAnimatedScore(0); // Reset to 0 before animating
      const target = comparisonResult.match_score;
      let current = 0;
      const duration = 1200; // ms
      const steps = 60;
      const increment = target / steps;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        current += increment;
        if (step >= steps) {
          setAnimatedScore(target);
          clearInterval(interval);
        } else {
          setAnimatedScore(Math.round(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [comparisonResult]);

  let color = "#ef4444"; // red
  if (comparisonResult && comparisonResult.match_score >= 75)
    color = "#22c55e"; // green
  else if (comparisonResult && comparisonResult.match_score >= 50)
    color = "#eab308"; // yellow

  return (
    <div id="upload-section" className="max-w-3xl mx-auto px-4">
      <div className="flex flex-col gap-4 relative">
        {/* Step 1 */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center mb-3">
            <div className="bg-resume-blue text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold mr-2">
              1
            </div>
            <h3 className="text-lg font-semibold text-resume-blue flex items-center">
              <FileText className="h-5 w-5 mr-2 text-resume-blue" /> Upload Your
              Resume
            </h3>
          </div>
          <ResumeUpload onFileUpload={handleResumeUpload} />
        </div>

        {/* Connection line 1-2 */}
        <div className="flex justify-center items-center h-14">
          <div className="w-0.5 h-full border-l-2 border-dashed border-resume-blue/50"></div>
        </div>

        {/* Step 2 */}
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center mb-3">
            <div className="bg-resume-blue text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold mr-2">
              2
            </div>
            <h3 className="text-lg font-semibold text-resume-blue flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-resume-blue" /> Add Job
              Description Link
            </h3>
          </div>
          <JobDescriptionInput onUrlSubmit={handleJobUrlSubmit} />
        </div>

        {/* Connection line 2-3 */}
        <div className="flex justify-center items-center h-14">
          <div className="w-0.5 h-full border-l-2 border-dashed border-resume-blue/50"></div>
        </div>

        {/* Step 3 */}
        <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="flex items-center mb-3">
            <div className="bg-resume-blue text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold mr-2">
              3
            </div>
            <h3 className="text-lg font-semibold text-resume-blue">
              Review Results
            </h3>
          </div>
          <Card className="shadow-md border-gray-200 bg-gray-100">
            <CardContent className="p-6">
              {isLoading ? (
                <div className="flex flex-col items-center text-center py-6">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-resume-blue"></div>
                  <p className="mt-4 text-gray-600">Analyzing your resume...</p>
                </div>
              ) : comparisonResult ? (
                <div className="flex flex-col items-center text-center py-6">
                  <div style={{ width: 110, marginBottom: 16 }}>
                    <CircularProgressbar
                      value={animatedScore}
                      counterClockwise={true}
                      text={`${animatedScore}%`}
                      styles={buildStyles({
                        pathColor: color,
                        textColor: color,
                        trailColor: "#e5e7eb",
                        textSize: "28px",
                        strokeLinecap: "round",
                      })}
                    />
                  </div>
                  <h3
                    className="text-xl font-bold text-resume-blue mb-2"
                    style={{ color: color }}
                  >
                    {comparisonResult.match_score}% Match!
                  </h3>
                  <div className="w-full space-y-4 mt-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left w-full">
                      <h4 className="font-semibold text-green-700 mb-2">
                        Key Strengths
                      </h4>
                      <ul className="list-disc list-inside text-green-800 text-sm">
                        {comparisonResult.key_strengths?.map(
                          (item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left w-full">
                      <h4 className="font-semibold text-red-700 mb-2">
                        Areas for Improvement
                      </h4>
                      <ul className="list-disc list-inside text-red-800 text-sm">
                        {comparisonResult.areas_for_improvement?.map(
                          (item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left w-full">
                      <h4 className="font-semibold text-blue-700 mb-2">
                        Resume Suggestions
                      </h4>
                      <ul className="list-disc list-inside text-blue-800 text-sm">
                        {comparisonResult.resume_suggestions?.map(
                          (item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left w-full">
                      <h4 className="font-semibold text-yellow-700 mb-2">
                        Skills to Develop
                      </h4>
                      <ul className="list-disc list-inside text-yellow-800 text-sm">
                        {comparisonResult.skills_to_develop?.map(
                          (item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center py-6 opacity-70">
                  <FileSearch className="h-12 w-12 text-gray-400 mb-3" />
                  <h3 className="text-lg font-bold text-gray-500 mb-2">
                    Resume Analysis
                  </h3>
                  <p className="text-gray-500">
                    Your resume analysis will appear here after completing steps
                    1 and 2
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StepsContainer;
