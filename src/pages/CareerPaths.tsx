
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Search, GraduationCap, Briefcase, BookOpen, Trophy, BookCheck, Code, Lightbulb, Globe, Heart, Calculator, Palette } from "lucide-react";

const CareerPaths = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter paths based on search query
  const filterPaths = (paths: any[]) => {
    if (!searchQuery) return paths;
    return paths.filter(path => 
      path.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      path.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="container py-8 md:py-12">
      {/* Page Header */}
      <div className="space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brand-blue-700">
          Career Paths After 10th Grade
        </h1>
        <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
          Explore all possible career options from after 10th grade to getting a job. Find detailed information
          about education requirements, skills needed, and job opportunities.
        </p>
      </div>

      {/* Search */}
      <div className="flex w-full max-w-xl mx-auto mb-10 items-center space-x-2">
        <Input
          type="search"
          placeholder="Search career paths..."
          className="flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" className="bg-brand-blue-500 hover:bg-brand-blue-600">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
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
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filterPaths([...after10thPaths, ...after12thPaths, ...higherEducationPaths]).map((path, index) => (
              <CareerPathCard key={index} path={path} />
            ))}
          </div>
          {filterPaths([...after10thPaths, ...after12thPaths, ...higherEducationPaths]).length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No career paths found matching your search.</p>
            </div>
          )}
        </TabsContent>
        
        {/* After 10th Paths */}
        <TabsContent value="after-10th">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filterPaths(after10thPaths).map((path, index) => (
              <CareerPathCard key={index} path={path} />
            ))}
          </div>
          {filterPaths(after10thPaths).length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No career paths found matching your search.</p>
            </div>
          )}
        </TabsContent>
        
        {/* After 12th Paths */}
        <TabsContent value="after-12th">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filterPaths(after12thPaths).map((path, index) => (
              <CareerPathCard key={index} path={path} />
            ))}
          </div>
          {filterPaths(after12thPaths).length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No career paths found matching your search.</p>
            </div>
          )}
        </TabsContent>
        
        {/* Higher Education Paths */}
        <TabsContent value="higher-education">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filterPaths(higherEducationPaths).map((path, index) => (
              <CareerPathCard key={index} path={path} />
            ))}
          </div>
          {filterPaths(higherEducationPaths).length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No career paths found matching your search.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Find Your Path CTA */}
      <div className="bg-brand-blue-50 rounded-lg p-6 md:p-8 mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-3 text-brand-blue-700">Not Sure Which Path Is Right For You?</h2>
        <p className="text-muted-foreground mb-6">
          Take our assessment to get personalized career recommendations based on your interests and aptitude.
        </p>
        <Button asChild size="lg" className="bg-brand-blue-500 hover:bg-brand-blue-600">
          <Link to="/assessment">Find Your Perfect Career Path</Link>
        </Button>
      </div>
    </div>
  );
};

// Career Path Card Component
const CareerPathCard = ({ path }: { path: any }) => {
  return (
    <Link
      to={path.link}
      className="group bg-white rounded-lg border border-border/50 shadow-sm hover:shadow-md transition-all overflow-hidden"
    >
      <div className="aspect-video bg-brand-blue-100 flex items-center justify-center">
        <path.icon className="h-12 w-12 text-brand-blue-500" />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-xl group-hover:text-brand-blue-500">{path.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{path.description}</p>
      </div>
    </Link>
  );
};

// Career paths data
const after10thPaths = [
  {
    title: "Science Stream (PCM)",
    description: "Physics, Chemistry, and Mathematics - Gateway to engineering, technology, and research careers.",
    icon: Calculator,
    link: "/career-paths/science-pcm"
  },
  {
    title: "Science Stream (PCB)",
    description: "Physics, Chemistry, and Biology - Foundation for medical, healthcare, and life sciences careers.",
    icon: Heart,
    link: "/career-paths/science-pcb"
  },
  {
    title: "Commerce Stream",
    description: "Study of business, economics, accounting, and finance for commercial career paths.",
    icon: Briefcase,
    link: "/career-paths/commerce"
  },
  {
    title: "Arts/Humanities",
    description: "Focus on languages, history, political science, psychology, and other social sciences.",
    icon: BookOpen,
    link: "/career-paths/arts"
  },
  {
    title: "Diploma in Engineering",
    description: "3-year technical program in various engineering fields as an alternative to 11th and 12th.",
    icon: Code,
    link: "/career-paths/diploma-engineering"
  },
  {
    title: "ITI Courses",
    description: "Industrial Training Institute programs for skills in electrical, mechanical, and other trades.",
    icon: Trophy,
    link: "/career-paths/iti"
  },
  {
    title: "Vocational Courses",
    description: "Skill-based education in areas like hospitality, healthcare, beauty, and more.",
    icon: BookCheck,
    link: "/career-paths/vocational"
  },
];

const after12thPaths = [
  {
    title: "Engineering",
    description: "Undergraduate programs in various engineering disciplines like computer science, mechanical, etc.",
    icon: Code,
    link: "/career-paths/engineering"
  },
  {
    title: "Medical & Healthcare",
    description: "Programs in medicine, dentistry, pharmacy, nursing, and allied health sciences.",
    icon: Heart,
    link: "/career-paths/medical"
  },
  {
    title: "Business & Management",
    description: "Degrees in business administration, commerce, accounting, economics, and management.",
    icon: Briefcase,
    link: "/career-paths/business"
  },
  {
    title: "Arts & Design",
    description: "Creative programs in fine arts, design, animation, fashion, architecture, and more.",
    icon: Palette,
    link: "/career-paths/arts-design"
  },
  {
    title: "Law",
    description: "Legal education to pursue careers as a lawyer, legal consultant, or in judiciary.",
    icon: BookOpen,
    link: "/career-paths/law"
  },
  {
    title: "Hotel Management",
    description: "Programs to pursue careers in hospitality, hotel operations, and tourism.",
    icon: Globe,
    link: "/career-paths/hotel-management"
  },
  {
    title: "Government Exams",
    description: "Preparation for various government service exams and public sector opportunities.",
    icon: BookCheck,
    link: "/career-paths/government-exams"
  },
];

const higherEducationPaths = [
  {
    title: "Master's Degrees",
    description: "Advanced specialization in various fields after completing undergraduate education.",
    icon: GraduationCap,
    link: "/career-paths/masters"
  },
  {
    title: "Doctoral Programs",
    description: "Research-focused PhD programs for advanced expertise and academic careers.",
    icon: Lightbulb,
    link: "/career-paths/phd"
  },
  {
    title: "MBA & Business",
    description: "Master of Business Administration and other advanced business qualifications.",
    icon: Briefcase,
    link: "/career-paths/mba"
  },
  {
    title: "Professional Certifications",
    description: "Industry-recognized qualifications to enhance skills and career prospects.",
    icon: BookCheck,
    link: "/career-paths/certifications"
  },
  {
    title: "Foreign Education",
    description: "Opportunities to study abroad for undergraduate and postgraduate programs.",
    icon: Globe,
    link: "/career-paths/study-abroad"
  },
];

export default CareerPaths;
