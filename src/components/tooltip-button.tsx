import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

type ButtonVariant =
  | "ghost"
  | "link"
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | null
  | undefined;

interface TooltipButtonProps {
  content: string;
  icon: React.ReactNode;
  onClick: () => void;
  buttonVariant?: ButtonVariant;
  buttonClassName?: string;
  delay?: number;
  disbaled?: boolean;
  loading?: boolean;
}

export const TooltipButton = ({
  content,
  icon,
  onClick,
  buttonVariant = "ghost",
  buttonClassName = "",
  delay = 200,
  disbaled = false,
  loading = false,
}: TooltipButtonProps) => {
  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip>
        <TooltipTrigger
          className={cn(disbaled ? "cursor-not-allowed" : "cursor-pointer")}
        >
          <Button
            size={"icon"}
            disabled={disbaled}
            variant={buttonVariant}
            className={cn(
              "hover:bg-muted hover:text-primary transition-all duration-200",
              buttonClassName
            )}
            onClick={onClick}
          >
            {loading ? (
              <Loader className="min-w-4 min-h-4 animate-spin text-primary" />
            ) : (
              icon
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="rounded-xl border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-card">
          <p>{loading ? "Loading..." : content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
