
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
                Education Pathway
              </h2>
              
              <div className="space-y-6">
                {pathData.educationPath.map((step, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-brand-blue-100 pb-6 last:border-l-0 last:pb-0">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-brand-blue-500"></div>
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-3">{step.description}</p>
                    <div className="bg-muted/50 rounded-lg p-4 text-sm">
                      <h4 className="font-medium mb-2">Key Considerations:</h4>
                      <ul className="space-y-1 list-disc pl-4">
                        {step.keyPoints.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Entrance Exams & Admissions</h2>
              <div className="space-y-4">
                {pathData.entranceExams.map((exam, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                    <h3 className="font-medium">{exam.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{exam.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2 py-1 bg-brand-blue-100 text-brand-blue-700 rounded-full">
                        Level: {exam.level}
                      </span>
                      <span className="px-2 py-1 bg-brand-blue-100 text-brand-blue-700 rounded-full">
                        Timing: {exam.timing}
                      </span>
                    </div>
                  </div>
                ))}
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
          description: "National level engineering entrance exams for admission to IITs, NITs, and other premier engineering institutions",
          level: "National",
          timing: "Usually conducted 2-4 times a year"
        },
        {
          name: "State Engineering Entrance Exams",
          description: "State-specific engineering entrance exams for admission to state colleges and universities",
          level: "State",
          timing: "Typically after 12th board exams"
        },
        {
          name: "BITSAT",
          description: "Entrance exam for admission to BITS Pilani and its campuses",
          level: "National",
          timing: "Usually in May-June"
        },
        {
          name: "GATE (For Postgraduate)",
          description: "Graduate Aptitude Test in Engineering for M.Tech admissions and PSU recruitment",
          level: "National",
          timing: "Usually in February"
        }
      ],
      skills: {
        technical: [
          {
            name: "Mathematical Aptitude",
            description: "Strong foundation in mathematics, problem-solving, and quantitative reasoning"
          },
          {
            name: "Scientific Knowledge",
            description: "Understanding of physical and chemical principles and their applications"
          },
          {
            name: "Analytical Thinking",
            description: "Ability to analyze complex problems and develop logical solutions"
          },
          {
            name: "Computer Skills",
            description: "Proficiency in relevant software, programming languages, and technical tools"
          }
        ],
        soft: [
          {
            name: "Problem-Solving",
            description: "Identifying and addressing complex issues with effective solutions"
          },
          {
            name: "Critical Thinking",
            description: "Evaluating information objectively to form reasoned judgments"
          },
          {
            name: "Communication",
            description: "Clearly expressing technical concepts to both technical and non-technical audiences"
          },
          {
            name: "Teamwork",
            description: "Collaborating effectively in group projects and interdisciplinary teams"
          }
        ]
      },
      skillResources: [
        {
          title: "Problem-Solving Practice Platforms",
          description: "Online platforms like LeetCode, HackerRank, and Codeforces for developing programming and problem-solving skills",
          link: "#"
        },
        {
          title: "Mathematics Mastery Resources",
          description: "Online courses and tutorials for advanced mathematics topics relevant to engineering and science fields",
          link: "#"
        },
        {
          title: "Project-Based Learning",
          description: "Hands-on projects to apply theoretical knowledge and develop practical engineering skills",
          link: "#"
        }
      ],
      careerOptions: [
        {
          title: "Engineering Careers",
          description: "Design, develop, and implement solutions to technical problems in various industries",
          salary: "₹4-25 lakh per annum depending on specialization and experience",
          growth: "Strong with ongoing infrastructure and technology advancement",
          environment: "Mix of office, laboratory, and field work depending on specialization"
        },
        {
          title: "Software Development",
          description: "Design, build, and maintain computer programs and applications",
          salary: "₹5-30 lakh per annum depending on skills and experience",
          growth: "Excellent with the continuous digital transformation",
          environment: "Office or remote work environment with collaborative teams"
        },
        {
          title: "Research & Development",
          description: "Conduct research to create new knowledge, products, and technologies",
          salary: "₹4-20 lakh per annum depending on field and institution",
          growth: "Moderate to strong, especially in emerging technology areas",
          environment: "Laboratory, academic institutions, or corporate R&D centers"
        }
      ],
      jobProfiles: [
        {
          title: "Software Engineer",
          description: "Develop applications, systems, and software solutions using programming knowledge",
          skills: ["Programming", "Algorithms", "Data Structures", "Problem Solving"]
        },
        {
          title: "Mechanical Engineer",
          description: "Design, develop, build, and test mechanical devices and systems",
          skills: ["CAD/CAM", "Thermodynamics", "Manufacturing Processes", "Material Science"]
        },
        {
          title: "Electrical Engineer",
          description: "Design, develop, and maintain electrical systems and equipment",
          skills: ["Circuit Design", "Power Systems", "Electronics", "Control Systems"]
        },
        {
          title: "Data Scientist",
          description: "Analyze and interpret complex data to help organizations make better decisions",
          skills: ["Statistics", "Programming", "Machine Learning", "Data Visualization"]
        }
      ],
      resources: {
        books: [
          {
            title: "Concepts of Physics by H.C. Verma",
            author: "A comprehensive physics resource for 11th-12th and competitive exams"
          },
          {
            title: "Higher Engineering Mathematics by B.S. Grewal",
            author: "Standard textbook for engineering mathematics"
          },
          {
            title: "Organic Chemistry by Morrison and Boyd",
            author: "Detailed reference for organic chemistry concepts"
          }
        ],
        courses: [
          {
            title: "JEE Mathematics - Complete Course",
            platform: "Unacademy, BYJU'S, Vedantu, and other platforms"
          },
          {
            title: "Introduction to Computer Science and Programming",
            platform: "edX, Coursera, and other MOOCs"
          },
          {
            title: "Physics for Engineers and Scientists",
            platform: "MIT OpenCourseWare and similar platforms"
          }
        ],
        websites: [
          {
            name: "NPTEL (National Programme on Technology Enhanced Learning)",
            description: "Free online courses by IITs and IISc in engineering and sciences"
          },
          {
            name: "Khan Academy",
            description: "Free educational resources for math, science, and computing"
          },
          {
            name: "Engineering.com",
            description: "News, articles, and resources for engineering students and professionals"
          }
        ]
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
    },
    // Additional career paths would be defined here
  };
  
  return pathId ? paths[pathId] : null;
}

export default CareerPathDetail;
