
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import components
import PageHeader from "@/components/career-path/PageHeader";
import SearchBar from "@/components/career-path/SearchBar";
import PathsGrid from "@/components/career-path/PathsGrid";
import FindPathCTA from "@/components/career-path/FindPathCTA";

// Import data
import { after10thPaths, after12thPaths, higherEducationPaths } from "@/data/careerPathsData";

const CareerPaths = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container py-8 md:py-12">
      {/* Page Header */}
      <PageHeader 
        title="Career Paths After 10th Grade"
        description="Explore all possible career options from after 10th grade to getting a job. Find detailed information
        about education requirements, skills needed, and job opportunities."
      />

      {/* Search */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {/* Tabs for different categories */}
      <Tabs defaultValue="all" className="w-full mb-8">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full max-w-3xl">
            <TabsTrigger value="all">All Paths</TabsTrigger>
            <TabsTrigger value="after-10th">After 10th</TabsTrigger>
            <TabsTrigger value="after-12th">After 12th</TabsTrigger>
            <TabsTrigger value="higher-education">Higher Education</TabsTrigger>
          </TabsList>
        </div>
        
        {/* All Paths */}
        <TabsContent value="all">
          <PathsGrid 
            paths={[...after10thPaths, ...after12thPaths, ...higherEducationPaths]} 
            searchQuery={searchQuery} 
          />
        </TabsContent>
        
        {/* After 10th Paths */}
        <TabsContent value="after-10th">
          <PathsGrid paths={after10thPaths} searchQuery={searchQuery} />
        </TabsContent>
        
        {/* After 12th Paths */}
        <TabsContent value="after-12th">
          <PathsGrid paths={after12thPaths} searchQuery={searchQuery} />
        </TabsContent>
        
        {/* Higher Education Paths */}
        <TabsContent value="higher-education">
          <PathsGrid paths={higherEducationPaths} searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
      
      {/* Find Your Path CTA */}
      <FindPathCTA />
    </div>
  );
};

export default CareerPaths;
