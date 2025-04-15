
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AssessmentCTA = () => {
  return (
    <div className="bg-brand-blue-50 rounded-lg p-6 md:p-8 mt-12 text-center">
      <h2 className="text-2xl font-semibold mb-3 text-brand-blue-700">Still Exploring Your Options?</h2>
      <p className="text-muted-foreground mb-6">
        Take our assessment to discover more career paths that match your interests and aptitudes.
      </p>
      <Button asChild size="lg" className="bg-brand-blue-500 hover:bg-brand-blue-600">
        <Link to="/assessment">Find Your Perfect Career Path</Link>
      </Button>
    </div>
  );
};

export default AssessmentCTA;
