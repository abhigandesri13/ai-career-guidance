import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, GraduationCap, BookOpen, Briefcase, Award, Lightbulb, Clock, BookCheck, CircleDollarSign, Calculator, Heart, Code } from "lucide-react";

const CareerPathDetail = () => {
  const { pathId } = useParams();
  const pathData = getPathData(pathId);
  
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
      <div className="flex items-center justify-between mb-6">
        <Button asChild variant="outline" size="sm">
          <Link to="/career-paths" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Paths
          </Link>
        </Button>
      </div>
      
      <div className="mb-8 md:flex items-start gap-6">
        <div className="flex-shrink-0 w-20 h-20 bg-brand-blue-100 rounded-full flex items-center justify-center mb-4 md:mb-0">
          <pathData.icon className="h-10 w-10 text-brand-blue-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-brand-blue-700 mb-3">{pathData.title}</h1>
          <p className="text-lg text-muted-foreground">{pathData.description}</p>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 flex items-start gap-4">
            <div className="rounded-full bg-brand-blue-100 p-3 flex-shrink-0">
              <Clock className="h-5 w-5 text-brand-blue-500" />
            </div>
            <div>
              <h3 className="font-medium">Timeline</h3>
              <p className="text-sm text-muted-foreground">{pathData.timeline}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-start gap-4">
            <div className="rounded-full bg-brand-blue-100 p-3 flex-shrink-0">
              <CircleDollarSign className="h-5 w-5 text-brand-blue-500" />
            </div>
            <div>
              <h3 className="font-medium">Job Prospects</h3>
              <p className="text-sm text-muted-foreground">{pathData.jobProspects}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-start gap-4">
            <div className="rounded-full bg-brand-blue-100 p-3 flex-shrink-0">
              <BookCheck className="h-5 w-5 text-brand-blue-500" />
            </div>
            <div>
              <h3 className="font-medium">Entry Requirements</h3>
              <p className="text-sm text-muted-foreground">{pathData.entryRequirements}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Detailed Content */}
      <Tabs defaultValue="education">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 mb-8">
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="careers">Careers</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="education" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-brand-blue-500" />
                Course Structure & Fee Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-3">Duration & Structure</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="font-medium mb-2">Duration: {pathData.courseStructure.duration}</p>
                      <p className="text-sm text-muted-foreground">
                        {pathData.courseStructure.semesters} with practical training and projects
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="font-medium mb-2">Core Subjects</p>
                      <ul className="text-sm text-muted-foreground list-disc pl-4">
                        {pathData.courseStructure.mainSubjects.slice(0, 4).map((subject, index) => (
                          <li key={index}>{subject}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-3">Fee Structure</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Government Institutions</h4>
                      <p className="text-2xl font-semibold text-brand-blue-600 mb-2">
                        {pathData.feeStructure.undergraduate.government.range}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {pathData.feeStructure.undergraduate.government.notes}
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Private Institutions</h4>
                      <p className="text-2xl font-semibold text-brand-blue-600 mb-2">
                        {pathData.feeStructure.undergraduate.private.range}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {pathData.feeStructure.undergraduate.private.notes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Entrance Exams & Scholarships</h2>
              <div className="space-y-6">
                {pathData.entranceExams.map((exam, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                    <h3 className="font-medium text-lg mb-2">{exam.name}</h3>
                    <div className="grid sm:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground">{exam.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="px-2 py-1 bg-brand-blue-100 text-brand-blue-700 text-xs rounded-full">
                            Level: {exam.level}
                          </span>
                          <span className="px-2 py-1 bg-brand-blue-100 text-brand-blue-700 text-xs rounded-full">
                            Timing: {exam.timing}
                          </span>
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-sm font-medium mb-1">Eligibility</p>
                        <p className="text-sm text-muted-foreground">{exam.eligibility}</p>
                        <p className="text-sm font-medium mt-2 mb-1">Fee Waivers & Scholarships</p>
                        <p className="text-sm text-muted-foreground">{exam.freeShips}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-6">
                  <h3 className="font-medium text-lg mb-3">Available Scholarships</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {pathData.scholarships.map((scholarship, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-1">{scholarship.name}</h4>
                        <p className="text-brand-blue-600 font-semibold mb-1">{scholarship.amount}</p>
                        <p className="text-sm text-muted-foreground mb-2">{scholarship.eligibility}</p>
                        <a href={scholarship.link} className="text-sm text-brand-blue-500 hover:underline">
                          Learn More →
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Award className="h-6 w-6 text-brand-blue-500" />
                Required Skills
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Technical Skills</h3>
                  <ul className="space-y-3">
                    {pathData.skills.technical.map((skill, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-brand-blue-100 p-1 mt-0.5">
                          <BookCheck className="h-3 w-3 text-brand-blue-500" />
                        </div>
                        <div>
                          <span className="font-medium">{skill.name}</span>
                          <p className="text-sm text-muted-foreground">{skill.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Soft Skills</h3>
                  <ul className="space-y-3">
                    {pathData.skills.soft.map((skill, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-brand-blue-100 p-1 mt-0.5">
                          <BookCheck className="h-3 w-3 text-brand-blue-500" />
                        </div>
                        <div>
                          <span className="font-medium">{skill.name}</span>
                          <p className="text-sm text-muted-foreground">{skill.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Skill Development Resources</h2>
              <div className="space-y-4">
                {pathData.skillResources.map((resource, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                    <h3 className="font-medium">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                    <div className="text-brand-blue-500 text-sm font-medium">
                      <a href={resource.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        Learn More →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="careers" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-brand-blue-500" />
                Career Opportunities
              </h2>
              
              <div className="space-y-6">
                {pathData.careerOptions.map((career, index) => (
                  <div key={index} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                    <h3 className="font-semibold text-lg mb-2">{career.title}</h3>
                    <p className="text-muted-foreground mb-3">{career.description}</p>
                    
                    <div className="grid sm:grid-cols-3 gap-4 text-sm">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <h4 className="font-medium mb-1">Average Salary</h4>
                        <p>{career.salary}</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <h4 className="font-medium mb-1">Job Growth</h4>
                        <p>{career.growth}</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <h4 className="font-medium mb-1">Work Environment</h4>
                        <p>{career.environment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Job Profiles</h2>
              <div className="space-y-4">
                {pathData.jobProfiles.map((profile, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                    <h3 className="font-medium">{profile.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{profile.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {profile.skills.map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-brand-blue-100 text-brand-blue-700 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-brand-blue-500" />
                Learning Resources
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Books & Study Material</h3>
                  <ul className="space-y-3">
                    {pathData.resources.books.map((book, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-brand-blue-100 p-1 mt-0.5">
                          <BookOpen className="h-3 w-3 text-brand-blue-500" />
                        </div>
                        <div>
                          <span className="font-medium">{book.title}</span>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Online Courses</h3>
                  <ul className="space-y-3">
                    {pathData.resources.courses.map((course, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-brand-blue-100 p-1 mt-0.5">
                          <BookCheck className="h-3 w-3 text-brand-blue-500" />
                        </div>
                        <div>
                          <span className="font-medium">{course.title}</span>
                          <p className="text-sm text-muted-foreground">{course.platform}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Websites & Communities</h3>
                  <ul className="space-y-3">
                    {pathData.resources.websites.map((website, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-brand-blue-100 p-1 mt-0.5">
                          <GraduationCap className="h-3 w-3 text-brand-blue-500" />
                        </div>
                        <div>
                          <span className="font-medium">{website.name}</span>
                          <p className="text-sm text-muted-foreground">{website.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Related Paths */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Related Career Paths</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {pathData.relatedPaths.map((path, index) => (
            <Link
              key={index}
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
          ))}
        </div>
      </div>
      
      {/* Assessment CTA */}
      <div className="bg-brand-blue-50 rounded-lg p-6 md:p-8 mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-3 text-brand-blue-700">Still Exploring Your Options?</h2>
        <p className="text-muted-foreground mb-6">
          Take our assessment to discover more career paths that match your interests and aptitudes.
        </p>
        <Button asChild size="lg" className="bg-brand-blue-500 hover:bg-brand-blue-600">
          <Link to="/assessment">Find Your Perfect Career Path</Link>
        </Button>
      </div>
    </div>
  );
};

// Mock data function to get path details by ID
function getPathData(pathId: string | undefined) {
  // This would typically come from an API or a more comprehensive data source
  const paths: Record<string, any> = {
    "science-pcm": {
      title: "Science Stream (PCM)",
      description: "Physics, Chemistry, and Mathematics - Gateway to engineering, technology, and research careers",
      icon: Calculator,
      timeline: "2 years (11th-12th) + 3-5 years higher education",
      jobProspects: "Excellent with growing demand in engineering and technology sectors",
      entryRequirements: "Minimum 60% in 10th with strong aptitude in mathematics and science",
      educationPath: [
        {
          title: "After 10th (Higher Secondary - 11th & 12th)",
          description: "Science stream with Physics, Chemistry, and Mathematics (PCM) as core subjects. Additional subjects may include Computer Science, Biology, or other electives.",
          keyPoints: [
            "Focus on building strong fundamentals in PCM",
            "Prepare simultaneously for board exams and competitive entrance tests",
            "Consider additional coaching for JEE/other engineering entrance exams",
            "Develop practical skills through science projects and laboratories"
          ]
        },
        {
          title: "After 12th (Undergraduate Education)",
          description: "Bachelor's degree in Engineering, Technology, or Pure Sciences. Popular options include B.Tech, BE, BSc, and BCA programs.",
          keyPoints: [
            "Engineering: 4-year B.Tech/BE programs in various specializations",
            "Pure Sciences: 3-year BSc in Physics, Mathematics, Chemistry, etc.",
            "Computer Applications: 3-year BCA for IT and software roles",
            "Prepare for entrance exams like JEE (Main/Advanced), state engineering exams"
          ]
        },
        {
          title: "Higher Education (Optional)",
          description: "Master's and doctoral programs for specialization and research opportunities. Options include M.Tech, MSc, PhD, and more.",
          keyPoints: [
            "M.Tech/ME: 2-year programs for advanced engineering expertise",
            "MSc: 2-year programs in pure sciences for specialized knowledge",
            "PhD: Research-focused doctoral programs for academic careers",
            "Prepare for entrance exams like GATE, JAM, GRE, etc."
          ]
        }
      ],
      entranceExams: [
        {
          name: "JEE Main & Advanced",
          description: "National level engineering entrance exams for IITs, NITs, and other premier institutions",
          level: "National",
          timing: "Usually conducted 2-4 times a year",
          eligibility: "12th PCM with minimum 75% marks",
          freeShips: "SC/ST/PwD candidates get complete fee waiver, merit scholarships available",
          preparationTips: "Focus on NCERT books, join test series, practice previous papers"
        },
        {
          name: "BITSAT",
          description: "Online entrance test for admission to BITS Pilani campuses",
          level: "National",
          timing: "Usually in May-June",
          eligibility: "12th PCM with minimum 75% marks",
          freeShips: "Merit scholarships available based on BITSAT score",
          preparationTips: "Practice computer-based tests, focus on speed and accuracy"
        },
        {
          name: "State Engineering CETs",
          description: "State-level entrance tests for engineering colleges",
          level: "State",
          timing: "After board exams (May-June)",
          eligibility: "12th PCM from respective state board",
          freeShips: "State government scholarships available for eligible candidates",
          preparationTips: "Focus on state board syllabus along with entrance exam topics"
        }
      ],
      
      feeStructure: {
        undergraduate: {
          government: {
            range: "₹30,000 - ₹1,50,000 per year",
            details: "Includes tuition, hostel, and other mandatory fees",
            notes: "Government colleges have subsidized fees"
          },
          private: {
            range: "₹1,00,000 - ₹4,00,000 per year",
            details: "Includes tuition, development fees, and other charges",
            notes: "Can vary significantly based on college reputation and location"
          }
        },
        coaching: {
          jee: {
            range: "₹25,000 - ₹1,50,000 per year",
            details: "For JEE preparation coaching",
            notes: "Many institutes offer scholarships based on entrance tests"
          },
          extras: {
            range: "₹5,000 - ₹20,000",
            details: "For study materials, test series, etc.",
            notes: "Optional but recommended for better preparation"
          }
        }
      },
      
      scholarships: [
        {
          name: "AICTE Pragati Scholarship",
          amount: "₹50,000 per annum",
          eligibility: "Girl students from families with income less than 8 lakhs",
          link: "#"
        },
        {
          name: "Central Sector Scheme",
          amount: "₹10,000 per month",
          eligibility: "Top 500 ranks in JEE Advanced",
          link: "#"
        },
        {
          name: "State Merit Scholarships",
          amount: "Varies by state",
          eligibility: "Based on entrance exam rank and category",
          link: "#"
        }
      ],

      courseStructure: {
        duration: "4 years",
        semesters: "8 semesters",
        mainSubjects: [
          "Engineering Mathematics",
          "Physics",
          "Chemistry",
          "Programming",
          "Basic Electronics",
          "Engineering Drawing"
        ],
        specializations: [
          {
            name: "Computer Science",
            subjects: ["Data Structures", "Algorithms", "Database Management", "Operating Systems"]
          },
          {
            name: "Mechanical",
            subjects: ["Thermodynamics", "Machine Design", "Manufacturing Processes", "CAD/CAM"]
          },
          {
            name: "Electrical",
            subjects: ["Circuit Theory", "Power Systems", "Control Systems", "Microprocessors"]
          }
        ],
        practicals: {
          labs: ["Physics Lab", "Chemistry Lab", "Programming Lab", "Workshop"],
          projects: ["Mini Project (6th sem)", "Major Project (8th sem)"],
          internships: "Mandatory internship in 3rd year summer"
        }
      },
      relatedPaths: [
        {
          title: "Science Stream (PCB)",
          description: "For those interested in medical and biological sciences",
          icon: Heart,
          link: "/career-paths/science-pcb"
        },
        {
          title: "Computer Science & IT",
          description: "Specialized focus on programming and information technology",
          icon: Code,
          link: "/career-paths/technical"
        },
        {
          title: "Diploma in Engineering",
          description: "Shorter, more hands-on alternative to engineering degrees",
          icon: BookCheck,
          link: "/career-paths/diploma-engineering"
        }
      ]
    }
    // Additional career paths would be defined here
  };
  
  return pathId ? paths[pathId] : null;
}

export default CareerPathDetail;
