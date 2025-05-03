
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FindPathCTA = () => {
  return (
    <div className="bg-brand-blue-50 rounded-lg p-6 md:p-8 mt-12 text-center">
      <h2 className="text-2xl font-semibold mb-3 text-brand-blue-700">Not Sure Which Path Is Right For You?</h2>
      <p className="text-muted-foreground mb-6">
        Take our assessment to get personalized career recommendations based on your interests and aptitude.
      </p>
      <Button asChild size="lg" className="bg-brand-blue-500 hover:bg-brand-blue-600">
        <Link to="/assessment">Find Your Perfect Career Path</Link>
      </Button>
    </div>
  );
};

export default FindPathCTA;
