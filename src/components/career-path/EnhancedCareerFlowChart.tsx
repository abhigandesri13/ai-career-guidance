
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

// Create flow chart data based on the provided image
const after10thData: FlowNode[] = [
  {
    id: "intermediate",
    title: "Intermediate",
    type: "path",
    icon: <School className="h-5 w-5 text-purple-600" />,
    children: [
      {
        id: "mpc",
        title: "MPC",
        description: "Mathematics, Physics, Chemistry",
        type: "education",
        children: [
          {
            id: "be-btech",
            title: "B.E./B.Tech",
            type: "education",
            items: ["CSE", "IT", "ECE", "CIVIL", "MECHANICAL", "CHEMICAL"],
            children: [
              {
                id: "engineering-jobs",
                title: "Jobs",
                type: "job",
                items: [
                  "Civils", "Groups", "IES", "IFS", "Defence",
                  "Railways", "Banks", "AEE", "PSUs", "IT",
                  "Pharma Cement", "Automobile", "Real Estates", "Metals", "Power"
                ]
              },
              {
                id: "engineering-higher-ed",
                title: "Higher Education",
                type: "education",
                items: ["M.Tech", "MBA", "M.S", "Fashion", "Foreign Education", "Ph.D"]
              }
            ]
          },
          {
            id: "b-arch",
            title: "B.Arch",
            type: "education"
          },
          {
            id: "m-arch",
            title: "M.Arch",
            type: "education"
          }
        ]
      },
      {
        id: "bipc",
        title: "BiPC",
        description: "Biology, Physics, Chemistry",
        type: "education",
        children: [
          {
            id: "medical",
            title: "Medical",
            type: "education",
            items: ["MBBS", "BAMS (Ayurveda)", "BHMS (Homeopathy)", "BUMS (Unani)"]
          },
          {
            id: "science",
            title: "Science",
            type: "education",
            items: ["B.Sc Chemistry", "B.Sc Botany", "B.Sc Zoology", "B.Sc Physics", "B.Sc Life Science", "B.Sc Microbiology", "B.Sc Biotechnology"]
          },
          {
            id: "naturopathy",
            title: "Alternative Medicine",
            type: "education",
            items: ["BNYS (Bachelor of Naturopathy & Yogic Science)", "BVSc", "BPT (Bachelor of Physiotherapy)"]
          },
          {
            id: "allied",
            title: "Allied Programs",
            type: "education",
            items: ["B.Sc Home Science", "BPharm", "BTech Biotechnology"]
          },
          {
            id: "therapy",
            title: "Therapy & Nursing",
            type: "education",
            items: ["BOT (Occupational Therapy)", "BPO (Prosthetics & Orthotics)", "B.Sc Nursing", "BASLP (Speech Language Pathology)", "Bachelor of Medical Laboratory Technology"]
          },
          {
            id: "integrated",
            title: "Integrated Programs",
            type: "education",
            items: ["Integrated M.Sc Biological Sciences at IISER, CBS"]
          }
        ]
      },
      {
        id: "cec",
        title: "CEC",
        description: "Commerce, Economics, Civics",
        type: "education"
      },
      {
        id: "mec",
        title: "MEC",
        description: "Maths, Economics, Commerce",
        type: "education"
      },
      {
        id: "hec",
        title: "HEC",
        description: "Home Science, Economics, Commerce",
        type: "education"
      }
    ]
  },
  {
    id: "vocational",
    title: "Vocational",
    type: "path",
    icon: <BookOpen className="h-5 w-5 text-orange-600" />,
    items: [
      "Air Ticketing", 
      "Fashion Technology", 
      "Apparel Technology", 
      "Jewellery Technology", 
      "Agriculture", 
      "Interior designing", 
      "Hotel Management"
    ]
  },
  {
    id: "iti",
    title: "ITI",
    type: "path",
    icon: <FileText className="h-5 w-5 text-blue-600" />,
    items: [
      "Diploma in Automobile", 
      "Diploma in Draughtsmen", 
      "Diploma in Electrician", 
      "Diploma in Mechanical", 
      "Diploma in Mechanic Diesel", 
      "Diploma in Architect Asst."
    ]
  },
  {
    id: "polytechnic",
    title: "Polytechnic",
    type: "path",
    icon: <GraduationCap className="h-5 w-5 text-green-600" />,
    items: [
      "Diploma in Automobile Engineering",
      "Diploma in Aeronautical Engg",
      "Diploma in Agricultural Engg",
      "Diploma in Apparel Engg",
      "Diploma in Designing",
      "Diploma in Bio Medical",
      "Diploma in Business Administration",
      "Diploma in Architects",
      "Diploma in Fashion Technology"
    ]
  },
  {
    id: "paramedical",
    title: "Para Medical",
    type: "path",
    icon: <Briefcase className="h-5 w-5 text-red-600" />,
    items: [
      "Diploma in Operational theatre",
      "Diploma in Medical Laboratory",
      "Diploma in Physiotherapy",
      "Diploma in Nursing asst",
      "Diploma in Electro Cardio Graphy",
      "Diploma in Radiology",
      "Diploma in Optometry",
      "Diploma in Dialysis tech"
    ]
  }
];

// Full data object containing all our flow charts
const flowChartData = {
  "after-10th": {
    title: "After 10th Class",
    rootNodes: after10thData
  },
  "after-12th": {
    title: "After 12th Class",
    rootNodes: [
      {
        id: "science-paths",
        title: "Science Stream",
        type: "path",
        children: [/* ...data... */]
      },
      // Add more paths based on the images...
    ]
  },
  "default": {
    title: "Career Progression Path",
    rootNodes: after10thData
  }
};

// FlowNode component to render a single node in the flow chart
const FlowNodeComponent = ({ node, level = 0 }: { node: FlowNode; level?: number }) => {
  const [expanded, setExpanded] = useState(level < 1); // Auto-expand first level
  
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

interface EnhancedCareerFlowChartProps {
  pathType?: string;
}

const EnhancedCareerFlowChart: React.FC<EnhancedCareerFlowChartProps> = ({ pathType = "default" }) => {
  // Get the appropriate data for the specified path type
  const data = flowChartData[pathType as keyof typeof flowChartData] || flowChartData.default;
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">{data.title}</h3>
      <div className="space-y-3">
        {data.rootNodes.map((node) => (
          <FlowNodeComponent key={node.id} node={node} />
        ))}
      </div>
      <div className="text-xs text-center mt-6 text-muted-foreground">
        <p>This career flow chart shows possible education paths and career opportunities.</p>
        <p>Click on a box to expand/collapse details.</p>
      </div>
    </Card>
  );
};

export default EnhancedCareerFlowChart;
