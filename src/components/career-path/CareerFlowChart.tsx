
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
          <h2 className="text-2xl font-bold tracking-tight text-brand-blue-700">Career Path Flow Chart</h2>
          <p className="text-muted-foreground">Explore possible career paths after 10th standard</p>
          
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
              <div className="grid grid-cols-3 gap-8">
                {["Science", "Commerce", "Arts/Humanities"].map((stream) => (
                  <div key={stream} className="flex flex-col items-center">
                    <div className="bg-brand-orange-100 text-brand-orange-700 px-4 py-2 rounded-lg font-medium">
                      {stream}
                    </div>
                  </div>
                ))}
              </div>

              {/* Arrows */}
              <div className="grid grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-center">
                    <div className="h-8 w-0.5 bg-gray-300"></div>
                  </div>
                ))}
              </div>

              {/* Level 3: Career Options */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-sm">Engineering</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-sm">Medical</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-sm">Research</div>
                </div>
                <div className="space-y-2">
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-sm">CA/CS</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-sm">Business</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-sm">Banking</div>
                </div>
                <div className="space-y-2">
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-sm">Law</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-sm">Design</div>
                  <div className="bg-brand-blue-50 text-brand-blue-700 px-3 py-2 rounded-lg text-sm">Media</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CareerFlowChart;
