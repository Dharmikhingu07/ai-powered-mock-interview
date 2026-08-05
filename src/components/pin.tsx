import { Interview } from "@/types";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./tooltip-button";
import { Eye, Newspaper, Sparkles, Calendar } from "lucide-react";

interface InterviewPinProps {
  interview: Interview;
  onMockPage?: boolean;
}

export const InterviewPin = ({
  interview,
  onMockPage = false,
}: InterviewPinProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-6 space-y-5 cursor-pointer group !hover:!shadow-card-hover">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg md:text-xl !leading-snug line-clamp-2">
            {interview?.position}
          </CardTitle>
          <Badge variant="outline" className="shrink-0">
            {interview?.experience} yrs
          </Badge>
        </div>
        <CardDescription className="line-clamp-2 leading-relaxed">
          {interview?.description}
        </CardDescription>
      </div>

      <div className="w-full flex items-center gap-2 flex-wrap">
        {interview?.techStack.split(",").map((word, index) => (
          <Badge
            key={index}
            variant="default"
            className="text-xs"
          >
            {word.trim()}
          </Badge>
        ))}
      </div>

      <CardFooter
        className={cn(
          "w-full flex items-center p-0 gap-3 pt-2",
          onMockPage ? "justify-end" : "justify-between flex-wrap"
        )}
      >
        {!onMockPage && (
          <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span className="truncate whitespace-nowrap">
              {`${new Date(interview?.createdAt.toDate()).toLocaleDateString(
                "en-US",
                { dateStyle: "medium" }
              )}`}
            </span>
          </div>
        )}

        {!onMockPage && (
          <div className="flex items-center justify-center -mr-1">
            <TooltipButton
              content="Edit"
              buttonVariant="ghost"
              onClick={() => {
                navigate(`/generate/${interview?.id}`, { replace: true });
              }}
              disbaled={false}
              buttonClassName="hover:text-primary"
              icon={<Eye className="w-4 h-4" />}
              loading={false}
            />

            <TooltipButton
              content="Feedback"
              buttonVariant="ghost"
              onClick={() => {
                navigate(`/generate/feedback/${interview?.id}`, {
                  replace: true,
                });
              }}
              disbaled={false}
              buttonClassName="hover:text-warning"
              icon={<Newspaper className="w-4 h-4" />}
              loading={false}
            />

            <TooltipButton
              content="Start"
              buttonVariant="ghost"
              onClick={() => {
                navigate(`/generate/interview/${interview?.id}`, {
                  replace: true,
                });
              }}
              disbaled={false}
              buttonClassName="hover:text-success group-hover:!text-primary"
              icon={<Sparkles className="w-4 h-4" />}
              loading={false}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
