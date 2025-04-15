
import { BookOpen, BookCheck, Search, Home, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2 mr-6">
          <BookCheck className="h-6 w-6 text-brand-blue-500" />
          <span className="font-bold text-xl hidden md:inline text-brand-blue-500">CareerCompass</span>
        </Link>
        <nav className="flex items-center justify-between flex-1 gap-6">
          <div className="flex gap-1 sm:gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/" className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/career-paths" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Career Paths</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/assessment" className="flex items-center gap-1">
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Find Your Path</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/chatbot" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Ask CareerBot</span>
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
