
import CareerPathCard from "./CareerPathCard";

interface PathsGridProps {
  paths: any[];
  searchQuery: string;
}

const PathsGrid = ({ paths, searchQuery }: PathsGridProps) => {
  // Filter paths based on search query
  const filteredPaths = searchQuery
    ? paths.filter(path => 
        path.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        path.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : paths;

  if (filteredPaths.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No career paths found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredPaths.map((path, index) => (
        <CareerPathCard key={index} path={path} />
      ))}
    </div>
  );
};

export default PathsGrid;
