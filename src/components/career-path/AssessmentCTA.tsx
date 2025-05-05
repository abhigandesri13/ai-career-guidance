
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AssessmentCTA = () => {
  return (
    <div className="bg-gradient-to-br from-primary/10 to-accent rounded-lg p-6 md:p-8 mt-12 text-center shadow-sm border border-border/50">
      <h2 className="text-2xl font-semibold mb-3 text-foreground">Still Exploring Your Options?</h2>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Take our assessment to discover more career paths that match your interests and aptitudes.
        Get personalized recommendations based on your strengths and preferences.
      </p>
      <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-sm">
        <Link to="/assessment">Find Your Perfect Career Path</Link>
      </Button>
    </div>
  );
};

export default AssessmentCTA;
