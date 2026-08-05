import { Headings } from "@/components/headings";
import { InterviewPin } from "@/components/pin";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/config/firebase.config";
import { Interview } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Plus, FileQuestion, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export const Dashboard = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    setLoading(true);
    const interviewQuery = query(
      collection(db, "interviews"),
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(
      interviewQuery,
      (snapshot) => {
        const interviewList: Interview[] = snapshot.docs.map((doc) => {
          const id = doc.id;
          return {
            id,
            ...doc.data(),
          };
        }) as Interview[];
        setInterviews(interviewList);
        setLoading(false);
      },
      (error) => {
        console.error("Error on fetching interviews:", error);

        let errorDescription = "Failed to load interviews. Please try again later.";
        if (error instanceof Error) {
          const msg = error.message.toLowerCase();
          if (msg.includes("permission-denied") || msg.includes("permission denied")) {
            errorDescription = "Permission denied. Check Firestore security rules or authentication.";
          } else if (msg.includes("unavailable") || msg.includes("network")) {
            errorDescription = "Network error. Check your connection and try again.";
          } else if (msg.includes("not-found")) {
            errorDescription = "Collection not found.";
          } else {
            errorDescription = error.message;
          }
        }

        toast.error("Error", {
          description: errorDescription,
        });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return (
    <>
      <div className="flex w-full flex-col md:flex-row md:items-center justify-between gap-6">
        <Headings
          title="Dashboard"
          description="Create and start your AI Mock interview"
        />
        <Link to={"/generate/create"}>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> Add New Interview
          </Button>
        </Link>
      </div>

      <Separator className="my-8" />

      {interviews.length > 0 && !loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-6 rounded-2xl border border-border bg-card shadow-card hover:shadow-card-hover transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary">
                <FileQuestion className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold tracking-tight text-foreground mb-1">
              {interviews.length}
            </p>
            <p className="text-sm font-medium text-muted-foreground">
              Total Interviews
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card shadow-card hover:shadow-card-hover transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-success/10 text-success">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold tracking-tight text-foreground mb-1">
              {interviews.reduce((acc, i) => acc + (i.questions?.length || 0), 0)}
            </p>
            <p className="text-sm font-medium text-muted-foreground">
              Total Questions
            </p>
          </div>
        </div>
      )}

      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 py-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-40 md:h-44 rounded-2xl" />
          ))
        ) : interviews.length > 0 ? (
          interviews.map((interview) => (
            <InterviewPin key={interview.id} interview={interview} />
          ))
        ) : (
          <div className="lg:col-span-3 w-full flex flex-grow items-center justify-center flex-col py-24 px-6 rounded-3xl border-2 border-dashed border-border bg-card/50">
            <div className="w-24 h-24 rounded-3xl bg-muted flex items-center justify-center mb-6">
              <FileQuestion className="w-12 h-12 text-muted-foreground/50" />
            </div>

            <h2 className="text-xl font-semibold text-foreground mb-2">
              No interviews yet
            </h2>

            <p className="w-full md:w-96 text-center text-sm leading-relaxed text-muted-foreground mb-6">
              Create your first mock interview to start practicing with AI-generated
              questions tailored to your dream role.
            </p>

            <Link to={"/generate/create"}>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1.5" />
                Create Your First Interview
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
