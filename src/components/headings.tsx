import { cn } from "@/lib/utils";

interface HeadingsProps {
  title: string;
  description?: string;
  isSubHeading?: boolean;
}

export const Headings = ({
  title,
  description,
  isSubHeading = false,
}: HeadingsProps) => {
  return (
    <div className="space-y-1.5">
      <h2
        className={cn(
          "text-2xl md:text-3xl font-bold tracking-tight text-foreground",
          isSubHeading && "text-lg md:text-xl font-semibold"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
