import { BookCheck } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookCheck className="h-6 w-6 text-brand-blue-500" />
              <span className="font-bold text-xl text-brand-blue-500">AI Career Guidance</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Guiding you to the right career path, from 10th standard to your dream job.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
              <li><Link to="/career-paths" className="text-muted-foreground hover:text-foreground">Career Paths</Link></li>
              <li><Link to="/assessment" className="text-muted-foreground hover:text-foreground">Find Your Path</Link></li>
              <li><Link to="/chatbot" className="text-muted-foreground hover:text-foreground">Ask CareerBot</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/career-paths/after-10th" className="text-muted-foreground hover:text-foreground">After 10th Options</Link></li>
              <li><Link to="/career-paths/after-12th" className="text-muted-foreground hover:text-foreground">After 12th Options</Link></li>
              <li><Link to="/career-paths/higher-education" className="text-muted-foreground hover:text-foreground">Higher Education</Link></li>
              <li><Link to="/career-paths/skills" className="text-muted-foreground hover:text-foreground">Skill Development</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Email: info@careercompass.com</li>
              <li className="text-muted-foreground">Phone: +91 1234567890</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CareerCompass. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;