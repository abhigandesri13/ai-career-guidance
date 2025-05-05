
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
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
    return `After 10th standard, you have these main educational paths:\n\n1. Intermediate/11th-12th:\n   • MPC (Mathematics, Physics, Chemistry)\n     - Focus: Engineering & technical fields\n     - Duration: 2 years\n     - Exams: JEE Main/Advanced, BITSAT, State CETs\n     - Leads to: B.Tech/B.E programs\n   • BiPC (Biology, Physics, Chemistry)\n     - Focus: Medical & life sciences\n     - Duration: 2 years\n     - Exams: NEET, State medical CETs\n     - Leads to: MBBS, BDS, BAMS, B.Sc programs\n   • CEC (Commerce, Economics, Civics)\n     - Focus: Business, finance, economics\n     - Duration: 2 years\n     - Leads to: B.Com, BBA, CA, CS programs\n   • MEC (Mathematics, Economics, Commerce)\n     - Focus: Business analytics, economics\n     - Duration: 2 years\n     - Leads to: B.Com, BBA, actuarial sciences\n   • HEC (Home Science, Economics, Commerce)\n     - Focus: Nutrition, family studies, business\n     - Duration: 2 years\n     - Leads to: Home science, nutrition degrees\n\n2. Vocational Courses:\n   • Air Ticketing - 6-12 months\n   • Fashion Technology - 1-3 years\n   • Apparel Technology - 1-2 years\n   • Jewellery Technology - 6 months - 1 year\n   • Agriculture - 1-2 years\n   • Interior designing - 1-3 years\n   • Hotel Management - 6 months - 3 years\n\n3. ITI Programs (Industrial Training Institutes):\n   • Diploma in Automobile - 1-2 years\n   • Diploma in Draughtsmen - 1-2 years\n   • Diploma in Electrician - 1-2 years\n   • Diploma in Mechanical - 1-2 years\n   • Diploma in Mechanic Diesel - 1-2 years\n   • Diploma in Architect Asst. - 1-2 years\n   • Average fees: ₹5,000-30,000 per year\n   • Job prospects: Technical jobs, self-employment\n\n4. Polytechnic (3-year diploma programs):\n   • Automobile Engineering\n   • Aeronautical Engineering\n   • Agricultural Engineering\n   • Apparel Engineering & many more\n   • Average fees: ₹10,000-60,000 per year\n   • Advantage: Direct entry to 2nd year engineering\n\n5. Paramedical Courses:\n   • Various medical support diplomas (1-3 years)\n   • Healthcare jobs immediately after completion\n   • Average fees: ₹20,000-1,00,000 per year\n   • Growing demand in healthcare sector\n\nWhich path interests you most? I can provide more specific details about any of these options.`;
  }

  // MPC/Engineering related queries
  if (normalizedInput.includes("engineering") || normalizedInput.includes("mpc") || normalizedInput.includes("b.tech") || normalizedInput.includes("b.e")) {
    if (normalizedInput.includes("entrance") || normalizedInput.includes("exam")) {
      return `Engineering Entrance Exams - Comprehensive Guide:\n\n1. JEE Main:\n   • Eligibility: 10+2 with PCM (75% for general, 65% for reserved)\n   • Exam Pattern: 90 questions (30 each from Physics, Chemistry, Math)\n   • Total marks: 300 (4 marks per correct, -1 for incorrect)\n   • Duration: 3 hours\n   • Frequency: Twice yearly (January & April sessions)\n   • Registration: Usually October-November and February-March\n   • Fees: ₹650-1,400 depending on category & gender\n   • Percentile cutoffs:\n     - General: 85-95+ percentile for NITs\n     - SC/ST/OBC: 50-75 percentile\n   • Online computer-based test\n\n2. JEE Advanced:\n   • Only for top 2,50,000 JEE Main qualifiers\n   • Exam Pattern: 2 papers, 3 hours each\n   • Complex question patterns with numerical value answers\n   • Registration: After JEE Main results\n   • Fees: ₹2,800 (Gen/OBC), ₹1,400 (SC/ST/PwD)\n   • Only 2 attempts allowed in consecutive years\n\n3. BITSAT:\n   • For BITS Pilani, Goa, Hyderabad\n   • Exam Pattern: 150 questions, 3 hours\n   • Includes English & Logical Reasoning sections\n   • Computer-based online test with immediate score\n   • Session usually in May-June\n   • Registration: February-March\n   • Fees: ₹3,400 approximately\n\n4. State Engineering CETs:\n   • State-specific exams like EAMCET (AP/Telangana)\n   • MHT-CET (Maharashtra), KCET (Karnataka), etc.\n   • Typically easier than national exams\n   • Local language options available\n   • Usually conducted in May-June\n   • Registration: February-March\n   • Fees vary by state: ₹600-1,500\n\nPreparation Strategy:\n• Start preparation in 11th standard\n• First master NCERT textbooks completely\n• Solve previous years' questions (minimum 10 years)\n• Take regular mock tests (at least 30 full tests)\n• Focus areas by subject:\n  - Physics: Mechanics, Electromagnetism\n  - Chemistry: Physical chemistry, Organic reactions\n  - Math: Calculus, Coordinate Geometry\n\nTop coaching options:\n• Classroom: FIITJEE, Allen, Resonance (₹1-2.5 lakh/year)\n• Online: Unacademy, Vedantu, Physics Wallah (₹15k-80k/year)\n• Self-study: Recommended books & resources available\n\nWhat specific aspect of entrance exams would you like me to elaborate on?`;
    }
    
    if (normalizedInput.includes("job") || normalizedInput.includes("career") || normalizedInput.includes("opportunities")) {
      return `Comprehensive Engineering Career Opportunities Guide:\n\n1. Software & IT Sector (Highest Demand):\n   • Software Developer/Engineer: ₹3.5-15 LPA entry level\n   • Data Scientist/AI Engineer: ₹6-20 LPA entry level\n   • DevOps Engineer: ₹5-18 LPA entry level\n   • Cloud Solutions Architect: ₹12-40+ LPA (3-5 yrs exp)\n   • Top recruiters: FAANG, TCS, Infosys, Wipro, HCL, startups\n   • Growth potential: 25-35% annual with right skills\n   • In-demand skills: Cloud (AWS/Azure), AI/ML, Full Stack\n   • Work-life balance: Moderate to good (company dependent)\n\n2. Core Engineering Fields:\n   • Electronics/VLSI Design: ₹4-12 LPA entry level\n   • Mechanical Design Engineer: ₹3.5-8 LPA entry level\n   • Automobile Engineer: ₹3.5-10 LPA entry level\n   • Civil/Structural Engineer: ₹3-7 LPA entry level\n   • Top recruiters: L&T, Tata Motors, BHEL, Maruti Suzuki\n   • Growth potential: 15-20% annual with specialization\n   • Work hours: Typically 45-50 hours/week\n   • Job stability: High in established companies\n\n3. Public Sector & Government Jobs:\n   • IES (Indian Engineering Services): ₹50k-1.5L/month\n   • PSUs (ONGC, NTPC, BHEL): ₹50k-1.2L/month entry level\n   • Railways (Technical cadre): ₹35k-90k/month entry level\n   • Defence Services (Technical): ₹50k-1.5L/month + perks\n   • Selection: Through UPSC, GATE, PSU-specific exams\n   • Benefits: Job security, pensions, housing allowance\n   • Work-life balance: Excellent in most positions\n   • Career progression: Time-bound promotions + merit\n\n4. Specialized Industry Opportunities:\n   • Renewable Energy: ₹4-15 LPA (rapidly growing sector)\n   • Semiconductor Design: ₹6-20 LPA (high specialization)\n   • Robotics & Automation: ₹5-18 LPA (cutting edge tech)\n   • Biomedical Engineering: ₹4-15 LPA (healthcare tech)\n   • Space/Aerospace: ₹6-20 LPA (with ISRO/private firms)\n\n5. Higher Education & Research Paths:\n   • M.Tech in specialized fields (₹25k-50k stipend in IITs)\n   • MS abroad ($20-30k scholarships available)\n   • PhD (fully funded at top universities)\n   • Academia: Assistant Professor ₹60k-1.5L/month\n   • Research Scientists: ₹60k-2L/month in labs/industry\n\n6. Entrepreneurship Trends:\n   • Tech startups (SaaS, AI, Fintech) - funding available\n   • Engineering services/consultancy - low investment start\n   • Hardware/IoT product ventures - moderate investment\n   • Green tech/sustainability - growing investment sector\n\nWhich specific career path would you like more details about?`;
    }
    
    return `Engineering (MPC Stream) Complete Path:\n\n1. Preparation Timeline:\n   • 11th-12th: MPC subjects focus (PCM + English + optional)\n   • Class 11: Focus on fundamentals and building concepts\n   • Class 12: Application and entrance exam preparation\n   • Self-study hours: Recommended 4-6 hours daily beyond school\n   • Coaching: Consider from Class 11 for competitive exams\n\n2. Key Entrance Exams & Their Importance:\n   • JEE Main: Gateway to NITs, IIITs and GFTIs\n   • JEE Advanced: For IITs only (top 2.5 lakh JEE Main qualifiers)\n   • BITSAT: For BITS Pilani, Goa and Hyderabad\n   • State CETs: For state engineering colleges (easier than national)\n   • Special exams: Design (UCEED/CEED), Architecture (NATA/JEE-B.Arch)\n\n3. Engineering Branches & Their Prospects:\n   • Computer Science & Engineering\n     - Highest placement rates and packages\n     - Industry demand growing at 30% annually\n     - Skills focus: Programming, data structures, AI/ML\n   • Electronics & Communication\n     - Strong in semiconductor, telecom sectors\n     - Growing IoT and embedded systems opportunities\n     - Skills focus: Circuit design, signal processing\n   • Mechanical Engineering\n     - Core sector with stable demand\n     - Automobile, aerospace, manufacturing industries\n     - Skills focus: CAD/CAM, thermodynamics, materials\n   • Civil Engineering\n     - Infrastructure development sector\n     - Government projects, real estate, structural design\n     - Skills focus: Structural analysis, construction mgmt\n\n4. College Selection Factors:\n   • Tier-1: IITs, NITs, BITS, IIITs (highest ROI)\n   • Tier-2: Good state universities, deemed universities\n   • Tier-3: Private engineering colleges\n   • Factors to consider:\n     - NIRF ranking and accreditation (NAAC, NBA)\n     - Placement statistics and average packages\n     - Industry connections and internship opportunities\n     - Faculty qualification and research output\n     - Infrastructure and lab facilities\n     - Alumni network strength\n\n5. Engineering Education Timeline:\n   • B.Tech/B.E Duration: 4 years (8 semesters)\n   • Year 1-2: Common engineering subjects\n   • Year 3-4: Specialization courses\n   • Final year: Major project + placements\n   • Average fees: ₹50k-₹3L per year (varies by institute)\n   • Scholarships available: Merit-based, need-based, government\n\n6. Career Growth Trajectory:\n   • Entry level (0-2 yrs): Junior Engineer/Trainee\n   • Mid level (3-5 yrs): Senior Engineer/Team Lead\n   • Senior level (6-10 yrs): Manager/Technical Specialist\n   • Leadership (10+ yrs): Director/VP Engineering\n   • Average salary growth: 12-18% annually with upskilling\n\n7. Higher Education Options:\n   • M.Tech: 2-year specialized master's (India)\n   • MS: 1.5-2 year research-focused degree (Abroad)\n   • MBA: Career shift to management (after work exp)\n   • PhD: Research and academia focus (3-5 years)\n\nWould you like me to elaborate on any specific aspect of engineering education or career?`;
  }

  // Medical/BiPC related queries
  if (normalizedInput.includes("medical") || normalizedInput.includes("doctor") || normalizedInput.includes("mbbs") || normalizedInput.includes("bipc")) {
    if (normalizedInput.includes("entrance") || normalizedInput.includes("exam") || normalizedInput.includes("neet")) {
      return `Complete NEET & Medical Entrance Exam Guide:\n\n1. NEET-UG (National Eligibility cum Entrance Test):\n   • Eligibility: 10+2 with PCB, minimum 50% (40% for SC/ST/OBC)\n   • Exam Pattern:\n     - 200 MCQs (Physics: 50, Chemistry: 50, Biology: 100)\n     - Total marks: 720 (4 marks per correct, -1 for incorrect)\n     - Duration: 3 hours 20 minutes\n     - Offline pen-and-paper exam (OMR sheet)\n   • Syllabus: Complete 11th & 12th NCERT (PCB)\n   • Annual exam: Usually held in May\n   • Registration: Usually December-January\n   • Application fees: ₹1,500 (Gen), ₹1,400 (OBC), ₹800 (SC/ST)\n   • Competition level: Extremely high (10-18 lakh candidates)\n   • Qualifying cutoffs 2023:\n     - General: 720-137 marks (50th percentile)\n     - OBC/SC/ST: 136-121 marks (40th percentile)\n     - For top colleges: 650+ marks typically needed\n\n2. Key Preparation Strategy:\n   • Study Material:\n     - NCERT textbooks (absolutely mandatory, 80% questions from here)\n     - Reference books: Trueman's Biology, HC Verma Physics, NCERT Fingertips\n   • Chapter-wise importance:\n     - Biology: Human Physiology, Genetics, Cell Biology (highest weightage)\n     - Physics: Mechanics, Thermodynamics, Optics\n     - Chemistry: Organic reactions, Chemical Bonding, Coordination Compounds\n   • Study timeline:\n     - Class 11: Build strong basics in all subjects\n     - Class 12: Focus on application and practice\n     - Last 3 months: Full-length mock tests (minimum 30)\n   • Coaching options:\n     - Classroom: Allen, Aakash, NEET Academy (₹80k-1.8L/year)\n     - Online: Unacademy, Vedantu (₹25k-80k/year)\n     - Self-study: With proper resources and discipline\n\n3. After NEET - Admission Process:\n   • All India Quota (15% seats in all colleges except state exceptions)\n   • State Quota (85% seats based on state domicile)\n   • Deemed/Central Universities (100% seats through NEET)\n   • Document verification and multiple counseling rounds\n   • Choice filling based on rank and seat availability\n   • Categories of colleges:\n     - Government medical colleges (lowest fees: ₹20k-1L/year)\n     - Private medical colleges (high fees: ₹5L-25L/year)\n     - Deemed universities (higher fees: ₹8L-30L/year)\n\n4. Preparation Time Management:\n   • Daily schedule: 8-10 hours dedicated study\n   • Weekly tests on completed portions\n   • Monthly revision of all covered topics\n   • Last 6 months: Full syllabus revision and mock tests\n\nIs there any specific aspect of NEET or medical entrance exams you'd like me to explain in more detail?`;
    }
    
    if (normalizedInput.includes("courses") || normalizedInput.includes("options")) {
      return `Comprehensive Medical & BiPC Course Options Guide:\n\n1. MBBS (Bachelor of Medicine & Surgery):\n   • Duration: 5.5 years (4.5 years + 1 year internship)\n   • Eligibility: 10+2 with PCB, NEET qualification\n   • Fees: ₹20K-1L/year (Govt), ₹5L-25L/year (Private)\n   • Career paths:\n     - General Physician: ₹6-15L/year after MBBS\n     - Specialist (after MD/MS): ₹15-80L/year\n     - Super-specialist (after DM/MCh): ₹25L-1.5Cr/year\n   • Work settings: Hospitals, private practice, medical research\n   • PG options: MD (Medicine), MS (Surgery), DNB programs\n\n2. BDS (Bachelor of Dental Surgery):\n   • Duration: 5 years (4 years + 1 year internship)\n   • Eligibility: 10+2 with PCB, NEET qualification\n   • Fees: ₹50K-1.5L/year (Govt), ₹3L-15L/year (Private)\n   • Career paths:\n     - General Dentist: ₹5-12L/year\n     - Specialist (MDS): ₹12-50L/year\n   • Specializations: Orthodontics, Prosthodontics, Oral Surgery\n   • Work settings: Dental clinics, hospitals, research\n\n3. AYUSH Courses:\n   • BAMS (Ayurveda): 5.5 years, ₹25K-4L/year\n     - Career: Ayurvedic Physician, ₹4-15L/year\n   • BHMS (Homeopathy): 5.5 years, ₹20K-3L/year\n     - Career: Homeopathic Physician, ₹4-12L/year\n   • BUMS (Unani): 5.5 years, ₹20K-2L/year\n     - Career: Unani Practitioner, ₹4-10L/year\n   • BNYS (Naturopathy & Yoga): 5.5 years, ₹50K-4L/year\n     - Career: Wellness consultant, ₹4-15L/year\n   • All require NEET qualification\n\n4. Allied Health Sciences (High Demand):\n   • B.Sc Nursing: 4 years, ₹50K-3L/year\n     - Career: Staff Nurse to Nursing Superintendent, ₹3-15L/year\n     - International opportunities (UK, USA, Canada, Australia)\n   • BPT (Physiotherapy): 4.5 years, ₹50K-3L/year\n     - Career: Physiotherapist, Rehabilitation specialist, ₹3-12L/year\n   • B.Sc MLT (Medical Lab Technology): 3-4 years, ₹30K-2L/year\n     - Career: Lab Technologist, Pathology assistant, ₹2.5-8L/year\n   • BOT (Occupational Therapy): 4.5 years, ₹50K-2.5L/year\n     - Career: Occupational therapist, ₹3-10L/year\n   • BPO (Prosthetics & Orthotics): 4.5 years, ₹40K-2L/year\n     - Career: Prosthetic designer, ₹3-9L/year\n   • BASLP (Speech & Language): 4 years, ₹40K-2.5L/year\n     - Career: Speech therapist, audiologist, ₹3-10L/year\n\n5. Pharmacy & Biotechnology:\n   • B.Pharm: 4 years, ₹50K-3L/year\n     - Career: Pharmacist, Drug development, ₹3-12L/year\n   • B.Tech Biotechnology: 4 years, ₹1-4L/year\n     - Career: Biotech researcher, Product development, ₹4-15L/year\n\n6. Life Science Degrees:\n   • B.Sc in Life Sciences/Microbiology/Biochemistry: 3 years\n   • Average fees: ₹20K-1L/year\n   • Career paths: Research assistant, Lab scientist, Quality control\n   • Higher education needed for better prospects (M.Sc, PhD)\n   • Entry salaries: ₹2.5-5L/year\n\n7. Emerging Fields (New Opportunities):\n   • B.Sc in Genetics & Genomics: 3 years\n   • B.Sc in Bioinformatics: 3 years\n   • B.Sc in Medical Imaging Technology: 3 years\n   • B.Sc in Public Health: 3 years\n   • Healthcare management programs\n\nWhich specific medical or healthcare field would you like more detailed information about?`;
    }
    
    return `Medical Path (BiPC) Complete Career Roadmap:\n\n1. Education Timeline & Strategy:\n   • 11th-12th: BiPC stream (Biology, Physics, Chemistry)\n     - Focus areas: Human Physiology, Organic Chemistry, Mechanics\n     - School + Self-study: 8-10 hours daily recommended\n     - Coaching: Consider for NEET preparation\n   • Entrance exam preparation:\n     - NEET: Mandatory for all medical programs in India\n     - Start preparation from 11th standard\n     - Practice at least 10,000 MCQs before exam\n   • After qualifying NEET:\n     - Counseling process (All India Quota & State Quota)\n     - Merit-based seat allocation\n     - Document verification & fee payment\n     - College joining formalities\n\n2. MBBS Journey (5.5 years):\n   • Pre-clinical phase (Year 1-2):\n     - Anatomy, Physiology, Biochemistry\n     - Foundation subjects with lab work\n   • Para-clinical phase (Year 2-3):\n     - Pathology, Pharmacology, Microbiology, Forensics\n     - Disease mechanisms and treatments\n   • Clinical phase (Year 3-4.5):\n     - Medicine, Surgery, OB-GYN, Pediatrics, etc.\n     - Hospital rotations and patient care\n   • Internship (Final 1 year):\n     - Rotating internship in all departments\n     - Stipend: ₹15k-25k/month in government colleges\n   • Average fees: ₹25k-1L/year (govt), ₹5L-25L/year (private)\n\n3. Alternative Medical Programs:\n   • BDS (Dentistry): 5 years\n     - Similar structure to MBBS but dental focus\n     - Lower NEET cutoff than MBBS\n   • AYUSH Systems (BAMS/BHMS/BUMS): 5.5 years\n     - Traditional medicine systems\n     - Lower fees than MBBS/BDS\n     - Growing acceptance and government support\n\n4. Postgraduate Options:\n   • MD/MS through NEET-PG (3 years):\n     - Clinical specialties (Medicine, Surgery, etc.)\n     - Super competitive (1:10 selection ratio)\n     - Entrance preparation: 1-2 years post-MBBS\n     - Stipend during residency: ₹50k-90k/month\n   • Diplomate of National Board (DNB): 3 years\n     - Alternative to MD/MS, equal recognition\n     - Hospital-based training program\n   • DM/MCh (Super-specialization): 3 years\n     - After MD/MS for super-specialties\n     - Highest level of medical specialization\n\n5. Career Paths & Earnings:\n   • Government Service:\n     - Medical Officer: ₹60k-1.5L/month\n     - Regular hours, job security, pensions\n     - Rural service bonds in many states\n   • Private Hospitals:\n     - Resident Doctor: ₹60k-2L/month\n     - Consultant: ₹1.5L-5L+/month (specialist)\n     - Higher pay but longer working hours\n   • Private Practice:\n     - Setup costs: ₹10L-50L+ (location dependent)\n     - Earnings vary widely: ₹5L-50L+/year\n     - Freedom but business management needed\n   • Academic Medicine:\n     - Assistant Professor: ₹80k-2L/month\n     - Professor: ₹1.5L-3L/month\n     - Research opportunities and teaching\n   • Corporate opportunities:\n     - Pharmaceutical industry\n     - Medical insurance\n     - Healthcare administration\n\n6. Foreign Practice Options:\n   • USA: USMLE pathway (3 exams + residency)\n   • UK: PLAB or MRCP pathway\n   • Australia: AMC examination\n   • Preparation time: 1-3 years\n   • Investment: ₹15L-30L for exams and process\n   • ROI: 5-10x higher salaries than India\n\nWould you like me to elaborate on any specific aspect of the medical career path?`;
  }

  // Commerce related queries
  if (normalizedInput.includes("commerce") || normalizedInput.includes("business") || normalizedInput.includes("accounting") || normalizedInput.includes("ca")) {
    if (normalizedInput.includes("course") || normalizedInput.includes("program")) {
      return `Comprehensive Commerce Stream Course Guide:\n\n1. Traditional Undergraduate Degrees:\n   • B.Com (Bachelor of Commerce): 3 years\n     - Regular: Broad foundation in commerce subjects\n     - Fee: ₹10K-60K/year (varies by college)\n     - Job prospects: Entry-level accounting, banking, finance roles\n     - Placement salaries: ₹2.5-5L/year\n   • B.Com (Hons): 3 years\n     - More specialized and in-depth than regular B.Com\n     - Higher prestige and preferred by employers\n     - Fee: ₹15K-80K/year (varies by college)\n     - Placement salaries: ₹3-7L/year\n   • Specializations available:\n     - Accounting & Finance (most popular)\n     - Banking & Insurance\n     - Foreign Trade\n     - Taxation\n     - Data Analytics (newer option)\n\n2. Business Administration Programs:\n   • BBA (Business Administration): 3 years\n     - Management-focused approach\n     - Fee: ₹50K-3L/year (varies by college)\n     - Placement salaries: ₹3-8L/year\n     - Future path: MBA preferred for career growth\n   • BMS (Management Studies): 3 years\n     - Similar to BBA but more specialized\n     - Offered by select universities\n     - Fee: ₹80K-4L/year (varies by college)\n     - Placement salaries: ₹3.5-9L/year\n\n3. Professional Certifications (Most Prestigious):\n   • CA (Chartered Accountancy):\n     - Structure: Foundation → Intermediate → Final\n     - Duration: 4-5 years (including 3 years articleship)\n     - Total fees: ₹80K-1L for all levels + study materials\n     - Passing rates: 5-20% at final level (very challenging)\n     - Salaries after qualification: ₹7-20L/year\n     - Top recruiters: Big 4 (Deloitte, PwC, EY, KPMG)\n   • CS (Company Secretary):\n     - Structure: Foundation → Executive → Professional\n     - Duration: 3-4 years (including 1 year training)\n     - Total fees: ₹50K-80K for all levels\n     - Passing rates: 10-25% (moderately challenging)\n     - Salaries after qualification: ₹6-15L/year\n     - Focus area: Corporate legal compliance\n   • CMA (Cost Management Accountant):\n     - Structure: Foundation → Intermediate → Final\n     - Duration: 3-4 years (including training)\n     - Total fees: ₹50K-70K for all levels\n     - Passing rates: 15-30% (moderately challenging)\n     - Salaries after qualification: ₹6-15L/year\n     - Focus area: Cost optimization, management accounting\n\n4. Integrated & Specialized Programs:\n   • B.Com + LLB (5 years):\n     - Integrated commerce and law degree\n     - Fee: ₹80K-5L/year\n     - Career path: Corporate law, legal advisor\n   • BBA + MBA (5 years):\n     - Integrated bachelor's and master's\n     - Fee: ₹1L-8L/year\n     - Fast-track to management positions\n   • B.Com + MBA (5 years):\n     - Integrated commerce and management\n     - Fee: ₹80K-7L/year\n     - Popular for corporate careers\n\n5. Banking & Finance Specific Programs:\n   • BBA (Banking & Finance): 3 years\n   • Bachelor of Financial Markets: 3 years\n   • Bachelor of Banking & Insurance: 3 years\n   • Fee range: ₹70K-4L/year\n   • Job roles: Banking associate, investment analyst\n\n6. New-Age Commerce Courses:\n   • B.Com with Data Analytics: 3 years\n   • B.Com with Digital Marketing: 3 years\n   • B.Com with Financial Technology: 3 years\n   • BBA in Entrepreneurship: 3 years\n   • Fee range: ₹80K-5L/year\n   • Higher employability due to specialized skills\n\nWhich specific commerce course would you like to know more about?`;
    }
    
    if (normalizedInput.includes("job") || normalizedInput.includes("career") || normalizedInput.includes("opportunities") || normalizedInput.includes("scope")) {
      return `Commerce Career Opportunities - Complete Guide:\n\n1. Professional Qualification Paths:\n\n   • Chartered Accountant (CA):\n     - Roles: Statutory Audit, Taxation, Financial Advisory\n     - Work settings: CA firms, Industry, Self-practice\n     - Career progression:\n       * Articleship (₹5K-12K/month stipend)\n       * Junior CA (₹7-12 LPA)\n       * Senior CA (₹12-25 LPA)\n       * Partner/Director (₹25-80+ LPA)\n     - Top employers: Big 4 (Deloitte, EY, KPMG, PwC), Large corporates\n     - Work-life balance: Challenging during audit seasons\n     - Growth potential: Excellent with experience\n\n   • Company Secretary (CS):\n     - Roles: Corporate Governance, Legal Compliance, Board Affairs\n     - Career progression:\n       * Trainee (₹10K-20K/month stipend)\n       * CS Executive (₹6-10 LPA)\n       * Senior CS (₹10-20 LPA)\n       * Company Secretary of large firm (₹20-50+ LPA)\n     - Work settings: Listed companies, large corporates\n     - Work-life balance: Generally good\n     - Growth ceiling: Limited by company size\n\n   • Cost & Management Accountant (CMA):\n     - Roles: Cost Analysis, Management Accounting, Strategic Finance\n     - Career progression similar to CA but more focused on industry\n     - Average salaries: ₹6-15 LPA entry level to ₹15-40 LPA senior level\n     - Work settings: Manufacturing companies, large service organizations\n\n2. Corporate Finance & Accounting:\n\n   • Financial Analyst:\n     - Entry: ₹4-8 LPA (B.Com/BBA + optional certification)\n     - Senior: ₹10-20 LPA (5+ years experience)\n     - Skills needed: Financial modeling, Excel, data analysis\n     - Growth path: Manager → Director → CFO\n\n   • Accountant/Accounting Manager:\n     - Entry: ₹3-6 LPA\n     - Senior: ₹8-18 LPA\n     - Work environment: Structured, regular hours\n     - Career path: Controller → Finance Director\n\n   • Treasury & Cash Management:\n     - Mid-level: ₹8-15 LPA\n     - Senior: ₹15-30 LPA\n     - Focus: Liquidity management, investments\n\n3. Banking & Financial Services:\n\n   • Investment Banking:\n     - Analyst (entry): ₹10-18 LPA\n     - Associate (3-5 yrs): ₹18-35 LPA\n     - VP & above: ₹35-80+ LPA\n     - Work hours: Very demanding (70-100 hours weekly)\n     - Skills: Financial modeling, valuation, deal structuring\n\n   • Banking Operations:\n     - Probationary Officer: ₹4-7 LPA\n     - Branch Manager: ₹8-15 LPA\n     - Regional Manager: ₹15-30 LPA\n     - Work-life balance: Good in most banks\n\n   • Wealth Management:\n     - Relationship Manager: ₹5-12 LPA + incentives\n     - Senior Wealth Manager: ₹12-30 LPA + incentives\n     - Required skills: Product knowledge, client relationship\n\n4. Consulting & Advisory:\n\n   • Management Consultant:\n     - Entry level: ₹7-15 LPA (top firms pay higher)\n     - Project Manager: ₹15-30 LPA\n     - Partner/Director: ₹50L-2Cr+ PA\n     - Work hours: Demanding with travel\n     - Growth: Fast but competitive\n\n   • Tax Consultant:\n     - Entry level: ₹5-10 LPA\n     - Senior: ₹10-25 LPA\n     - Specializations: Direct tax, indirect tax, international tax\n\n5. Government & Public Sector:\n\n   • Civil Services (IRS, IAS with commerce background)\n     - Starting: ₹50-80K/month + perks\n     - Career progression through time-bound promotions\n     - Job security and prestige\n\n   • PSU Banking & Financial Institutions\n     - Selection: Through IBPS, SBI, RBI exams\n     - Salary: ₹3-7 LPA entry level\n     - Benefits: Housing, medical insurance, pension\n\n6. Entrepreneurship Opportunities:\n\n   • Accounting & Tax Practice\n   • Financial Advisory Services\n   • Wealth Management Firm\n   • Business Consulting\n   • Fintech startups\n   • Investment required: ₹1L-50L depending on scale\n\nWhich specific career path in commerce would you like more information about?`;
    }
    
    return `Commerce Stream Career Path - Complete Guide:\n\n1. Education Roadmap After 10th:\n   • 11th-12th Options (Commerce Stream):\n     - CEC (Commerce, Economics, Civics/Civics Science)\n       * Focus: Economic theories, business fundamentals, society study\n       * Suitable for: General commerce, banking careers\n     - MEC (Maths, Economics, Commerce)\n       * Focus: Quantitative methods + economic theories\n       * Suitable for: Analytics, financial modeling careers\n     - Key subjects in both: Accountancy, Business Studies\n     - Duration: 2 years\n     - Average scores needed: 60-75% for good colleges\n\n2. Undergraduate Education Paths:\n   • B.Com (Regular/Honors): 3 years\n     - Core subjects: Advanced Accounting, Business Law, Taxation\n     - Specializations available in final year\n     - Top colleges: SRCC (Delhi), St. Xavier's (Mumbai/Kolkata), Christ (Bangalore)\n     - Fees: ₹10K-80K/year depending on institution\n   • BBA (Business Administration): 3 years\n     - More practical, management-oriented approach\n     - Often includes internships and projects\n     - Higher fees: ₹50K-4L/year depending on institution\n\n3. Professional Qualifications (Parallel or Post-Graduation):\n   • CA (Chartered Accountancy):\n     - India's premier accounting qualification\n     - Structure: Foundation → Intermediate → Final + Articleship\n     - Timeline: Can start after 12th, takes 4-5 years total\n     - Success rate: 5-20% at final level\n     - Global recognition: Respected worldwide\n     - Registration: Through ICAI (Institute of Chartered Accountants of India)\n\n   • CS (Company Secretary):\n     - Corporate legal compliance expert\n     - Structure: Foundation → Executive → Professional + Training\n     - Timeline: 3-4 years total\n     - Registration: Through ICSI (Institute of Company Secretaries of India)\n\n   • CMA (Cost Management Accountant):\n     - Cost optimization and management accounting specialist\n     - Structure: Foundation → Intermediate → Final + Training\n     - Timeline: 3-4 years total\n     - Registration: Through ICMAI (Institute of Cost Accountants of India)\n\n4. Higher Education Options:\n   • MBA (Master of Business Administration):\n     - Duration: 2 years after graduation\n     - Entrance exams: CAT, XAT, MAT, CMAT, GMAT\n     - Specializations: Finance, Marketing, HR, Operations\n     - Fees: ₹50K-25L for full program (institution dependent)\n     - ROI: High from top-tier institutions (IIMs, XLRI, etc.)\n\n   • M.Com (Master of Commerce):\n     - Duration: 2 years\n     - Focus: Advanced commerce concepts, research\n     - Career path: Academia, specialized finance roles\n     - Fees: ₹10K-1L/year\n\n   • Specialized Master's Programs:\n     - Master of Financial Management\n     - Master of Banking & Finance\n     - Master in Financial Analysis\n     - Duration: 1-2 years\n     - Fees: ₹1L-10L for full program\n\n5. Career Progression Paths:\n   • Accounting & Finance Track:\n     - Entry: Junior Accountant (₹3-5 LPA)\n     - Mid: Financial Analyst/Manager (₹6-15 LPA)\n     - Senior: Finance Controller/CFO (₹15-50+ LPA)\n\n   • Banking & Financial Services:\n     - Entry: Banking Associate/PO (₹3-7 LPA)\n     - Mid: Branch Manager/Investment Analyst (₹7-15 LPA)\n     - Senior: Regional Manager/Investment Head (₹15-40+ LPA)\n\n   • Corporate Management:\n     - Entry: Management Trainee (₹4-8 LPA)\n     - Mid: Department Manager (₹8-20 LPA)\n     - Senior: Business Head/CEO (₹20-75+ LPA)\n\n6. Key Skills for Commerce Success:\n   • Technical skills:\n     - Advanced Excel and financial modeling\n     - Accounting software proficiency\n     - Data analysis and visualization\n     - Taxation knowledge\n   • Soft skills:\n     - Analytical thinking\n     - Attention to detail\n     - Communication skills\n     - Business acumen\n\n7. Emerging Areas in Commerce:\n   • Fintech innovations\n   • ESG (Environmental, Social, Governance) reporting\n   • Data analytics in finance\n   • International taxation\n   • Digital transformation of financial services\n\nWhich specific aspect of commerce education or careers would you like to explore further?`;
  }

  // Arts/Humanities related queries
  if (normalizedInput.includes("arts") || normalizedInput.includes("humanities")) {
    return `Arts/Humanities Stream - Complete Career Guide:\n\n1. Education Pathway After 10th:\n   • 11th-12th (Arts/Humanities Stream):\n     - Core subjects: History, Political Science, Geography, Sociology\n     - Optional subjects: Psychology, Economics, Fine Arts, Languages\n     - Duration: 2 years\n     - No specific stream requirements like PCM/PCB\n     - Flexibility to choose subjects based on interest\n\n2. Undergraduate Program Options:\n   • BA (Bachelor of Arts): 3 years\n     - General: Multiple subjects with equal weightage\n     - Honors: Specialization in one subject with deeper study\n     - Popular majors:\n       * Psychology: Human behavior and mental processes\n       * Economics: Market principles and economic theories\n       * English Literature: Literary analysis and criticism\n       * Political Science: Government systems and policy\n       * Sociology: Study of human society and relationships\n       * History: Analysis of past events and their impact\n     - Fees: ₹10K-80K/year depending on institution\n\n   • Specialized Degree Programs: 3-5 years\n     - Bachelor of Fine Arts (BFA): Painting, sculpture, applied arts\n     - Bachelor of Design (B.Des): Industrial, graphic, fashion design\n     - Bachelor of Performing Arts: Music, dance, theater\n     - Bachelor of Journalism & Mass Communication (BJMC): Media studies\n     - Bachelor of Social Work (BSW): Community service focus\n     - BA+LLB: Integrated law program (5 years)\n     - Fees range: ₹50K-5L/year depending on program & institute\n\n3. Career Fields and Opportunities:\n   • Media & Communication:\n     - Journalism: ₹3-7 LPA entry level to ₹15-30+ LPA senior\n     - Content Creation: ₹3-12 LPA (highly variable)\n     - Public Relations: ₹4-15 LPA\n     - Digital Marketing: ₹4-20 LPA\n     - Required skills: Writing, critical thinking, media tools\n     - Growth areas: Digital content, video production, social media\n\n   • Education & Academia:\n     - School Teaching: ₹3-8 LPA (requires B.Ed after BA)\n     - College Professor: ₹5-15 LPA (requires NET/PhD)\n     - Education Management: ₹6-20 LPA\n     - Research Positions: ₹4-15 LPA\n     - Work-life balance: Excellent in most positions\n     - Job security: High, especially in government institutions\n\n   • Psychology & Counseling:\n     - School Counselor: ₹3-8 LPA (M.A. Psychology required)\n     - Clinical Psychologist: ₹5-25 LPA (M.Phil/PhD required)\n     - HR/Organizational Psychologist: ₹5-20 LPA\n     - Career Counselor: ₹4-15 LPA\n     - Growth potential: Excellent with specialization\n     - Private practice: Highly variable income (₹10K-50K+ per client)\n\n   • Civil Services & Government:\n     - IAS, IPS, IFS, etc: ₹56K-2.5L/month + perks\n     - Other central services: ₹50K-1.5L/month\n     - State civil services: ₹40K-1.2L/month\n     - Entry through: UPSC, State PSCs examinations\n     - Benefits: Power, prestige, job security, pension\n     - Arts background advantage: General studies, essay writing skills\n\n   • Law (after BA-LLB or LLB):\n     - Corporate Law: ₹5-50+ LPA (firm/experience dependent)\n     - Litigation: Highly variable (₹3L-1Cr+ PA with experience)\n     - Legal Consultant: ₹5-25 LPA\n     - Judiciary: ₹70K-2L/month (through judicial services exam)\n\n   • Design & Creative Fields:\n     - Graphic Designer: ₹3-15 LPA\n     - UX/UI Designer: ₹5-25 LPA\n     - Interior Designer: ₹3-20 LPA\n     - Fashion Designer: ₹3-30+ LPA\n     - Film & Animation: ₹4-25+ LPA\n     - Portfolio is often more important than degrees\n\n4. Higher Education Options:\n   • Master's Programs (2 years):\n     - MA in specialized subject\n     - MBA (requires entrance exams)\n     - M.Ed (for teaching careers)\n     - MSW (Master of Social Work)\n     - M.Des (Master of Design)\n     - Specialized journalism/mass comm programs\n\n   • Research Degrees:\n     - M.Phil (1-2 years)\n     - PhD (3-5 years)\n     - Essential for academic careers\n     - Scholarships/stipends available: ₹25K-40K/month\n\n5. Foreign Education & Global Opportunities:\n   • Liberal Arts degrees highly valued abroad\n   • Humanities research opportunities in US/UK/Europe\n   • Language proficiency creates international prospects\n   • Cross-cultural consultancy roles\n   • International development organizations\n\n6. Emerging Areas for Arts Graduates:\n   • Digital humanities\n   • Content strategy & management\n   • User experience research\n   • Cultural resource management\n   • Sustainability communications\n   • Heritage tourism\n   • Mental health advocacy\n\nWhat specific aspect of arts/humanities education or careers would you like to explore further?`;
  }

  // Vocational courses
  if (normalizedInput.includes("vocational") || normalizedInput.includes("skill") || normalizedInput.includes("diploma") || normalizedInput.includes("polytechnic") || normalizedInput.includes("iti")) {
    return `Comprehensive Vocational Education Guide After 10th:\n\n1. ITI Programs (Industrial Training Institutes):\n   • Official certification: National Council for Vocational Training (NCVT)\n   • Duration options:\n     - 1 year programs: Basic trades\n     - 2 year programs: Comprehensive technical training\n   • Popular trades with market demand:\n     - Electrician:\n       * Duration: 2 years\n       * Fee: ₹5K-20K/year\n       * Job roles: Maintenance technician, electrical contractor\n       * Starting salary: ₹10K-18K/month\n       * Growth path: Supervisor → Contractor → Own business\n       * Top employers: Infrastructure companies, factories, railways\n     - Mechanic (Diesel/Motor):\n       * Duration: 1-2 years\n       * Fee: ₹5K-15K/year\n       * Job roles: Service technician, maintenance specialist\n       * Starting salary: ₹12K-20K/month\n       * Growth path: Senior technician → Service manager\n       * Top employers: Automobile companies, fleet operators\n     - Fitter:\n       * Duration: 2 years\n       * Fee: ₹5K-15K/year\n       * Job roles: Assembly line worker, maintenance fitter\n       * Starting salary: ₹10K-18K/month\n       * Growth path: Supervisor → Production manager\n     - Welder:\n       * Duration: 1 year\n       * Fee: ₹5K-12K/year\n       * Job roles: Construction welder, fabrication specialist\n       * Starting salary: ₹12K-22K/month\n       * Growth path: Specialized welder → Contractor\n     - COPA (Computer Operator & Programming Assistant):\n       * Duration: 1 year\n       * Fee: ₹5K-20K/year\n       * Job roles: Data entry operator, office assistant\n       * Starting salary: ₹10K-18K/month\n       * Growth path: Administrative staff → IT support\n   • Admission process:\n     - Minimum qualification: 10th pass\n     - Selection: Merit-based on 10th marks\n     - Some trades require aptitude tests\n   • Government vs Private ITIs:\n     - Govt: Lower fees (₹3K-10K/year), better recognition\n     - Private: More seats, easier admission, higher fees\n   • Benefits of ITI:\n     - Direct job market entry after course completion\n     - Option for further education through lateral entry\n     - Self-employment possibilities\n     - Apprenticeship opportunities with stipend\n\n2. Polytechnic Diploma Programs:\n   • Official certification: State Technical Education Boards\n   • Duration: 3 years (6 semesters)\n   • Key advantages:\n     - Technical knowledge above ITI level\n     - Direct entry to 2nd year engineering possible after diploma\n     - Both theoretical and practical training\n   • Popular diploma programs:\n     - Diploma in Mechanical Engineering:\n       * Focus: Manufacturing, design, thermal systems\n       * Fee: ₹10K-40K/year\n       * Job roles: Junior engineer, technical supervisor\n       * Starting salary: ₹15K-25K/month\n       * Industries: Manufacturing, automobile, production\n     - Diploma in Civil Engineering:\n       * Focus: Construction, surveying, structural design\n       * Fee: ₹10K-40K/year\n       * Job roles: Site supervisor, junior engineer, estimator\n       * Starting salary: ₹15K-25K/month\n       * Industries: Construction, infrastructure, government\n     - Diploma in Electrical Engineering:\n       * Focus: Power systems, electrical machines, controls\n       * Fee: ₹10K-45K/year\n       * Job roles: Electrical supervisor, maintenance engineer\n       * Starting salary: ₹15K-28K/month\n       * Industries: Power, manufacturing, construction\n     - Diploma in Computer Science/IT:\n       * Focus: Programming, networking, web technologies\n       * Fee: ₹15K-60K/year\n       * Job roles: Technical support, junior programmer\n       * Starting salary: ₹15K-30K/month\n       * Industries: IT services, software development\n   • Admission process:\n     - Entrance exams conducted by state technical boards\n     - Merit-based admission from 10th marks in some states\n     - Reservation policies applicable as per government norms\n\n3. Specialized Vocational Courses:\n   • Aviation related:\n     - Air Ticketing & Hospitality:\n       * Duration: 6-12 months\n       * Fee: ₹30K-80K\n       * Job roles: Travel consultant, reservation executive\n       * Starting salary: ₹15K-25K/month\n   • Fashion & Design:\n     - Fashion Technology Diploma:\n       * Duration: 1-3 years\n       * Fee: ₹50K-2L/year\n       * Job roles: Assistant designer, merchandiser\n       * Starting salary: ₹15K-30K/month\n     - Interior Design Diploma:\n       * Duration: 1-3 years\n       * Fee: ₹60K-3L/year\n       * Job roles: Assistant interior designer, visualizer\n       * Starting salary: ₹15K-35K/month\n   • Hospitality:\n     - Hotel Management Diploma:\n       * Duration: 1-3 years\n       * Fee: ₹50K-2.5L/year\n       * Job roles: F&B executive, front office assistant\n       * Starting salary: ₹12K-25K/month plus service charges\n\n4. Paramedical Courses:\n   • Medical Laboratory Technology:\n     - Duration: 2 years\n     - Fee: ₹30K-1L/year\n     - Job roles: Lab technician, pathology assistant\n     - Starting salary: ₹15K-25K/month\n   • Radiology Technology:\n     - Duration: 2 years\n     - Fee: ₹40K-1.2L/year\n     - Job roles: X-ray technician, imaging assistant\n     - Starting salary: ₹18K-28K/month\n   • Nursing Assistant/GNM:\n     - Duration: 2-3.5 years\n     - Fee: ₹50K-1.5L/year\n     - Job roles: Staff nurse, healthcare assistant\n     - Starting salary: ₹15K-30K/month\n\n5. Government Skill Development Initiatives:\n   • Pradhan Mantri Kaushal Vikas Yojana (PMKVY)\n     - Short-term training programs (3-6 months)\n     - Free training with certification\n     - Stipend in some cases\n   • Deen Dayal Upadhyaya Grameen Kaushalya Yojana\n     - Rural focused skill development\n     - Free training with placement assistance\n\n6. Career Progression After Vocational Training:\n   • Further education options:\n     - Advanced diploma courses\n     - Lateral entry to degree programs\n     - Specialized certification courses\n   • Entrepreneurship paths:\n     - Small business setup in trained trade\n     - Service provider in specialized area\n     - Government support schemes available\n   • Industry certifications for advancement:\n     - Technical certification from manufacturers\n     - International skill certifications\n     - Management training for supervisory roles\n\nWhich vocational education path interests you most?`;
  }

  // Fallback response for questions not covered above
  return "I'm here to help guide you through various career paths after 10th grade. You can ask me specific questions about:\n\n- Different streams (Science, Commerce, Arts) and their detailed course structures\n- Engineering paths and specializations (if you're considering MPC)\n- Medical courses and requirements (if you're considering BiPC)\n- Commerce career options including professional courses like CA/CS/CMA\n- Arts/Humanities opportunities and career prospects\n- Vocational training programs, ITI courses, and diplomas\n- Specific entrance exams for any stream\n- Job opportunities and salary expectations across fields\n- Higher education pathways in India or abroad\n- Government job opportunities in different streams\n\nFeel free to ask about any of these areas or mention a specific career field you're interested in. I can provide detailed information including:\n- Course durations and structures\n- Fee ranges and financial considerations\n- Entrance exam patterns and preparation strategies\n- Skills required for success\n- Career progression paths\n- Salary expectations at different stages\n\nWhat specific aspect of career planning would you like to explore?";
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
              
              <form onSubmit={handleSendMessage} className="mt-4 flex flex-col gap-2">
                <Textarea
                  placeholder="Type your question here..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                <Button 
                  type="submit" 
                  className="bg-brand-blue-500 hover:bg-brand-blue-600 px-4 w-full md:w-auto md:self-end"
                  disabled={!inputValue.trim() || isTyping}
                >
                  <SendHorizonal className="h-4 w-4 mr-2" /> Send Question
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

