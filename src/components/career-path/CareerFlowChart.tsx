
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { RouteIcon } from "lucide-react";

const CareerFlowChart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg bg-white hover:bg-gray-50 border-2 border-brand-blue-200"
        >
          <RouteIcon className="h-6 w-6 text-brand-blue-500" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[90%] sm:w-[600px]">
        <div className="space-y-6 pt-6">
          <SheetTitle className="text-2xl font-bold tracking-tight text-brand-blue-700">Career Path Flow Chart</SheetTitle>
          <p className="text-muted-foreground">Comprehensive guide to educational and career paths after 10th standard</p>
          
          <div className="bg-white p-4 rounded-lg border shadow-sm overflow-x-auto">
            <div className="min-w-[500px] space-y-6">
              {/* Level 1: 10th Standard */}
              <div className="flex flex-col items-center">
                <div className="bg-brand-blue-500 text-white px-4 py-2 rounded-lg font-medium">
                  10th Standard
                </div>
              </div>

              {/* Arrows */}
              <div className="flex justify-center">
                <div className="h-8 w-0.5 bg-gray-300"></div>
              </div>

              {/* Level 2: Main Streams */}
              <div className="grid grid-cols-4 gap-6">
                {["Science", "Commerce", "Arts/Humanities", "Vocational"].map((stream) => (
                  <div key={stream} className="flex flex-col items-center">
                    <div className="bg-brand-orange-100 text-brand-orange-700 px-4 py-2 rounded-lg font-medium text-sm">
                      {stream}
                    </div>
                  </div>
                ))}
              </div>

              {/* Arrows */}
              <div className="grid grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-center">
                    <div className="h-8 w-0.5 bg-gray-300"></div>
                  </div>
                ))}
              </div>

              {/* Level 3: Detailed Career Options */}
              <div className="grid grid-cols-4 gap-4">
                {/* Science Paths */}
                <div className="space-y-2">
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">Engineering (B.Tech/BE)</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">Medical (MBBS/BDS)</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">Pharmacy (B.Pharm)</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">Pure Sciences (BSc)</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">Architecture (B.Arch)</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">Agriculture (B.Sc Ag)</div>
                </div>

                {/* Commerce Paths */}
                <div className="space-y-2">
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">B.Com</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">BBA</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">CA/CS/CMA</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">Economics (BA/BSc)</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">Banking/Finance</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">Business Analytics</div>
                </div>

                {/* Arts/Humanities Paths */}
                <div className="space-y-2">
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">BA (Liberal Arts)</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">Law (LLB)</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">Mass Comm. (BMM)</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">Psychology</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">Design (B.Des)</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">Hotel Management</div>
                </div>

                {/* Vocational Paths */}
                <div className="space-y-2">
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">Polytechnic Diploma</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">ITI Courses</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">Paramedical</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">Animation/VFX</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">Beauty & Wellness</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-xs">Digital Marketing</div>
                </div>
              </div>

              {/* Higher Education Note */}
              <div className="mt-6 p-3 bg-brand-blue-50 rounded-lg">
                <p className="text-xs text-brand-blue-700">
                  After completing these courses, students can pursue higher education through:
                  <br />• Master's Degrees (M.Tech, MBA, MA, MSc, etc.)
                  <br />• Professional Certifications
                  <br />• Research Programs (Ph.D)
                  <br />• Specialized Training
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CareerFlowChart;
