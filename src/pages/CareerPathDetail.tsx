
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPathData } from "@/utils/careerPathData";
import { toast } from "sonner";
import { useEffect } from "react";

// Import all components
import PathHeader from "@/components/career-path/PathHeader";
import OverviewCards from "@/components/career-path/OverviewCards";
import EducationTab from "@/components/career-path/EducationTab";
import SkillsTab from "@/components/career-path/SkillsTab";
import CareersTab from "@/components/career-path/CareersTab";
import ResourcesTab from "@/components/career-path/ResourcesTab";
import RelatedPaths from "@/components/career-path/RelatedPaths";
import AssessmentCTA from "@/components/career-path/AssessmentCTA";

const CareerPathDetail = () => {
  const { pathId } = useParams();
  const pathData = getPathData(pathId);
  
  useEffect(() => {
    if (!pathData) {
      toast.error("Career path not found", {
        description: "The requested career path information could not be found"
      });
    }
  }, [pathData]);

  if (!pathData) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Career Path Not Found</h1>
        <p className="mb-8">Sorry, we couldn't find information about this career path.</p>
        <Button asChild>
          <Link to="/career-paths">View All Career Paths</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      {/* Page Header */}
      <PathHeader 
        icon={pathData.icon} 
        title={pathData.title} 
        description={pathData.description} 
      />
      
      {/* Overview Cards */}
      <OverviewCards 
        timeline={pathData.timeline}
        jobProspects={pathData.jobProspects}
        entryRequirements={pathData.entryRequirements}
      />
      
      {/* Detailed Content */}
      <Tabs defaultValue="education">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 mb-8">
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="careers">Careers</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="education">
          <EducationTab 
            courseStructure={pathData.courseStructure}
            feeStructure={pathData.feeStructure}
            entranceExams={pathData.entranceExams}
            scholarships={pathData.scholarships}
            topColleges={pathData.topColleges}
          />
        </TabsContent>
        
        <TabsContent value="skills">
          <SkillsTab 
            skills={pathData.skills || {}}
            skillResources={pathData.skillResources || []}
          />
        </TabsContent>
        
        <TabsContent value="careers">
          <CareersTab 
            careerOptions={pathData.careerOptions || []}
            jobProfiles={pathData.jobProfiles || []}
          />
        </TabsContent>
        
        <TabsContent value="resources">
          <ResourcesTab resources={pathData.resources || {}} />
        </TabsContent>
      </Tabs>
      
      {/* Related Paths */}
      <RelatedPaths relatedPaths={pathData.relatedPaths || []} />
      
      {/* Assessment CTA */}
      <AssessmentCTA />
    </div>
  );
};

export default CareerPathDetail;
