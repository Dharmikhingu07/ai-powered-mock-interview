import { Interview } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderPage } from "./loader-page";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Video, ShieldCheck } from "lucide-react";
import { QuestionSection } from "@/components/question-section";

export const MockInterviewPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const fetchInterview = async () => {
      if (interviewId) {
        try {
          const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
          if (interviewDoc.exists()) {
            setInterview({
              id: interviewDoc.id,
              ...interviewDoc.data(),
            } as Interview);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchInterview();
  }, [interviewId, navigate]);

  if (isLoading) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  if (!interviewId) {
    navigate("/generate", { replace: true });
  }

  if (!interview) {
    navigate("/generate", { replace: true });
  }

  return (
    <div className="flex flex-col w-full gap-8 py-5">
      <CustomBreadCrumb
        breadCrumbPage="Start"
        breadCrumpItems={[
          { label: "Mock Interviews", link: "/generate" },
          {
            label: interview?.position || "",
            link: `/generate/interview/${interview?.id}`,
          },
        ]}
      />

      <div className="w-full">
        <Alert variant="info" className="p-6 rounded-2xl">
          <Lightbulb className="h-5 w-5" />
          <div className="ml-1">
            <AlertTitle className="text-base font-semibold mb-2">
              Before You Start
            </AlertTitle>
            <AlertDescription className="text-sm leading-relaxed opacity-95 space-y-3">
              <p>
                Press <span className="font-semibold">&ldquo;Record Answer&rdquo;</span> to begin answering the question.
                Once you finish the interview, you&apos;ll receive detailed feedback comparing your
                responses with the ideal answers.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-3 mt-3 border-t border-primary/15">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/15">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-medium">
                    <strong>Your video is never recorded.</strong> You can disable the webcam anytime.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/15">
                    <Video className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-medium">
                    Practice with the camera on or off - it&apos;s up to you!
                  </p>
                </div>
              </div>
            </AlertDescription>
          </div>
        </Alert>
      </div>

      {interview?.questions && interview?.questions.length > 0 && (
        <div className="mt-2 w-full flex flex-col items-start gap-4">
          <QuestionSection questions={interview?.questions} />
        </div>
      )}
    </div>
  );
};
