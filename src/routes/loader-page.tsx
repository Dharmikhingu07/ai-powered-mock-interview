import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

export const LoaderPage = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-full flex items-center justify-center bg-transparent z-50",
        className
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full border-2 border-primary/20"></div>
          <Loader className="w-10 h-10 min-w-10 min-h-10 animate-spin text-primary absolute top-0 left-0" />
        </div>
        <span className="text-sm text-muted-foreground font-medium">Loading...</span>
      </div>
    </div>
  );
};
