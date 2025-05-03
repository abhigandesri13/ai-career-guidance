
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  ChevronDown, 
  ChevronRight, 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  FileText, 
  School
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PageHeader from "./PageHeader";

// Define the types for our flow chart data
interface FlowNode {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: FlowNode[];
  type?: 'education' | 'exam' | 'job' | 'path';
  items?: string[];
}

// Create detailed flow chart data based on the provided image
const mpcData: FlowNode[] = [
  {
    id: "m-pc",
    title: "M.P.C",
    description: "Mathematics, Physics, Chemistry",
    type: "path",
    icon: <School className="h-5 w-5 text-purple-600" />,
    children: [
      {
        id: "entrance-tests",
        title: "ENTRANCE TESTS",
        type: "exam",
        items: ["IIT-JEE", "AIEEE", "BITSAT", "EAMCET"]
      },
      {
        id: "be-btech",
        title: "B.E./B.Tech",
        type: "education",
        items: ["CSE", "IT", "ECE", "CIVIL", "MECHANICAL", "CHEMICAL"],
        children: [
          {
            id: "jobs",
            title: "JOBS",
            type: "job",
            items: [
              "Civils", "Groups", "IES", "IFS", "Defence",
              "Railways", "Banks", "AEE", "PSUs", "IT",
              "Pharma Cement", "Automobile", "Real Estates", "Metals", "Power"
            ]
          },
          {
            id: "higher-education",
            title: "HIGHER EDUCATION",
            type: "education",
            items: ["M.Tech", "MBA", "M.S", "Fashion", "Foreign Education", "Ph.D"]
          }
        ]
      },
      {
        id: "b-arch",
        title: "B.ARCH.",
        type: "education"
      },
      {
        id: "m-arch",
        title: "M.ARCH.",
        type: "education"
      }
    ]
  }
];

const mpcBscData: FlowNode[] = [
  {
    id: "m-pc-bsc",
    title: "M.P.C",
    description: "Mathematics, Physics, Chemistry",
    type: "path",
    icon: <School className="h-5 w-5 text-purple-600" />,
    children: [
      {
        id: "bsc",
        title: "B.Sc.",
        type: "education",
        items: [
          "Maths, Physics, Chemistry",
          "Maths, Physics, Comp. Science",
          "Maths, Electronics, Comp. Science",
          "Maths, Stats, Comp. Science"
        ],
        children: [
          {
            id: "jobs-bsc",
            title: "JOBS",
            type: "job",
            items: [
              "Civils", "Groups", "IES", "IFS", "Defence",
              "Railways", "Banks", "Computers", "Retail", "Media", "Entertainment"
            ]
          },
          {
            id: "higher-education-bsc",
            title: "HIGHER EDUCATION",
            type: "education",
            items: ["M.Sc", "MBA", "MCA", "B.Ed", "Fashion", "Mass Communication", "Animation"]
          },
          {
            id: "integrated-msc",
            title: "Integrated M.Sc.",
            type: "education"
          },
          {
            id: "phd-bsc",
            title: "Ph.D",
            type: "education"
          }
        ]
      }
    ]
  }
];

const mecCecData: FlowNode[] = [
  {
    id: "mec-cec",
    title: "MEC & CEC",
    description: "Mathematics/Commerce, Economics, Commerce/Civics",
    type: "path",
    icon: <School className="h-5 w-5 text-green-600" />,
    children: [
      {
        id: "mec-section",
        title: "MEC",
        type: "education",
        children: [
          {
            id: "mec-bcom",
            title: "B.Com",
            type: "education",
            children: [
              {
                id: "mec-bcom-courses",
                title: "Higher Studies",
                type: "education",
                items: ["MBA", "MCA", "M.Com"]
              }
            ]
          },
          {
            id: "mec-bsc",
            title: "B.Sc",
            type: "education",
            children: [
              {
                id: "mec-bsc-courses",
                title: "Higher Studies",
                type: "education",
                items: ["M.Sc", "MCA", "MBA"]
              }
            ]
          },
          {
            id: "mec-professional",
            title: "Professional Courses",
            type: "education",
            items: ["CA", "ICWA", "CS"]
          }
        ]
      },
      {
        id: "cec-section",
        title: "CEC",
        type: "education",
        children: [
          {
            id: "cec-bcom",
            title: "B.Com",
            type: "education",
            children: [
              {
                id: "cec-bcom-courses",
                title: "Higher Studies",
                type: "education",
                items: ["MBA", "MCA", "M.Com"]
              }
            ]
          },
          {
            id: "cec-professional",
            title: "Professional Courses",
            type: "education",
            items: ["CA", "ICWA", "CS"]
          }
        ]
      }
    ]
  }
];

const intermediateData: FlowNode[] = [
  {
    id: "after-intermediate",
    title: "After Intermediate in any discipline",
    type: "path",
    icon: <School className="h-5 w-5 text-blue-600" />,
    children: [
      {
        id: "fine-arts",
        title: "Bachelor of fine Arts/Applied Art, Bachelor",
        type: "education"
      },
      {
        id: "interior-design",
        title: "Interior Design/Fashion Design/Jewellery Design",
        type: "education"
      },
      {
        id: "animation",
        title: "Animator, Graphic Designer, Art Designers",
        type: "education"
      },
      {
        id: "interior-fashion",
        title: "Interior Design/Fashion Designer",
        type: "education"
      },
      {
        id: "fashion-tech",
        title: "Fashion Technology",
        type: "education"
      },
      {
        id: "llb",
        title: "LL.B",
        type: "education",
        children: [
          {
            id: "llm",
            title: "LL.M",
            type: "education",
            children: [
              {
                id: "phd-law",
                title: "Ph.D",
                type: "education"
              }
            ]
          }
        ]
      }
    ]
  }
];

// Full data object containing all our flow charts
const detailedFlowChartData = {
  "mpc": mpcData,
  "mpc-bsc": mpcBscData,
  "mec-cec": mecCecData,
  "intermediate": intermediateData,
  "all": [...mpcData, ...mpcBscData, ...mecCecData, ...intermediateData]
};

// FlowNode component to render a single node in the flow chart
const FlowNodeComponent = ({ node, level = 0 }: { node: FlowNode; level?: number }) => {
  const [expanded, setExpanded] = useState(level < 2); // Auto-expand first two levels
  
  // Background color based on node type
  const getBgColor = () => {
    switch (node.type) {
      case 'education': return 'bg-blue-50 border-blue-200';
      case 'exam': return 'bg-purple-50 border-purple-200';
      case 'job': return 'bg-green-50 border-green-200';
      case 'path': return 'bg-orange-50 border-orange-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };
  
  // Text color based on node type
  const getTextColor = () => {
    switch (node.type) {
      case 'education': return 'text-blue-700';
      case 'exam': return 'text-purple-700';
      case 'job': return 'text-green-700';
      case 'path': return 'text-orange-700';
      default: return 'text-gray-700';
    }
  };
  
  // Decides whether to show expand/collapse controls
  const hasChildren = node.children && node.children.length > 0;
  const hasItems = node.items && node.items.length > 0;
  
  return (
    <div className="mb-3">
      <div 
        className={cn(
          "border rounded-lg p-3 transition-all", 
          getBgColor(),
          hasChildren && "cursor-pointer hover:shadow-sm"
        )}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {node.icon && <div className="flex-shrink-0">{node.icon}</div>}
            <div>
              <h4 className={cn("font-medium", getTextColor())}>{node.title}</h4>
              {node.description && (
                <p className="text-sm text-muted-foreground">{node.description}</p>
              )}
            </div>
          </div>
          {hasChildren && (
            <div className="flex-shrink-0">
              {expanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          )}
        </div>
        
        {hasItems && expanded && (
          <div className="mt-3 flex flex-wrap gap-1">
            {node.items.map((item, index) => (
              <Badge key={index} variant="outline" className="bg-white">
                {item}
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      {hasChildren && expanded && (
        <div className={cn("pl-4 mt-2 border-l-2", `border-l-${getTextColor().split('-')[1]}-300`)}>
          {node.children.map((child) => (
            <FlowNodeComponent key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

interface DetailedCareerFlowChartProps {
  pathType?: string;
}

const DetailedCareerFlowChart: React.FC<DetailedCareerFlowChartProps> = ({ 
  pathType = "all"
}) => {
  const [activeTab, setActiveTab] = useState<string>(pathType);
  
  // Get the appropriate data for the specified path type
  const getDataForType = (type: string) => {
    return detailedFlowChartData[type as keyof typeof detailedFlowChartData] || detailedFlowChartData.all;
  };
  
  return (
    <section className="py-12 bg-white">
      <div className="container px-4 md:px-6">
        <PageHeader 
          title="Detailed Career Path Flow Chart" 
          description="Explore all possible education and career paths after different academic stages"
        />
        
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <Badge 
            className={`px-4 py-2 cursor-pointer ${activeTab === "all" ? "bg-brand-blue-500 hover:bg-brand-blue-600" : "bg-gray-100 hover:bg-gray-200"}`}
            onClick={() => setActiveTab("all")}
          >
            All Paths
          </Badge>
          <Badge 
            className={`px-4 py-2 cursor-pointer ${activeTab === "mpc" ? "bg-brand-blue-500 hover:bg-brand-blue-600" : "bg-gray-100 hover:bg-gray-200"}`}
            onClick={() => setActiveTab("mpc")}
          >
            MPC → BE/BTech Path
          </Badge>
          <Badge 
            className={`px-4 py-2 cursor-pointer ${activeTab === "mpc-bsc" ? "bg-brand-blue-500 hover:bg-brand-blue-600" : "bg-gray-100 hover:bg-gray-200"}`}
            onClick={() => setActiveTab("mpc-bsc")}
          >
            MPC → BSc Path
          </Badge>
          <Badge 
            className={`px-4 py-2 cursor-pointer ${activeTab === "mec-cec" ? "bg-brand-blue-500 hover:bg-brand-blue-600" : "bg-gray-100 hover:bg-gray-200"}`}
            onClick={() => setActiveTab("mec-cec")}
          >
            MEC & CEC Path
          </Badge>
          <Badge 
            className={`px-4 py-2 cursor-pointer ${activeTab === "intermediate" ? "bg-brand-blue-500 hover:bg-brand-blue-600" : "bg-gray-100 hover:bg-gray-200"}`}
            onClick={() => setActiveTab("intermediate")}
          >
            After Intermediate
          </Badge>
        </div>
        
        <Card className="p-6">
          <div className="space-y-3">
            {getDataForType(activeTab).map((node) => (
              <FlowNodeComponent key={node.id} node={node} />
            ))}
          </div>
          <div className="text-xs text-center mt-6 text-muted-foreground">
            <p>This career flow chart shows possible education paths and career opportunities.</p>
            <p>Click on a box to expand/collapse details.</p>
          </div>
          
          <div className="mt-8 p-4 bg-brand-blue-50 rounded-lg">
            <h4 className="font-semibold text-lg text-brand-blue-700 mb-2">Key Points About Career Progression</h4>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Each education path leads to multiple career opportunities and further education options</li>
              <li>Consider your interests, aptitude, and long-term goals when choosing a stream after 10th standard</li>
              <li>Entrance exams are crucial for admission to top colleges in most professional courses</li>
              <li>Many careers require additional certifications or higher education to reach senior positions</li>
              <li>Interdisciplinary skills are increasingly valued in today's job market</li>
            </ul>
            
            <h4 className="font-semibold text-lg text-brand-blue-700 mt-4 mb-2">For More Information</h4>
            <p className="text-muted-foreground">
              Visit our detailed career path pages or use the CareerBot to get personalized guidance
              about specific courses, exams, and job opportunities.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default DetailedCareerFlowChart;
