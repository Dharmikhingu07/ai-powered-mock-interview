import { db } from "@/config/firebase.config";
import { Interview, UserAnswer } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { LoaderPage } from "./loader-page";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { Headings } from "@/components/headings";
import { InterviewPin } from "@/components/pin";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { CircleCheck, Star, CheckCircle2, AlertCircle, MessageSquare, TrendingUp } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Feedback = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState<UserAnswer[]>([]);
  const [activeFeed, setActiveFeed] = useState("");
  const { userId } = useAuth();
  const navigate = useNavigate();

  if (!interviewId) {
    navigate("/generate", { replace: true });
  }
  useEffect(() => {
    if (interviewId) {
      const fetchInterview = async () => {
        if (interviewId) {
          try {
            const interviewDoc = await getDoc(
              doc(db, "interviews", interviewId)
            );
            if (interviewDoc.exists()) {
              setInterview({
                id: interviewDoc.id,
                ...interviewDoc.data(),
              } as Interview);
            }
          } catch (error) {
            console.log(error);
          }
        }
      };

      const fetchFeedbacks = async () => {
        setIsLoading(true);
        try {
          const querSanpRef = query(
            collection(db, "userAnswers"),
            where("userId", "==", userId),
            where("mockIdRef", "==", interviewId)
          );

          const querySnap = await getDocs(querSanpRef);

          const interviewData: UserAnswer[] = querySnap.docs.map((doc) => {
            return { id: doc.id, ...doc.data() } as UserAnswer;
          });

          setFeedbacks(interviewData);
        } catch (error) {
          console.error("Error fetching feedbacks:", error);
          let errorDescription = "Failed to load feedback. Please try again later.";
          if (error instanceof Error) {
            const msg = error.message.toLowerCase();
            if (msg.includes("permission-denied") || msg.includes("permission denied")) {
              errorDescription = "Permission denied. Check Firestore security rules.";
            } else if (msg.includes("unavailable") || msg.includes("network")) {
              errorDescription = "Network error. Check your connection and try again.";
            } else {
              errorDescription = error.message;
            }
          }
          toast.error("Error", {
            description: errorDescription,
          });
        } finally {
          setIsLoading(false);
        }
      };
      fetchInterview();
      fetchFeedbacks();
    }
  }, [interviewId, navigate, userId]);

  const overAllRating = useMemo(() => {
    if (feedbacks.length === 0) return "0.0";

    const totalRatings = feedbacks.reduce(
      (acc, feedback) => acc + feedback.rating,
      0
    );

    return (totalRatings / feedbacks.length).toFixed(1);
  }, [feedbacks]);

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-success";
    if (rating >= 6) return "text-warning";
    return "text-error";
  };

  const getRatingBgColor = (rating: number) => {
    if (rating >= 8) return "bg-success/10";
    if (rating >= 6) return "bg-warning/10";
    return "bg-error/10";
  };

  if (isLoading) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  return (
    <div className="flex flex-col w-full gap-8 py-5">
      <div className="flex items-center justify-between w-full gap-2">
        <CustomBreadCrumb
          breadCrumbPage={"Feedback"}
          breadCrumpItems={[
            { label: "Mock Interviews", link: "/generate" },
            {
              label: `${interview?.position}`,
              link: `/generate/interview/${interview?.id}`,
            },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-2">
          <Headings
            title="Congratulations!"
            description="Your personalized feedback is now available. Dive in to see your strengths, areas for improvement, and tips to help you ace your next interview."
          />
        </div>
        <Card className="!hover:!shadow-card !cursor-default p-6 overflow-hidden !border-primary/20">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-primary shadow-button">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Overall Score
                </p>
                <p className="text-sm text-foreground font-semibold">
                  {feedbacks.length} Question{feedbacks.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-end gap-3 mb-3">
            <span className={cn(
              "text-5xl font-extrabold tracking-tight",
              getRatingColor(Number(overAllRating))
            )}>
              {overAllRating}
            </span>
            <span className="text-lg font-bold text-muted-foreground mb-1">
              / 10
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden mb-4">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-1000",
                Number(overAllRating) >= 8 ? "bg-success" :
                Number(overAllRating) >= 6 ? "bg-warning" : "bg-error"
              )}
              style={{ width: `${(Number(overAllRating) / 10) * 100}%` }}
            />
          </div>
          <Badge
            variant="default"
            className={cn(
              "w-full justify-center py-1.5",
              getRatingBgColor(Number(overAllRating))
            )}
          >
            {Number(overAllRating) >= 8 ? "Excellent Performance!" :
             Number(overAllRating) >= 6 ? "Good Job - Keep Improving" :
             Number(overAllRating) > 0 ? "Needs More Practice" : "No Ratings Yet"}
          </Badge>
        </Card>
      </div>

      {interview && <InterviewPin interview={interview} onMockPage />}

      <div className="flex items-center gap-3 pt-2">
        <Headings title="Detailed Feedback" isSubHeading />
        <Badge variant="outline" className="text-xs">
          {feedbacks.length} {feedbacks.length === 1 ? "Item" : "Items"}
        </Badge>
      </div>

      {feedbacks && feedbacks.length > 0 ? (
        <Accordion type="single" collapsible className="space-y-5">
          {feedbacks.map((feed, idx) => (
            <AccordionItem
              key={feed.id}
              value={feed.id}
            >
              <AccordionTrigger
                onClick={() => setActiveFeed(feed.id)}
                className={cn(
                  "!px-6 !py-5 text-left !no-underline",
                  activeFeed === feed.id
                    ? "!bg-transparent"
                    : ""
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-left pr-4 flex-1">
                  <Badge variant="outline" className="shrink-0 w-fit text-xs">
                    Q{idx + 1}
                  </Badge>
                  <span className="text-sm md:text-base font-medium leading-relaxed line-clamp-2 sm:line-clamp-1">
                    {feed.question}
                  </span>
                </div>
                <div className={cn(
                  "shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold text-sm",
                  getRatingBgColor(feed.rating),
                  getRatingColor(feed.rating)
                )}>
                  <Star className="w-4 h-4 fill-current" />
                  {feed.rating}
                </div>
              </AccordionTrigger>

              <AccordionContent className="!px-6 !pb-6 !pt-2 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <Card className="!hover:!shadow-card !cursor-default p-0 overflow-hidden border-success/20">
                    <div className="px-5 py-3 bg-success/5 border-b border-border flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-success/15">
                        <CircleCheck className="w-4 h-4 text-success" />
                      </div>
                      <CardTitle className="text-sm !font-semibold">Expected Answer</CardTitle>
                    </div>
                    <div className="p-5">
                      <CardDescription className="!text-sm !leading-relaxed !text-foreground/80">
                        {feed.correct_ans}
                      </CardDescription>
                    </div>
                  </Card>

                  <Card className="!hover:!shadow-card !cursor-default p-0 overflow-hidden border-warning/20">
                    <div className="px-5 py-3 bg-warning/5 border-b border-border flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-warning/15">
                        <MessageSquare className="w-4 h-4 text-warning" />
                      </div>
                      <CardTitle className="text-sm !font-semibold">Your Answer</CardTitle>
                    </div>
                    <div className="p-5">
                      <CardDescription className="!text-sm !leading-relaxed !text-foreground/80">
                        {feed.user_ans}
                      </CardDescription>
                    </div>
                  </Card>

                  <Card className="!hover:!shadow-card !cursor-default p-0 overflow-hidden border-primary/20">
                    <div className="px-5 py-3 bg-primary/5 border-b border-border flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/15">
                        {feed.rating >= 7 ? (
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <CardTitle className="text-sm !font-semibold">AI Feedback & Improvement Tips</CardTitle>
                    </div>
                    <div className="p-5">
                      <CardDescription className="!text-sm !leading-relaxed !text-foreground/80">
                        {feed.feedback}
                      </CardDescription>
                    </div>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Card className="!hover:!shadow-card !cursor-default !bg-card/50 border-dashed !border-2">
          <div className="p-12 md:p-16 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center mb-2">
              <MessageSquare className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              No feedback available yet
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-md">
              Complete your interview questions first to receive personalized AI feedback on your performance.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};
