import { Calculator, Heart, Code, BookCheck, Briefcase, BookOpen, Palette, Trophy } from "lucide-react";

export function getPathData(pathId: string | undefined) {
  const paths: Record<string, any> = {
    "commerce": {
      title: "Commerce Stream",
      description: "Explore the world of business, finance, and economics through commerce education",
      icon: Briefcase,
      timeline: "2 years (11th-12th) + 3-4 years higher education",
      jobProspects: "Excellent opportunities in banking, finance, and corporate sectors",
      entryRequirements: "Minimum 50% in 10th, basic mathematics aptitude",
      educationPath: [
        {
          title: "Higher Secondary (11th & 12th)",
          description: "Study core commerce subjects including Accountancy, Business Studies, Economics",
          keyPoints: [
            "Focus on understanding business fundamentals",
            "Learn accounting principles and practices",
            "Study micro and macroeconomics",
            "Optional subjects like Mathematics, Statistics"
          ]
        },
        {
          title: "Undergraduate Options",
          description: "Various specialized courses in commerce and business",
          keyPoints: [
            "B.Com (3 years) - Bachelor of Commerce",
            "BBA (3 years) - Bachelor of Business Administration",
            "CA Foundation - Start of Chartered Accountancy",
            "CS Foundation - Company Secretary program"
          ]
        }
      ],
      skills: {
        technical: [
          {
            name: "Accounting",
            description: "Understanding of financial statements and accounting principles"
          },
          {
            name: "Business Analytics",
            description: "Ability to analyze business data and make informed decisions"
          },
          {
            name: "Financial Planning",
            description: "Skills in budgeting and financial management"
          }
        ],
        soft: [
          {
            name: "Communication",
            description: "Strong verbal and written business communication"
          },
          {
            name: "Analytical Thinking",
            description: "Problem-solving and strategic planning abilities"
          }
        ]
      },
      careerOptions: [
        {
          title: "Chartered Accountant",
          description: "Professional accounting and auditing",
          salary: "₹7-30 lakhs per annum",
          growth: "High demand in all sectors"
        },
        {
          title: "Investment Banker",
          description: "Financial analysis and investment management",
          salary: "₹10-40 lakhs per annum",
          growth: "Growing with market expansion"
        }
      ]
    },
    "arts": {
      title: "Arts/Humanities Stream",
      description: "Explore language, literature, history, and social sciences",
      icon: BookOpen,
      timeline: "2 years (11th-12th) + 3-4 years higher education",
      jobProspects: "Diverse opportunities in education, media, civil services",
      entryRequirements: "No specific percentage requirement, strong interest in humanities",
      educationPath: [
        {
          title: "Higher Secondary (11th & 12th)",
          description: "Study various humanities subjects",
          keyPoints: [
            "Languages (English and regional)",
            "History and Political Science",
            "Geography and Economics",
            "Psychology or Sociology"
          ]
        },
        {
          title: "Undergraduate Options",
          description: "Various specialized courses in humanities",
          keyPoints: [
            "BA in various subjects",
            "Mass Communication",
            "Bachelor in Foreign Languages",
            "Bachelor in Social Work"
          ]
        }
      ],
      skills: {
        technical: [
          {
            name: "Research",
            description: "Advanced research and analysis skills"
          },
          {
            name: "Content Creation",
            description: "Writing and content development abilities"
          }
        ],
        soft: [
          {
            name: "Critical Thinking",
            description: "Analysis and interpretation of information"
          },
          {
            name: "Cultural Awareness",
            description: "Understanding of diverse perspectives"
          }
        ]
      },
      careerOptions: [
        {
          title: "Content Writer",
          description: "Creating content for various media",
          salary: "₹3-15 lakhs per annum",
          growth: "High demand in digital age"
        },
        {
          title: "Civil Services",
          description: "Government administrative services",
          salary: "₹6-15 lakhs per annum",
          growth: "Stable government positions"
        }
      ]
    },
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
      
      skills: {
        technical: [
          {
            name: "Mathematics",
            description: "Strong foundation in calculus, algebra, and statistics"
          },
          {
            name: "Physics",
            description: "Understanding of mechanics, thermodynamics, and electromagnetism"
          },
          {
            name: "Programming",
            description: "Basic coding skills in languages like C, Python, or Java"
          },
          {
            name: "Problem Solving",
            description: "Analytical approach to complex technical challenges"
          }
        ],
        soft: [
          {
            name: "Critical Thinking",
            description: "Ability to analyze situations and make informed decisions"
          },
          {
            name: "Communication",
            description: "Clearly explaining technical concepts to various audiences"
          },
          {
            name: "Teamwork",
            description: "Collaborating effectively on group projects and research"
          },
          {
            name: "Time Management",
            description: "Balancing multiple subjects, projects, and deadlines"
          }
        ]
      },
      
      skillResources: [
        {
          title: "Khan Academy",
          description: "Free online courses in mathematics, physics, and programming fundamentals",
          link: "#"
        },
        {
          title: "Coursera Engineering Courses",
          description: "University-level courses on various engineering disciplines",
          link: "#"
        },
        {
          title: "GitHub Student Developer Pack",
          description: "Free access to coding tools and platforms for students",
          link: "#"
        }
      ],
      
      careerOptions: [
        {
          title: "Software Engineer",
          description: "Develop and maintain software applications and systems",
          salary: "₹5-25 lakhs per annum",
          growth: "25% over the next 10 years",
          environment: "IT companies, tech startups, or remote work"
        },
        {
          title: "Mechanical Engineer",
          description: "Design and develop mechanical systems and products",
          salary: "₹4-20 lakhs per annum",
          growth: "15% over the next 10 years",
          environment: "Manufacturing, automotive, aerospace industries"
        },
        {
          title: "Data Scientist",
          description: "Analyze complex data to help organizations make decisions",
          salary: "₹8-30 lakhs per annum",
          growth: "30% over the next 10 years",
          environment: "Tech companies, research firms, financial institutions"
        }
      ],
      
      jobProfiles: [
        {
          title: "Software Developer",
          description: "Build and maintain applications using programming languages",
          skills: ["Java", "Python", "JavaScript", "Problem Solving"]
        },
        {
          title: "System Analyst",
          description: "Analyze an organization's systems to improve efficiency",
          skills: ["System Design", "Business Analysis", "Project Management"]
        },
        {
          title: "Product Engineer",
          description: "Design and develop new products and improve existing ones",
          skills: ["CAD", "Manufacturing Processes", "Quality Control"]
        }
      ],
      
      resources: {
        books: [
          {
            title: "Concepts of Physics",
            author: "H.C. Verma"
          },
          {
            title: "Higher Engineering Mathematics",
            author: "B.S. Grewal"
          },
          {
            title: "Introduction to Algorithms",
            author: "Cormen, Leiserson, Rivest, Stein"
          }
        ],
        courses: [
          {
            title: "Introduction to Computer Science",
            platform: "edX (CS50)"
          },
          {
            title: "Machine Learning",
            platform: "Coursera (Stanford)"
          },
          {
            title: "Engineering Mathematics",
            platform: "NPTEL"
          }
        ],
        websites: [
          {
            name: "GeeksforGeeks",
            description: "Computer science and programming resources"
          },
          {
            name: "NPTEL",
            description: "Free engineering and science courses from IITs"
          },
          {
            name: "Engineering Career Hub",
            description: "Career guidance and preparation resources"
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
    "science-pcb": {
      title: "Science Stream (PCB)",
      description: "Physics, Chemistry, and Biology - Gateway to medical, healthcare, and life sciences careers",
      icon: Heart,
      timeline: "2 years (11th-12th) + 4-7 years higher education",
      jobProspects: "Excellent with growing demand in healthcare and biotechnology sectors",
      entryRequirements: "Minimum 60% in 10th with strong aptitude in biology and science",
      skills: {
        technical: [
          {
            name: "Biology",
            description: "Strong understanding of anatomy, physiology, and cellular processes"
          },
          {
            name: "Chemistry",
            description: "Knowledge of organic, inorganic, and biochemistry"
          },
          {
            name: "Laboratory Skills",
            description: "Proficiency in lab techniques and safety protocols"
          }
        ],
        soft: [
          {
            name: "Empathy",
            description: "Understanding patients' needs and concerns"
          },
          {
            name: "Attention to Detail",
            description: "Precision in procedures and documentation"
          },
          {
            name: "Ethics",
            description: "Understanding medical ethics and patient confidentiality"
          }
        ]
      },
      skillResources: [
        {
          title: "Khan Academy",
          description: "Free online courses in biology, chemistry, and healthcare",
          link: "#"
        },
        {
          title: "Coursera Medical Courses",
          description: "University-level courses on various medical disciplines",
          link: "#"
        }
      ],
      careerOptions: [
        {
          title: "Doctor",
          description: "Diagnose and treat medical conditions",
          salary: "₹8-60 lakhs per annum",
          growth: "20% over the next 10 years",
          environment: "Hospitals, clinics, private practice"
        }
      ],
      jobProfiles: [
        {
          title: "General Physician",
          description: "Provide primary healthcare services",
          skills: ["Diagnosis", "Patient Care", "Medical Knowledge"]
        }
      ],
      resources: {
        books: [
          {
            title: "Gray's Anatomy",
            author: "Henry Gray"
          }
        ],
        courses: [
          {
            title: "Introduction to Biology",
            platform: "edX"
          }
        ],
        websites: [
          {
            name: "PubMed",
            description: "Medical research articles and resources"
          }
        ]
      },
      relatedPaths: [
        {
          title: "Science Stream (PCM)",
          description: "For those interested in engineering and technical sciences",
          icon: Calculator,
          link: "/career-paths/science-pcm"
        }
      ],
      entranceExams: [
        {
          name: "NEET",
          description: "National Eligibility cum Entrance Test for medical programs",
          level: "National",
          timing: "Once a year (May)",
          eligibility: "12th PCB with minimum 50% marks",
          freeShips: "Reserved category students get fee waivers"
        }
      ],
      courseStructure: {
        duration: "5.5 years (MBBS)",
        semesters: "9 semesters plus internship",
        mainSubjects: [
          "Anatomy",
          "Physiology",
          "Biochemistry",
          "Pathology",
          "Pharmacology",
          "Medicine"
        ]
      },
      feeStructure: {
        undergraduate: {
          government: {
            range: "₹25,000 - ₹1,00,000 per year",
            notes: "Government medical colleges have highly subsidized fees"
          },
          private: {
            range: "₹5,00,000 - ₹25,00,000 per year",
            notes: "Private medical colleges can be very expensive"
          }
        }
      },
      scholarships: [
        {
          name: "ICMR Scholarship",
          amount: "₹60,000 per annum",
          eligibility: "Merit-based for medical students",
          link: "#"
        }
      ]
    }
  };
  
  return pathId ? paths[pathId] : null;
}
