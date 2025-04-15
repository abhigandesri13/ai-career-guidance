
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CircleDollarSign, BookCheck } from "lucide-react";

interface OverviewCardsProps {
  timeline: string;
  jobProspects: string;
  entryRequirements: string;
}

const OverviewCards = ({ timeline, jobProspects, entryRequirements }: OverviewCardsProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardContent className="p-4 flex items-start gap-4">
          <div className="rounded-full bg-brand-blue-100 p-3 flex-shrink-0">
            <Clock className="h-5 w-5 text-brand-blue-500" />
          </div>
          <div>
            <h3 className="font-medium">Timeline</h3>
            <p className="text-sm text-muted-foreground">{timeline}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex items-start gap-4">
          <div className="rounded-full bg-brand-blue-100 p-3 flex-shrink-0">
            <CircleDollarSign className="h-5 w-5 text-brand-blue-500" />
          </div>
          <div>
            <h3 className="font-medium">Job Prospects</h3>
            <p className="text-sm text-muted-foreground">{jobProspects}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex items-start gap-4">
          <div className="rounded-full bg-brand-blue-100 p-3 flex-shrink-0">
            <BookCheck className="h-5 w-5 text-brand-blue-500" />
          </div>
          <div>
            <h3 className="font-medium">Entry Requirements</h3>
            <p className="text-sm text-muted-foreground">{entryRequirements}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewCards;
