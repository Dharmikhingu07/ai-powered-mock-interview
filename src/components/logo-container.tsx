import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export const LogoContainer = () => {
  return (
    <Link to={"/"} className="flex items-center gap-2 group">
      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-primary shadow-button group-hover:shadow-button-hover transition-all duration-200 group-hover:scale-105">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-base font-bold tracking-tight text-foreground">
          InterviewAI
        </span>
        <span className="text-[10px] font-medium text-muted-foreground tracking-wider uppercase">
          Mock Platform
        </span>
      </div>
    </Link>
  );
};
