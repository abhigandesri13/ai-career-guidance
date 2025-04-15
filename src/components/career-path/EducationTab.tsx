
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookCheck } from "lucide-react";

interface EducationTabProps {
  courseStructure: {
    duration: string;
    semesters: string;
    mainSubjects: string[];
  };
  feeStructure: {
    undergraduate: {
      government: {
        range: string;
        notes: string;
      };
      private: {
        range: string;
        notes: string;
      };
    };
  };
  entranceExams: Array<{
    name: string;
    description: string;
    level: string;
    timing: string;
    eligibility: string;
    freeShips: string;
  }>;
  scholarships: Array<{
    name: string;
    amount: string;
    eligibility: string;
    link: string;
  }>;
}

const EducationTab = ({ courseStructure, feeStructure, entranceExams, scholarships }: EducationTabProps) => {
  return (
    <div className="space-y-6">
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
                  <p className="font-medium mb-2">Duration: {courseStructure.duration}</p>
                  <p className="text-sm text-muted-foreground">
                    {courseStructure.semesters} with practical training and projects
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-medium mb-2">Core Subjects</p>
                  <ul className="text-sm text-muted-foreground list-disc pl-4">
                    {courseStructure.mainSubjects.slice(0, 4).map((subject, index) => (
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
                    {feeStructure.undergraduate.government.range}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {feeStructure.undergraduate.government.notes}
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Private Institutions</h4>
                  <p className="text-2xl font-semibold text-brand-blue-600 mb-2">
                    {feeStructure.undergraduate.private.range}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {feeStructure.undergraduate.private.notes}
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
            {entranceExams.map((exam, index) => (
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
                {scholarships.map((scholarship, index) => (
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
    </div>
  );
};

export default EducationTab;
