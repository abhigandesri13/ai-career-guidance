
interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="space-y-4 text-center mb-8">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brand-blue-700">
        {title}
      </h1>
      <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default PageHeader;
