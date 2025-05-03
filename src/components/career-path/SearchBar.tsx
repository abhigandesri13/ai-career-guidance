
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <div className="flex w-full max-w-xl mx-auto mb-10 items-center space-x-2">
      <Input
        type="search"
        placeholder="Search career paths..."
        className="flex-1"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button type="submit" className="bg-brand-blue-500 hover:bg-brand-blue-600">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchBar;
