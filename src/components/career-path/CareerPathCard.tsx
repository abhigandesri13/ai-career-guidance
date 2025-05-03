
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface CareerPathCardProps {
  path: {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
  };
}

const CareerPathCard = ({ path }: CareerPathCardProps) => {
  return (
    <Link
      to={`/career-paths/${path.id}`}
      className="group bg-white rounded-lg border border-border/50 shadow-sm hover:shadow-md transition-all overflow-hidden"
    >
      <div className="aspect-video bg-brand-blue-100 flex items-center justify-center">
        <path.icon className="h-12 w-12 text-brand-blue-500" />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-xl group-hover:text-brand-blue-500">{path.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{path.description}</p>
      </div>
    </Link>
  );
};

export default CareerPathCard;
