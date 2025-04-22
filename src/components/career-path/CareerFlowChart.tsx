
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
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg bg-white hover:bg-gray-50 border-2 border-purple-200"
        >
          <RouteIcon className="h-6 w-6 text-purple-500" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[90%] sm:w-[600px]">
        <div className="space-y-6 pt-6">
          <SheetTitle className="text-2xl font-bold tracking-tight text-purple-700">Career Path Flow Chart</SheetTitle>
          <p className="text-muted-foreground">Educational paths and opportunities after 10th standard</p>
          
          <div className="bg-white p-4 rounded-lg border shadow-sm overflow-x-auto">
            <div className="min-w-[500px] space-y-6">
              {/* Level 1: 10th Standard */}
              <div className="flex flex-col items-center">
                <div className="bg-purple-500 text-white px-4 py-2 rounded-lg font-medium">
                  10th Standard
                </div>
              </div>

              {/* Arrows */}
              <div className="flex justify-center gap-32">
                <div className="h-8 w-0.5 bg-gray-300 transform -rotate-45"></div>
                <div className="h-8 w-0.5 bg-gray-300 transform rotate-45"></div>
              </div>

              {/* Level 2: Main Paths */}
              <div className="grid grid-cols-2 gap-32">
                <div className="flex flex-col items-center">
                  <div className="bg-pink-100 text-pink-700 px-4 py-2 rounded-lg font-medium text-sm">
                    Intermediate (2 years)
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium text-sm">
                    Polytechnic (3 years)
                  </div>
                </div>
              </div>

              {/* Arrows */}
              <div className="grid grid-cols-2 gap-32">
                <div className="flex justify-center">
                  <div className="h-8 w-0.5 bg-gray-300"></div>
                </div>
                <div className="flex justify-center">
                  <div className="h-8 w-0.5 bg-gray-300"></div>
                </div>
              </div>

              {/* Level 3: Intermediate Groups */}
              <div className="grid grid-cols-2 gap-32">
                <div className="space-y-2">
                  <div className="bg-pink-50 text-pink-700 px-3 py-2 rounded-lg text-xs">MPC (Mathematics, Physics, Chemistry)</div>
                  <div className="bg-pink-50 text-pink-700 px-3 py-2 rounded-lg text-xs">BiPC (Biology, Physics, Chemistry)</div>
                  <div className="bg-pink-50 text-pink-700 px-3 py-2 rounded-lg text-xs">CEC (Commerce, Economics, Civics)</div>
                  <div className="bg-pink-50 text-pink-700 px-3 py-2 rounded-lg text-xs">HEC (History, Economics, Civics)</div>
                </div>
                <div className="space-y-2">
                  <div className="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg text-xs">Civil Engineering</div>
                  <div className="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg text-xs">Mechanical Engineering</div>
                  <div className="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg text-xs">ECE (Electronics & Communication)</div>
                  <div className="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg text-xs">Computer Science Engineering</div>
                </div>
              </div>

              {/* Arrows */}
              <div className="grid grid-cols-2 gap-32">
                <div className="flex justify-center">
                  <div className="h-8 w-0.5 bg-gray-300"></div>
                </div>
                <div className="flex justify-center">
                  <div className="h-8 w-0.5 bg-gray-300"></div>
                </div>
              </div>

              {/* Level 4: Degree Options */}
              <div className="grid grid-cols-2 gap-32">
                <div className="space-y-2">
                  <div className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-xs font-medium">Bachelor's Degrees (4 years)</div>
                  <div className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-xs">B.Tech/BE - Engineering</div>
                  <div className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-xs">MBBS - Medical</div>
                  <div className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-xs">B.Com - Commerce</div>
                  <div className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-xs">BA - Arts</div>
                  <div className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-xs">BSc - Science</div>
                  <div className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-xs">BBA - Business</div>
                </div>
                <div className="space-y-2">
                  <div className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-xs font-medium">Career Options</div>
                  <div className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-xs">Direct B.Tech Admission</div>
                  <div className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-xs">Industry Jobs</div>
                  <div className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-xs">Government Jobs</div>
                  <div className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-xs">Entrepreneurship</div>
                </div>
              </div>

              {/* Higher Education Note */}
              <div className="mt-6 p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-purple-700">
                  After Bachelor's degree, students can pursue:
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
