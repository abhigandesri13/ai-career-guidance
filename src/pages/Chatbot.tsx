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
    return `After 10th standard, you have these main educational paths:\n\n1. Intermediate/11th-12th:\n   • MPC (Mathematics, Physics, Chemistry)\n     - Focus: Engineering & technical fields\n     - Duration: 2 years\n     - Exams: JEE Main/Advanced, BITSAT, State CETs\n     - Leads to: B.Tech/B.E programs\n   • BiPC (Biology, Physics, Chemistry)\n     - Focus: Medical & life sciences\n     - Duration: 2 years\n     - Exams: NEET, State medical CETs\n     - Leads to: MBBS, BDS, BAMS, B.Sc programs\n   • CEC (Commerce, Economics, Civics)\n     - Focus: Business, finance, economics\n     - Duration: 2 years\n     - Leads to: B.Com, BBA, CA, CS programs\n   • MEC (Mathematics, Economics, Commerce)\n     - Focus: Business analytics, economics\n     - Duration: 2 years\n     - Leads to: B.Com, BBA, actuarial sciences\n   • HEC (Home Science, Economics, Commerce)\n     - Focus: Nutrition, family studies, business\n     - Duration: 2 years\n     - Leads to: Home science, nutrition degrees\n\n2. Vocational Courses:\n   • Air Ticketing - 6-12 months\n   • Fashion Technology - 1-3 years\n   • Apparel Technology - 1-2 years\n   • Jewellery Technology - 6 months - 1 year\n   • Agriculture - 1-2 years\n   • Interior designing - 1-3 years\n   • Hotel Management - 6 months - 3 years\n\n3. ITI Programs (Industrial Training Institutes):\n   • Diploma in Automobile - 1-2 years\n   • Diploma in Draughtsmen - 1-2 years\n   • Diploma in Electrician - 1-2 years\n   • Diploma in Mechanical - 1-2 years\n   • Diploma in Mechanic Diesel - 1-2 years\n   • Diploma in Architect Asst. - 1-2 years\n   • Average fees: ₹5,000-30,000 per year\n   • Job prospects: Technical jobs, self-employment\n\n4. Polytechnic (3-year diploma programs):\n   • Automobile Engineering\n   • Aeronautical Engineering\n   • Agricultural Engineering\n   • Apparel Engineering & many more\n   • Average fees: ₹10,000-60,000 per year\n   • Advantage: Direct entry to 2nd year engineering\n\n5. Para Medical Courses:\n   • Various medical support diplomas (1-3 years)\n   • Healthcare jobs immediately after completion\n   • Average fees: ₹20,000-1,00,000 per year\n   • Growing demand in healthcare sector\n\nWhich path interests you most? I can provide more specific details about any of these options.`;
  }

  // MPC/Engineering related queries
  if (normalizedInput.includes("engineering") || normalizedInput.includes("mpc") || normalizedInput.includes("b.tech") || normalizedInput.includes("b.e")) {
    if (normalizedInput.includes("entrance") || normalizedInput.includes("exam")) {
      return `Engineering Entrance Exams - Comprehensive Guide:\n\n1. JEE Main:\n   • Eligibility: 10+2 with PCM (75% for general, 65% for reserved)\n   • Exam Pattern: 90 questions (30 each from Physics, Chemistry, Math)\n   • Total marks: 300 (4 marks per correct, -1 for incorrect)\n   • Duration: 3 hours\n   • Frequency: Twice yearly (January & April sessions)\n   • Registration: Usually October-November and February-March\n   • Fees: ₹650-1,400 depending on category & gender\n   • Percentile cutoffs:\n     - General: 85-95+ percentile for NITs\n     - SC/ST/OBC: 50-75 percentile\n   • Online computer-based test\n\n2. JEE Advanced:\n   • Only for top 2,50,000 JEE Main qualifiers\n   • Exam Pattern: 2 papers, 3 hours each\n   • Complex question patterns with numerical value answers\n   • Registration: After JEE Main results\n   • Fees: ₹2,800 (Gen/OBC), ₹1,400 (SC/ST/PwD)\n   • Only 2 attempts allowed in consecutive years\n\n3. BITSAT:\n   • For BITS Pilani, Goa, Hyderabad\n   • Exam Pattern: 150 questions, 3 hours\n   • Includes English & Logical Reasoning sections\n   • Computer-based online test with immediate score\n   • Session usually in May-June\n   • Registration: February-March\n   • Fees: ₹3,400 approximately\n\n4. State Engineering CETs:\n   • State-specific exams like EAMCET (AP/Telangana)\n   • MHT-CET (Maharashtra), KCET (Karnataka), etc.\n   • Typically easier than national exams\n   • Local language options available\n   • Usually conducted in May-June\n   • Registration: February-March\n   • Fees vary by state: ₹600-1,500\n\nPreparation Strategy:\n• Start preparation in 11th standard\n• First master NCERT textbooks completely\n• Solve previous years' questions (minimum 10 years)\n• Take regular mock tests (at least 30 full tests)\n• Focus areas by subject:\n  - Physics: Mechanics, Electromagnetism\n  - Chemistry: Physical chemistry, Organic reactions\n  - Math: Calculus, Coordinate Geometry\n\nTop coaching options:\n• Classroom: FIITJEE, Allen, Resonance (₹1-2.5 lakh/year)\n• Online: Unacademy, Vedantu, Physics Wallah (₹15k-80k/year)\n• Self-study: Recommended books & resources available\n\nWhat specific aspect of entrance exams would you like me to elaborate on?`;
    }
    
    if (normalizedInput.includes("job") || normalizedInput.includes("career") || normalizedInput.includes("opportunities")) {
      return `Comprehensive Engineering Career Opportunities Guide:\n\n1. Software & IT Sector (Highest Demand):\n   • Software Developer/Engineer: ₹3.5-15 LPA entry level\n   • Data Scientist/AI Engineer: ₹6-20 LPA entry level\n   • DevOps Engineer: ₹5-18 LPA entry level\n   • Cloud Solutions Architect: ₹12-40+ LPA (3-5 yrs exp)\n   • Top recruiters: FAANG, TCS, Infosys, Wipro, HCL, startups\n   • Growth potential: 25-35% annual with right skills\n   • In-demand skills: Cloud (AWS/Azure), AI/ML, Full Stack\n   • Work-life balance: Moderate to good (company dependent)\n\n2. Core Engineering Fields:\n   • Electronics/VLSI Design: ₹4-12 LPA entry level\n   • Mechanical Design Engineer: ₹3.5-8 LPA entry level\n   • Automobile Engineer: ₹3.5-10 LPA entry level\n   • Civil/Structural Engineer: ₹3-7 LPA entry level\n   • Top recruiters: L&T, Tata Motors, BHEL, Maruti Suzuki\n   • Growth potential: 15-20% annual with specialization\n   • Work hours: Typically 45-50 hours/week\n   • Job stability: High in established companies\n\n3. Public Sector & Government Jobs:\n   • IES (Indian Engineering Services): ₹50k-1.5L/month\n   • PSUs (ONGC, NTPC, BHEL): ₹50k-1.2L/month entry level\n   • Railways (Technical cadre): ₹35k-90k/month entry level\n   • Defence Services (Technical): ₹50k-1.5L/month + perks\n   • Selection: Through UPSC, GATE, PSU-specific exams\n   • Benefits: Job security, pensions, housing allowance\n   • Work-life balance: Excellent in most positions\n   • Career progression: Time-bound promotions + merit\n\n4. Specialized Industry Opportunities:\n   • Renewable Energy: ₹4-15 LPA (rapidly growing sector)\n   • Semiconductor Design: ₹6-20 LPA (high specialization)\n   • Robotics & Automation: ₹5-18 LPA (cutting edge tech)\n   • Biomedical Engineering: ₹4-15 LPA (healthcare tech)\n   • Space/Aerospace: ₹6-20 LPA (with ISRO/private firms)\n\n5. Higher Education & Research Paths:\n   • M.Tech in specialized fields (₹25k-50k stipend in IITs)\n   • MS abroad ($20-30k scholarships available)\n   • PhD (fully funded at top universities)\n   • Academia: Assistant Professor ₹60k-1.5L/month\n   • Research Scientists: ₹60k-2L/month in labs/industry\n\n6. Entrepreneurship Trends:\n   • Tech startups (SaaS, AI, Fintech) - funding available\n   • Engineering services/consultancy - low investment start\n   • Hardware/IoT product ventures - moderate investment\n   • Green tech/sustainability - growing investment sector\n\nWhich specific career path would you like more details about?`;
    }
    
    return `Engineering (MPC Stream) Complete Path:\n\n1. Preparation Timeline:\n   • 11th-12th: MPC subjects focus (PCM + English + optional)\n   • Class 11: Focus on fundamentals and building concepts\n   • Class 12: Application and entrance exam preparation\n   • Self-study hours: Recommended 4-6 hours daily beyond school\n   • Coaching: Consider from Class 11 for competitive exams\n\n2. Key Entrance Exams & Their Importance:\n   • JEE Main: Gateway to NITs, IIITs and GFTIs\n   • JEE Advanced: For IITs only (top 2.5 lakh JEE Main qualifiers)\n   • BITSAT: For BITS Pilani, Goa, Hyderabad\n   • State CETs: For state engineering colleges (easier than national)\n   • Special exams: Design (UCEED/CEED), Architecture (NATA/JEE-B.Arch)\n\n3. Engineering Branches & Their Prospects:\n   • Computer Science & Engineering\n     - Highest placement rates and packages\n     - Industry demand growing at 30% annually\n     - Skills focus: Programming, data structures, AI/ML\n   • Electronics & Communication\n     - Strong in semiconductor, telecom sectors\n     - Growing IoT and embedded systems opportunities\n     - Skills focus: Circuit design, signal processing\n   • Mechanical Engineering\n     - Core sector with stable demand\n     - Automobile, aerospace, manufacturing industries\n     - Skills focus: CAD/CAM, thermodynamics, materials\n   • Civil Engineering\n     - Infrastructure development sector\n     - Government projects, real estate, structural design\n     - Skills focus: Structural analysis, construction mgmt\n\n4. College Selection Factors:\n   • Tier-1: IITs, NITs, BITS, IIITs (highest ROI)\n   • Tier-2: Good state universities, deemed universities\n   • Tier-3: Private engineering colleges\n   • Factors to consider:\n     - NIRF ranking and accreditation (NAAC, NBA)\n     - Placement statistics and average packages\n     - Industry connections and internship opportunities\n     - Faculty qualification and research output\n     - Infrastructure and lab facilities\n     - Alumni network strength\n\n5. Engineering Education Timeline:\n   • B.Tech/B.E Duration: 4 years (8 semesters)\n   • Year 1-2: Common engineering subjects\n   • Year 3-4: Specialization courses\n   • Final year: Major project + placements\n   • Average fees: ₹50k-₹3L per year (varies by institute)\n   • Scholarships available: Merit-based, need-based, government\n\n6. Career Growth Trajectory:\n   • Entry level (0-2 yrs): Junior Engineer/Trainee\n   • Mid level (3-5 yrs): Senior Engineer/Team Lead\n   • Senior level (6-10 yrs): Manager/Technical Specialist\n   • Leadership (10+ yrs): Director/VP Engineering\n   • Average salary growth: 12-18% annually with upskilling\n\n7. Higher Education Options:\n   • M.Tech: 2-year specialized master's (India)\n   • MS: 1.5-2 year research-focused degree (Abroad)\n   • MBA: Career shift to management (after work exp)\n   • PhD: Research and academia focus (3-5 years)\n\nWould you like me to elaborate on any specific aspect of engineering education or career?`;
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
      return `Comprehensive Commerce Stream Course Guide:\n\n1. Traditional Undergraduate Degrees:\n   • B.Com (Bachelor of Commerce): 3 years\n     - Regular: Broad foundation in commerce subjects\n     - Fee: ₹10K-60K/year (varies by college)\n     - Job prospects: Entry-level accounting, banking, finance roles\n     - Placement salaries: ₹2.5-5L/year\n   • B.Com (Hons): 3 years\n     - More specialized and in-depth than regular B.Com\n     - Higher prestige and preferred by employers\n     - Fee: ₹15K-80K/year (varies by college)\n     - Placement salaries: ₹3-7L/year\n   • Specializations available:\n     - Accounting & Finance (most popular)\n     - Banking & Insurance\n     - Foreign Trade\n     - Taxation\n     - Data Analytics (newer option)\n\n2. Business Administration Programs:\n   • BBA (Business Administration): 3 years\n     - Management-focused approach\n     - Fee: ₹50K-3L/year (varies by college)\n     - Placement salaries: ₹3-8L/year\n     - Future path: MBA preferred for career growth\n   • BMS (Management Studies): 3 years\n     - Similar to BBA but more specialized\n     - Offered by select universities\n     - Fee: ₹80K-4L/year (varies by college)\n     - Placement salaries: ₹3.5-9L/year\n\n3. Professional Certifications (Most Prestigious):\n   • CA (Chartered Accountancy):\n     - Structure: Foundation → Intermediate → Final\n     - Duration: 4-5 years (including 3 years articleship)\n     - Total fees: ₹80K-1L for all levels + study materials\n     - Passing rates: 5-20% at final level (very challenging)\n     - Starting salary: ₹7-12L/year (after qualification)\n     - Job roles: Auditing, Taxation, Financial Advisory\n   • CS (Company Secretary):\n     - Structure: Foundation → Executive → Professional\n     - Duration: 3-4 years\n     - Fees: ₹50K-80K for complete course\n     - Job roles: Corporate compliance, legal advisory\n     - Average salary: ₹5-10L/year\n   • CMA (Cost & Management Accountant):\n     - Structure: Foundation → Intermediate → Final\n     - Duration: 3-4 years\n     - Fees: ₹50K-70K for complete course\n     - Job roles: Cost analysis, financial planning\n     - Average salary: ₹5-9L/year\n\n4. Banking & Finance Specific Programs:\n   • BBA/B.Com in Banking & Insurance\n   • Diploma in Banking & Finance (1-2 years)\n   • Certificate courses in Financial Markets (6 months - 1 year)\n   • JAIIB & CAIIB for banking professionals\n   • CFA (Chartered Financial Analyst) - global recognition\n\n5. Digital Commerce New-Age Courses:\n   • Digital Marketing (₹30K-1.5L for certification)\n   • Financial Technology courses (₹50K-2L)\n   • E-commerce Management (₹40K-1L)\n   • Data Analytics for Business (₹50K-2L)\n\nWhich specific commerce course would you like more details about?`;
    }
    
    if (normalizedInput.includes("career") || normalizedInput.includes("job") || normalizedInput.includes("opportunities")) {
      return `Commerce Stream Career Opportunities Guide:\n\n1. Corporate Finance Careers:\n   • Financial Analyst: ₹4-8L/year entry level\n   • Investment Banking Associate: ₹8-15L/year entry level\n   • Corporate Treasurer: ₹7-15L/year\n   • Financial Controller: ₹10-20L/year\n   • Credit Analyst: ₹4-7L/year entry level\n   • Work environment: Fast-paced, analytical, number-driven\n   • Growth path: 15-25% salary hike with experience\n   • Skills needed: Financial modeling, valuation, Excel expertise\n\n2. Professional Practice:\n   • Chartered Accountant: ₹7-15L/year post qualification\n     - Audit firms: Big 4 (Deloitte, EY, KPMG, PwC) or own practice\n     - Growth potential: Partner level (₹50L-2Cr/year)\n   • Company Secretary: ₹5-10L/year\n     - Corporate legal & compliance roles\n     - Board-facing responsibilities\n   • Cost Accountant: ₹5-9L/year\n     - Manufacturing focus, cost optimization\n   • Work profile: Specialized expertise, client-facing, advisory\n\n3. Banking & Financial Services:\n   • Bank Probationary Officer: ₹4-7L/year\n   • Credit Manager: ₹5-10L/year\n   • Relationship Manager: ₹4-12L/year + incentives\n   • Investment Advisor: ₹5-15L/year + commissions\n   • Insurance Underwriter: ₹4-8L/year\n   • Industry pros: Structured work hours, job security\n   • Growth path: Management roles in 8-10 years\n\n4. Management & Consulting:\n   • Business Analyst: ₹5-12L/year\n   • Management Consultant: ₹8-20L/year\n   • Operations Manager: ₹6-12L/year\n   • Project Manager: ₹8-18L/year\n   • Work profile: Strategic thinking, problem-solving, client interaction\n   • Top recruiters: McKinsey, BCG, Bain, Deloitte, Accenture\n\n5. Government & Public Sector:\n   • Bank Officer (through IBPS): ₹3-7L/year\n   • Revenue Service (through UPSC): ₹6-15L/year\n   • PSU Finance Officer: ₹5-12L/year\n   • RBI Grade B Officer: ₹8-15L/year\n   • Benefits: Job security, pensions, work-life balance\n   • Selection: Through competitive exams (UPSC, SSC, IBPS)\n\n6. Entrepreneurship Options:\n   • Financial Advisory Services\n   • Accounting & Tax Practice\n   • Financial Education/Training\n   • Fintech startups (with tech partners)\n   • Investment funding opportunities: Angel investors, bank loans\n\n7. New-Age Commerce Careers:\n   • Fintech Product Manager: ₹8-20L/year\n   • Digital Marketing Specialist: ₹4-15L/year\n   • E-commerce Operations: ₹5-12L/year\n   • Business Development: ₹4-15L/year + incentives\n   • Data Analytics for Business: ₹6-18L/year\n\nWhich specific career path interests you most?`;
    }
    
    // General commerce information
    return `Commerce Stream Complete Career Roadmap:\n\n1. Education Pathway:\n   • 11th-12th: Commerce with Maths/Economics\n     - Focus subjects: Accountancy, Business Studies, Economics\n     - Additional advantage: Mathematics (for wider options)\n     - Computer Applications (recommended elective)\n   • Undergraduate options:\n     - B.Com/B.Com (Hons): 3 years (foundation commerce degree)\n     - BBA/BMS: 3 years (management focused)\n     - Specialized B.Com: Banking, Financial Markets, Economics\n     - Integrated programs: 5-year BBA+MBA, 5-year B.Com+MBA\n   • Professional certifications alongside graduation:\n     - CA Foundation (after 12th) → Intermediate → Final\n     - CS Foundation → Executive → Professional\n     - CMA Foundation → Intermediate → Final\n\n2. Key Skills Development:\n   • Technical skills:\n     - Accounting software (Tally, SAP, QuickBooks)\n     - MS Excel (advanced formulas, pivot tables, macros)\n     - Financial modeling & analysis\n     - Business communication (written and verbal)\n   • Soft skills:\n     - Analytical thinking\n     - Problem-solving\n     - Attention to detail\n     - Teamwork & leadership\n     - Negotiation skills\n\n3. Internships & Work Experience:\n   • 1st year: Short-term observational internships (2-4 weeks)\n   • 2nd year: Functional internships in accounting/finance (2-3 months)\n   • 3rd year: Pre-placement internships (3-6 months)\n   • Target organizations:\n     - CA/CS/CMA firms for professional exposure\n     - Banks & financial institutions\n     - Corporate finance departments\n     - Startups for broader exposure\n\n4. Industry Certifications (Post-Graduation Value-Add):\n   • NSE Certified Capital Market Professional\n   • NISM (National Institute of Securities Markets) certifications\n   • NCFM modules (various financial market modules)\n   • Banking certifications: JAIIB, CAIIB\n   • Global options: CFA, FRM, CFP\n\n5. Postgraduate Specializations:\n   • MBA Finance: 2 years (highest demand)\n   • MBA Marketing/HR/Operations: 2 years\n   • M.Com: 2 years (academic/research focus)\n   • Specialized Masters: FinTech, Business Analytics, etc.\n   • Global programs: Masters in Finance, Management, etc.\n\n6. Career Progression Timeline:\n   • Entry-level (0-3 years): Jr. Accountant, Financial Analyst, Management Trainee\n     - Salary range: ₹3-8L/year\n   • Mid-level (4-8 years): Sr. Accountant, Finance Manager, Team Lead\n     - Salary range: ₹8-18L/year\n   • Senior-level (8-15 years): Finance Controller, Head of Department\n     - Salary range: ₹18-35L/year\n   • Leadership (15+ years): CFO, Finance Director, Partner\n     - Salary range: ₹35L-1.5Cr+/year\n\n7. Industry Options:\n   • Banking & Financial Services (largest employer)\n   • Professional Services & Consulting\n   • Manufacturing & FMCG\n   • IT & Tech companies (finance operations)\n   • Retail & E-commerce\n   • Public Sector & Government\n\nWhich aspect of the commerce career path would you like me to elaborate on?`;
  }

  // Arts/Humanities related queries
  if (normalizedInput.includes("arts") || normalizedInput.includes("humanities")) {
    return `Arts/Humanities Stream Complete Guide:\n\n1. Education Pathway:\n   • 11th-12th: Arts/Humanities stream\n     - Core subjects: History, Political Science, Geography, Sociology\n     - Additional options: Psychology, Economics, Languages, Fine Arts\n     - Duration: 2 years\n   • Undergraduate programs:\n     - BA (Bachelor of Arts): 3 years\n       * General BA: Multiple subjects\n       * BA (Hons): Specialization in one subject\n     - BFA (Fine Arts): 3-4 years (for artistic pursuits)\n     - Design-related degrees: 4 years\n     - Language/Literature degrees: 3 years\n     - Fees: ₹10K-1L/year (government), ₹1L-5L/year (private)\n   • Specialized Arts Programs:\n     - Fashion Design: 3-4 years, ₹2L-8L/year\n     - Interior Design: 3-4 years, ₹1.5L-6L/year\n     - Animation & Multimedia: 3 years, ₹1.5L-5L/year\n     - Film Studies: 3 years, ₹2L-8L/year\n\n2. Popular Career Paths & Prospects:\n   • Civil Services (IAS, IPS, etc.)\n     - Preparation: 1-3 years post-graduation\n     - Salary: ₹50K-2L/month + perks\n     - Job security, prestige, impact-oriented work\n   • Law (after BA + LLB)\n     - Duration: 3 years (after graduation) or 5-year integrated\n     - Career paths: Litigation, Corporate law, Legal services\n     - Earnings: ₹3L-20L/year (early career), higher with experience\n   • Media & Journalism\n     - Roles: Reporter, Editor, Content Creator, Producer\n     - Earnings: ₹3L-12L/year (early career)\n     - Digital media creating more opportunities\n   • Teaching & Education\n     - School teaching: Requires B.Ed (₹3.6L-7L/year)\n     - College/University: Requires NET/PhD (₹6L-15L/year)\n     - Educational administration & management\n   • Psychology & Counseling\n     - Clinical Psychologist (M.Phil required): ₹4L-15L/year\n     - School Counselor: ₹3L-8L/year\n     - Industrial Psychologist: ₹5L-15L/year\n   • Creative Fields\n     - Content Writing: ₹2.5L-8L/year\n     - Digital Marketing: ₹3L-12L/year\n     - Graphic Design: ₹3L-10L/year\n     - Social Media Management: ₹3L-9L/year\n\n3. Entrance Exams & Competitions:\n   • UPSC Civil Services Examination\n   • CLAT (for law programs)\n   • NET/JRF (for lectureship/research)\n   • Entrance tests for premier arts institutions\n     - NID (design), NIFT (fashion), FTII (film)\n     - IIMC, XIC, ACJ (journalism/mass communication)\n   • State-level B.Ed entrance exams\n\n4. Skills to Develop:\n   • Communication (written & verbal)\n   • Critical thinking & analytical ability\n   • Research methodology\n   • Digital proficiency (relevant software)\n   • Language proficiency (Indian & foreign)\n   • Creativity & problem-solving\n   • Project management & organization\n\n5. Emerging Career Options:\n   • Heritage Conservation & Management\n   • Art Therapy & Creative Therapies\n   • Digital Humanities Research\n   • Content Strategy & UX Writing\n   • Cultural Tourism & Sustainable Development\n   • NGO Management & Social Entrepreneurship\n\nWhich specific aspect of arts/humanities education or careers would you like me to expand on?`;
  }

  // If no specific match, return a general helpful response
  return "I'm here to provide information about different career paths after 10th grade. You can ask me about specific streams like Engineering (MPC), Medical (BiPC), Commerce, or Arts/Humanities. I can also provide details about entrance exams, course options, or job opportunities in these fields. What specific information would you like to know?";
};

// Rest of the Chatbot component implementation
const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Generate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(newMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      toast.success("New response from CareerBot!");
    }, 1000); // Simulating response delay
    
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSampleQuestion = (question: string) => {
    setNewMessage(question);
    // Focus the input field
    const textareaElement = document.getElementById('chat-input') as HTMLTextAreaElement;
    if (textareaElement) {
      textareaElement.focus();
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Ask CareerBot</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main chat section */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            {/* Message display area */}
            <CardContent className="flex-grow overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={cn(
                      "flex gap-3 p-4 rounded-lg",
                      message.sender === "user" ? "bg-secondary ml-auto max-w-[80%]" : "bg-muted mr-auto max-w-[80%]"
                    )}
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {message.sender === "user" ? <User size={16} /> : <Sparkles size={16} />}
                    </div>
                    <div>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            
            {/* Input area */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea 
                  id="chat-input"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your career question here..."
                  className="flex-grow min-h-[60px] resize-none"
                />
                <Button onClick={handleSendMessage} className="self-end">
                  <SendHorizonal className="h-4 w-4 mr-1" /> Send
                </Button>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Sidebar with sample questions and tips */}
        <div>
          <Card>
            <CardContent className="p-4">
              <div className="mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                  <BookCheck className="h-5 w-5" /> Popular Questions
                </h3>
                <div className="space-y-2">
                  {sampleQuestions.map((question, index) => (
                    <Button 
                      key={index} 
                      variant="secondary" 
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => handleSampleQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                  <AlertCircle className="h-5 w-5" /> Pro Tips
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2 items-start">
                    <School className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> 
                    <span>Ask about specific streams like Engineering, Medical, Commerce, or Arts after 10th</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <BookOpen className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> 
                    <span>Get information on entrance exams, eligibility, and preparation strategies</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <GraduationCap className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> 
                    <span>Learn about top colleges, course fees, and admission processes</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Briefcase className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> 
                    <span>Explore career options, salary expectations, and growth paths</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
