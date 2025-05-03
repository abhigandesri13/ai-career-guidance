
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { BookCheck, SendHorizonal, User, AlertCircle, Sparkles, School, BookOpen, GraduationCap, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm CareerBot, your AI career guidance assistant. I can help answer your questions about career paths after 10th grade, education options, entrance exams, and job opportunities. What would you like to know?",
    sender: "bot",
    timestamp: new Date()
  }
];

const sampleQuestions = [
  "What are the different streams available after 10th?",
  "Tell me about engineering career paths and entrance exams",
  "What are the career options in medical field?",
  "Explain commerce stream career opportunities and scope",
  "What are the best courses in arts/humanities stream?",
  "Tell me about vocational courses after 10th"
];

// New career path data organized by stages of education
const careerPathData = {
  after10th: {
    streams: [
      { name: "Intermediate", options: ["MPC", "BiPC", "CEC", "MEC", "HEC"] },
      { name: "Vocational", options: ["Air Ticketing", "Fashion Technology", "Apparel Technology", "Jewellery Technology", "Agriculture", "Interior designing", "Hotel Management"] },
      { name: "ITI", options: ["Diploma in Automobile", "Diploma in Draughtsmen", "Diploma in Electrician", "Diploma in Mechanical", "Diploma in Mechanic Diesel", "Diploma in Architect Asst."] },
      { name: "Polytechnic", options: [
        "Diploma in Automobile Engineering",
        "Diploma in Aeronautical Engg",
        "Diploma in Agricultural Engg",
        "Diploma in Apparel Engg",
        "Diploma in Designing",
        "Diploma in Bio Medical",
        "Diploma in Business Administration",
        "Diploma in Architects",
        "Diploma in Fashion Technology"
      ]},
      { name: "Para Medical", options: [
        "Diploma in Operational theatre",
        "Diploma in Medical Laboratory",
        "Diploma in Physiotherapy",
        "Diploma in Nursing asst",
        "Diploma in Electro Cardio Graphy",
        "Diploma in Radiology",
        "Diploma in Optometry",
        "Diploma in Dialysis tech"
      ]}
    ]
  },
  mpc: {
    description: "Mathematics, Physics, Chemistry stream",
    entranceExams: ["IIT-JEE", "AIEEE", "BITSAT", "EAMCET"],
    degrees: ["B.E./B.Tech", "B.Arch", "M.Arch"],
    specializations: ["CSE", "IT", "ECE", "CIVIL", "MECHANICAL", "CHEMICAL"],
    jobs: ["Civils", "Groups", "IES", "IFS", "Defence", "Railways", "Banks", "AEE", "PSUs", "IT", "Pharma Cement", "Automobile", "Real Estates", "Metals", "Power"],
    higherEducation: ["M.Tech", "MBA", "M.S", "Fashion", "Foreign Education", "Ph.D"]
  },
  bipc: {
    description: "Biology, Physics, Chemistry stream",
    courses: [
      "MBBS", "BAMS (Ayurveda)", "BHMS (Homeopathy)", "BUMS (Unani)",
      "B.Sc Chemistry", "B.Sc Botany", "B.Sc Zoology", "B.Sc Physics", "B.Sc Life Science",
      "B.Sc Microbiology", "B.Sc Biotechnology",
      "BNYS (Bachelor of Naturopathy & Yogic Science)", "BVSc", "BPT (Bachelor of Physiotherapy)",
      "Allied programmes: B.Sc Home Science", "BPharm", "BTech Biotechnology",
      "BOT (Occupational Therapy)", "BPO (Prosthetics & Orthotics)", "B.Sc Nursing",
      "BASLP (Speech Language Pathology)", "Bachelor of Medical Laboratory Technology"
    ],
    integratedPrograms: ["Integrated M.Sc Biological Sciences at IISER, CBS"]
  },
  commerce: {
    description: "Commerce stream with subjects in Accounts, Business, Economics",
    branches: [
      { name: "MEC (Maths, Economics, Commerce)", courses: ["B.Com", "B.Sc"] },
      { name: "CEC (Commerce, Economics, Civics)", courses: ["B.Com"] }
    ],
    professionalCourses: ["CA", "ICWA", "CS"],
    higherEducation: ["MBA", "MCA", "M.Com", "M.Sc", "MCA", "MBA"],
    jobs: ["Banking", "Finance", "Accounting", "Management", "Consulting", "Marketing"]
  },
  arts: {
    description: "Arts/Humanities stream",
    afterIntermediate: [
      "Bachelor of fine Arts/Applied Art",
      "Interior Design/Fashion Design/Jewellery Design",
      "Animation, Graphic Designer, Art Designers"
    ]
  },
  entranceExams: {
    engineering: [
      { name: "JEE Main", details: "National level entrance exam for admission to NITs, IIITs and CFTIs" },
      { name: "JEE Advanced", details: "For admission to IITs, conducted for top rankers of JEE Main" },
      { name: "BITSAT", details: "For admission to BITS Pilani, Goa and Hyderabad campuses" },
      { name: "State CETs", details: "State-level entrance exams like EAMCET, KCET, WBJEE, etc." }
    ],
    medical: [
      { name: "NEET", details: "Single entrance exam for all medical courses including MBBS, BDS, AYUSH courses" },
      { name: "AIIMS", details: "For AIIMS institutions across India" },
      { name: "JIPMER", details: "For admission to JIPMER Puducherry and Karaikal" }
    ],
    commerce: [
      { name: "CUET", details: "Common University Entrance Test for central universities" },
      { name: "IPU CET", details: "For Delhi-based IP University admissions" },
      { name: "DU JAT", details: "For Delhi University's BBA, BMS programs" }
    ],
    arts: [
      { name: "CUET", details: "For central universities" },
      { name: "Entrance tests", details: "Various college-specific entrance tests" }
    ]
  }
};

// Enhanced response system using the detailed data
const getBotResponse = (input: string): string => {
  const normalizedInput = input.toLowerCase();
  
  // Streams after 10th
  if (normalizedInput.includes("different streams") || normalizedInput.includes("streams available") || normalizedInput.includes("after 10th") || normalizedInput.includes("options after 10th")) {
    return `After 10th standard, you have these main paths:\n\n1. Intermediate/11th-12th:\n   • MPC (Mathematics, Physics, Chemistry)\n   • BiPC (Biology, Physics, Chemistry)\n   • CEC (Commerce, Economics, Civics)\n   • MEC (Mathematics, Economics, Commerce)\n   • HEC (Home Science, Economics, Commerce)\n\n2. Vocational Courses:\n   • Air Ticketing\n   • Fashion Technology\n   • Apparel Technology\n   • Jewellery Technology\n   • Agriculture\n   • Interior designing\n   • Hotel Management\n\n3. ITI Programs:\n   • Diploma in Automobile\n   • Diploma in Draughtsmen\n   • Diploma in Electrician\n   • Diploma in Mechanical\n   • And more specialized technical courses\n\n4. Polytechnic:\n   • Various engineering diploma programs\n   • 3-year duration\n   • Pathway to direct 2nd year engineering admission\n\n5. Paramedical Courses:\n   • Various medical-assistant diplomas\n   • 1-3 year programs\n   • Direct entry to healthcare jobs\n\nWhich path interests you most?`;
  }

  // MPC/Engineering related queries
  if (normalizedInput.includes("engineering") || normalizedInput.includes("mpc") || normalizedInput.includes("b.tech") || normalizedInput.includes("b.e")) {
    if (normalizedInput.includes("entrance") || normalizedInput.includes("exam")) {
      return `Key Engineering Entrance Exams:\n\n1. JEE Main:\n   • National level exam for NITs, IIITs\n   • Conducted twice a year\n   • Tests Physics, Chemistry, Mathematics\n\n2. JEE Advanced:\n   • For IITs admission\n   • Only for JEE Main qualifiers\n   • More challenging than JEE Main\n\n3. BITSAT:\n   • For BITS Pilani campuses\n   • Computer-based online test\n   • Includes English & Logical Reasoning\n\n4. State CETs (EAMCET):\n   • For state engineering colleges\n   • Usually easier than national exams\n   • State-specific syllabus variations\n\nAll require strong foundations in PCM subjects. When preparing, focus on NCERT textbooks first, then move to advanced reference books.`;
    }
    
    if (normalizedInput.includes("job") || normalizedInput.includes("career") || normalizedInput.includes("opportunities")) {
      return `Engineering Career Opportunities after B.E./B.Tech:\n\n1. Core Technical Fields:\n   • IT/Software: ₹3.5-40 LPA\n   • Electronics: ₹3.5-35 LPA\n   • Mechanical: ₹3-30 LPA\n   • Civil: ₹3-25 LPA\n   • Chemical: ₹4-30 LPA\n\n2. Government Jobs:\n   • Civil Services (IES, IFS)\n   • PSUs (ONGC, BHEL, NTPC)\n   • Defence Services (Technical)\n   • Railways (Technical cadre)\n   • State Engineering Services\n\n3. Specialized Industries:\n   • Automobile sector\n   • Power generation\n   • Pharmaceuticals\n   • Real Estate development\n   • Metals and manufacturing\n\n4. Higher Education Paths:\n   • M.Tech in specialized fields\n   • MBA for management roles\n   • MS abroad for global exposure\n   • Ph.D for research/academia\n\nMost in-demand specializations currently: Computer Science, AI/ML, Data Science, and Renewable Energy Engineering.`;
    }
    
    return `Engineering Path (MPC):\n\n1. Preparation Route:\n   • Take MPC in 11th-12th\n   • Focus on strong fundamentals in Physics, Chemistry & Mathematics\n   • Prepare for entrance exams like IIT-JEE, AIEEE, BITSAT, EAMCET\n\n2. B.E./B.Tech Options:\n   • Computer Science & Engineering\n   • Information Technology\n   • Electronics & Communication\n   • Civil Engineering\n   • Mechanical Engineering\n   • Chemical Engineering\n   • Many more specialized branches\n\n3. Job Prospects:\n   • IT/Software companies\n   • Civil services & Government jobs\n   • PSUs and core engineering companies\n   • Defence services\n   • Railways & Banking sector\n\n4. Higher Education:\n   • M.Tech specializations\n   • MBA for management roles\n   • Foreign education (MS)\n   • Ph.D programs\n\nDuration: 4 years for B.E./B.Tech\nAverage starting salary: ₹3-8 LPA depending on specialization and institution`;
  }

  // Medical/BiPC related queries
  if (normalizedInput.includes("medical") || normalizedInput.includes("doctor") || normalizedInput.includes("mbbs") || normalizedInput.includes("bipc")) {
    if (normalizedInput.includes("entrance") || normalizedInput.includes("exam") || normalizedInput.includes("neet")) {
      return `Medical Entrance Exams:\n\n1. NEET-UG (National Eligibility cum Entrance Test):\n   • Mandatory single entrance exam for all medical courses\n   • Tests Physics, Chemistry, Biology\n   • Extremely competitive (10+ lakh candidates)\n   • Conducted once a year (May)\n   • Required for MBBS, BDS, AYUSH courses\n\n2. AIIMS & JIPMER:\n   • Now merged with NEET\n   • Previously separate entrance exams\n\n3. For AYUSH courses:\n   • NEET score used for admission to BAMS, BHMS, BUMS courses\n\n4. Key Preparation Tips:\n   • Focus on NCERT books thoroughly\n   • Practice previous year questions\n   • Take regular mock tests\n   • Biology weightage is highest (50%)\n\nEligibility: 10+2 with PCB and minimum 50% marks (40% for SC/ST)`;
    }
    
    if (normalizedInput.includes("courses") || normalizedInput.includes("options")) {
      return `Medical Field Courses after BiPC:\n\n1. MBBS (Bachelor of Medicine & Surgery):\n   • Duration: 5.5 years (including internship)\n   • Career: General Physician, Specialist after PG\n   • Admission: Through NEET\n\n2. BDS (Bachelor of Dental Surgery):\n   • Duration: 5 years\n   • Career: Dentist, Dental Specialist\n\n3. AYUSH Courses:\n   • BAMS (Ayurveda): 5.5 years\n   • BHMS (Homeopathy): 5.5 years\n   • BUMS (Unani): 5.5 years\n\n4. Allied Health Sciences:\n   • B.Sc Nursing: 4 years\n   • BPT (Physiotherapy): 4.5 years\n   • B.Sc MLT (Medical Lab Technology): 3-4 years\n   • BOT (Occupational Therapy): 4.5 years\n   • BPO (Prosthetics & Orthotics): 4.5 years\n   • BASLP (Speech & Language): 4 years\n\n5. Other Science Programs:\n   • B.Sc in Life Sciences/Biotechnology/Microbiology\n   • B.Pharm (Pharmacy): 4 years\n   • BNYS (Naturopathy & Yogic Science): 5.5 years\n\nMost programs require NEET qualification except some B.Sc courses.`;
    }
    
    return `Medical Path (BiPC):\n\n1. Main Path:\n   • Take BiPC in 11th-12th\n   • Prepare for NEET entrance exam\n   • MBBS: 5.5 years duration\n   • Specialization through NEET-PG\n\n2. Alternative Medical Options:\n   • BDS (Dentistry): 5 years\n   • BAMS (Ayurveda): 5.5 years\n   • BHMS (Homeopathy): 5.5 years\n   • BUMS (Unani): 5.5 years\n\n3. Other BiPC Career Options:\n   • B.Sc programs in Biological Sciences\n   • B.Pharm (Pharmacy): 4 years\n   • Nursing: 4 years B.Sc program\n   • Allied health sciences (Physiotherapy, Lab Tech)\n   • Biotechnology programs\n\n4. Higher Education:\n   • MD/MS after MBBS\n   • Research opportunities\n   • Integrated MSc programs at premier institutes\n\nMedical profession offers stable career growth with high social respect, though requires long education path.`;
  }

  // Commerce related queries
  if (normalizedInput.includes("commerce") || normalizedInput.includes("business") || normalizedInput.includes("accounting") || normalizedInput.includes("ca")) {
    if (normalizedInput.includes("course") || normalizedInput.includes("program")) {
      return `Commerce Stream Courses:\n\n1. Undergraduate Degrees:\n   • B.Com (Bachelor of Commerce): 3 years\n   • BBA (Business Administration): 3 years\n   • B.Com (Hons): 3 years specialized program\n   • BMS (Management Studies): 3 years\n\n2. Professional Courses:\n   • CA (Chartered Accountancy):\n     - Foundation, Intermediate, Final levels\n     - Total 4-5 years with articleship\n   • CS (Company Secretary):\n     - 3 levels, approximately 3-4 years\n   • CMA (Cost Management Accountancy):\n     - 3 levels, approximately 3-4 years\n\n3. Specialized Programs:\n   • B.Com + LLB (Integrated): 5 years\n   • BBA + MBA (Integrated): 5 years\n   • Various diplomas in Banking, Insurance\n\nMost popular and lucrative is the CA program, though it has low pass percentages and requires high dedication.`;
    }
    
    if (normalizedInput.includes("job") || normalizedInput.includes("career") || normalizedInput.includes("opportunities") || normalizedInput.includes("scope")) {
      return `Commerce Career Opportunities:\n\n1. After Professional Courses:\n   • Chartered Accountant: ₹7-20 LPA\n     - Audit, Taxation, Financial Advisory\n     - Own practice or employment in firms\n   • Company Secretary: ₹6-15 LPA\n     - Corporate legal compliance\n     - Secretarial practice\n   • Cost Accountant: ₹6-15 LPA\n     - Cost optimization\n     - Management accounting\n\n2. After B.Com/BBA:\n   • Banking Sector: ₹3-10 LPA\n     - Probationary Officers, Specialists\n   • Financial Services: ₹4-12 LPA\n     - Investment Banking, Financial Analysis\n   • Corporate Finance: ₹4-15 LPA\n     - Accounting, Treasury, Financial Planning\n   • Marketing: ₹3-12 LPA\n     - Sales, Brand Management\n\n3. Government Opportunities:\n   • Civil Services\n   • PSU Banking\n   • Revenue Services\n   • Staff Selection Commission\n\n4. Entrepreneurship:\n   • Start-ups in financial services\n   • Business consulting\n\nCommerce offers stable career paths with good work-life balance compared to other streams.`;
    }
    
    return `Commerce Stream Path:\n\n1. Intermediate Options:\n   • CEC (Commerce, Economics, Civics)\n   • MEC (Maths, Economics, Commerce)\n\n2. Undergraduate Options:\n   • B.Com: Foundation commerce degree\n   • BBA: Focus on business management\n\n3. Professional Courses:\n   • CA: Prestigious accounting qualification\n   • CS: Corporate governance specialist\n   • CMA: Cost accounting expert\n\n4. Career Paths & Salaries:\n   • Investment Banking: ₹10-25 LPA\n   • Chartered Accountant: ₹8-15 LPA\n   • Financial Analyst: ₹6-12 LPA\n   • Business Consultant: ₹7-15 LPA\n   • Banking Professional: ₹4-12 LPA\n\n5. Higher Education:\n   • MBA - various specializations\n   • M.Com - academic advancement\n   • Professional certifications\n\nCommerce offers excellent opportunities for those interested in business, finance, and economics with multiple entry points to the job market.`;
  }

  // Arts/Humanities related queries
  if (normalizedInput.includes("arts") || normalizedInput.includes("humanities")) {
    return `Arts/Humanities Path:\n\n1. Popular Courses:\n   • BA in Psychology\n   • BA in English Literature\n   • BA in Economics\n   • BA in Political Science\n   • BA in Sociology\n   • Bachelor of Fine Arts\n   • Mass Communication\n   • Design programs (Fashion, Interior, etc.)\n   • Law (integrated programs)\n\n2. Career Opportunities:\n   • Content Creation: ₹3-12 LPA\n   • Teaching: ₹3-10 LPA\n   • Psychology/Counseling: ₹4-15 LPA\n   • Media & Journalism: ₹3-15 LPA\n   • Civil Services: ₹6-15 LPA\n   • Law: ₹5-30 LPA\n   • Design fields: ₹4-20 LPA\n\n3. Higher Education:\n   • MA in specialized fields\n   • Professional courses like B.Ed\n   • Research programs\n\n4. Emerging Fields:\n   • Digital content creation\n   • Social media management\n   • UX writing and design\n   • Cultural resource management\n\nArts/Humanities offers flexible career paths with opportunities to explore creativity and critical thinking. Particularly good for those with strong communication skills and interest in human behavior.`;
  }

  // Vocational courses
  if (normalizedInput.includes("vocational") || normalizedInput.includes("skill") || normalizedInput.includes("diploma") || normalizedInput.includes("polytechnic") || normalizedInput.includes("iti")) {
    return `Vocational Education Options After 10th:\n\n1. ITI Courses (1-2 years):\n   • Electrician\n   • Mechanic\n   • Plumber\n   • Welder\n   • Draughtsman\n   • Diesel Mechanic\n   • Carpenter\n   Starting salary: ₹15,000-25,000 per month\n\n2. Polytechnic Diploma Programs (3 years):\n   • Diploma in Mechanical Engineering\n   • Diploma in Civil Engineering\n   • Diploma in Electrical Engineering\n   • Diploma in Automobile Engineering\n   • Diploma in Agricultural Engineering\n   • Diploma in Apparel Engineering\n   • Diploma in Business Administration\n   Starting salary: ₹18,000-35,000 per month\n\n3. Other Vocational Courses:\n   • Fashion Technology\n   • Air Ticketing\n   • Jewellery Technology\n   • Interior Designing\n   • Hotel Management\n\n4. Paramedical Courses:\n   • Diploma in Medical Laboratory\n   • Diploma in Physiotherapy\n   • Diploma in Nursing Assistant\n   • Diploma in Radiology\n   • Diploma in Optometry\n\nBenefits of vocational education:\n• Shorter duration than degree programs\n• Focused practical skills\n• Early entry to workforce\n• Option to continue higher education later\n• Growing demand for skilled technicians`;
  }

  // Fallback response for questions not covered above
  return "I'm here to help guide you through various career paths after 10th grade. You can ask me about:\n\n- Different streams (Science, Commerce, Arts)\n- Specific career fields like Engineering, Medical, Commerce, etc.\n- Entrance exams for various courses\n- Job opportunities and salary prospects\n- Higher education options\n- Vocational training and diplomas\n\nPlease ask a specific question about any of these areas, and I'll provide detailed information!";
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Simulate AI response with a slight delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    handleSendMessage();
  };

  return (
    <div className="container max-w-4xl py-8">
      <div className="text-center mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Ask CareerBot
        </h1>
        <p className="mt-2 text-white/90">
          Get detailed answers about career paths, courses, entrance exams, and job prospects
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-[600px] flex flex-col bg-gradient-to-b from-purple-50 to-white">
            <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 py-4">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={cn(
                      "flex",
                      message.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div 
                      className={cn(
                        "max-w-[85%] rounded-lg px-4 py-3 shadow-sm",
                        message.sender === "user" 
                          ? "bg-brand-blue-500 text-white rounded-tr-none"
                          : "bg-muted rounded-tl-none"
                      )}
                    >
                      <div className="flex items-start gap-2 mb-1">
                        <div 
                          className={cn(
                            "rounded-full p-1 flex-shrink-0",
                            message.sender === "user" 
                              ? "bg-brand-blue-400" 
                              : "bg-brand-orange-100"
                          )}
                        >
                          {message.sender === "user" ? (
                            <User className="h-3 w-3 text-white" />
                          ) : (
                            <BookCheck className="h-3 w-3 text-brand-orange-500" />
                          )}
                        </div>
                        <div className="text-xs opacity-80">
                          {message.sender === "user" ? "You" : "CareerBot"}
                        </div>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg px-4 py-3 shadow-sm rounded-tl-none max-w-[85%]">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-brand-orange-100 p-1">
                          <BookCheck className="h-3 w-3 text-brand-orange-500" />
                        </div>
                        <div className="text-xs text-muted-foreground">CareerBot is typing</div>
                      </div>
                      <div className="flex gap-1 mt-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                <Input
                  type="text"
                  placeholder="Type your question here..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  className="bg-brand-blue-500 hover:bg-brand-blue-600 px-4"
                  disabled={!inputValue.trim() || isTyping}
                >
                  <SendHorizonal className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-purple-500" />
                <h3 className="font-medium text-purple-700">Popular Questions</h3>
              </div>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left h-auto py-2 font-normal text-purple-600 hover:text-purple-800 hover:bg-purple-50 border-purple-100"
                  onClick={() => handleQuickQuestion("What streams can I choose after 10th standard?")}
                >
                  <School className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>What streams can I choose after 10th standard?</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left h-auto py-2 font-normal text-purple-600 hover:text-purple-800 hover:bg-purple-50 border-purple-100"
                  onClick={() => handleQuickQuestion("Tell me about engineering entrance exams")}
                >
                  <BookOpen className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>Tell me about engineering entrance exams</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left h-auto py-2 font-normal text-purple-600 hover:text-purple-800 hover:bg-purple-50 border-purple-100"
                  onClick={() => handleQuickQuestion("What medical courses are available after BiPC?")}
                >
                  <GraduationCap className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>What medical courses are available after BiPC?</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left h-auto py-2 font-normal text-purple-600 hover:text-purple-800 hover:bg-purple-50 border-purple-100"
                  onClick={() => handleQuickQuestion("What jobs can I get after commerce?")}
                >
                  <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>What jobs can I get after commerce?</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-brand-orange-400" />
                <h3 className="font-medium">Career Path Navigator</h3>
              </div>
              <p className="text-sm mb-4 text-muted-foreground">
                Use CareerBot to explore detailed information about:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-brand-blue-100 text-brand-blue-500 p-1 mt-0.5 flex-shrink-0">
                    <Sparkles className="h-3 w-3" />
                  </div>
                  <span>Entrance exams with syllabus and patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-brand-blue-100 text-brand-blue-500 p-1 mt-0.5 flex-shrink-0">
                    <Sparkles className="h-3 w-3" />
                  </div>
                  <span>Course structures and fee details</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-brand-blue-100 text-brand-blue-500 p-1 mt-0.5 flex-shrink-0">
                    <Sparkles className="h-3 w-3" />
                  </div>
                  <span>Job opportunities and salary prospects</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-brand-blue-100 text-brand-blue-500 p-1 mt-0.5 flex-shrink-0">
                    <Sparkles className="h-3 w-3" />
                  </div>
                  <span>Specific career progression paths</span>
                </li>
              </ul>
              <Button
                variant="outline"
                className="w-full mt-4 text-brand-blue-600 border-brand-blue-200 hover:bg-brand-blue-50"
                onClick={() => toast.success("Tip: Ask specific questions about streams, exams or careers for the most detailed responses.")}
              >
                View Career Flow Charts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
