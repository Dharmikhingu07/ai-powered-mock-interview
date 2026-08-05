import { useAuth } from "@clerk/clerk-react";
import {
  CircleStop,
  Loader,
  Mic,
  RefreshCw,
  Save,
  Video,
  VideoOff,
  WebcamIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import useSpeechToText, { ResultType } from "react-hook-speech-to-text";
import { useParams } from "react-router-dom";
import WebCam from "react-webcam";
import { TooltipButton } from "./tooltip-button";
import { toast } from "sonner";
import { chatSession } from "@/scripts";
import { SaveModal } from "./save-modal";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface RecordAnswerProps {
  question: { question: string; answer: string };
  isWebCam: boolean;
  setIsWebCam: (value: boolean) => void;
}

interface AIResponse {
  ratings: number;
  feedback: string;
}

export const RecordAnswer = ({
  question,
  isWebCam,
  setIsWebCam,
}: RecordAnswerProps) => {
  const {
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswer, setUserAnswer] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<AIResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userId } = useAuth();
  const { interviewId } = useParams();

  const recordUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();

      if (userAnswer?.length < 30) {
        toast.error("Error", {
          description: "Your answer should be more than 30 characters",
        });

        return;
      }

      const aiResult = await generateResult(
        question.question,
        question.answer,
        userAnswer
      );

      setAiResult(aiResult);
    } else {
      startSpeechToText();
    }
  };

  const cleanJsonResponse = (responseText: string) => {
    let cleanText = responseText.trim();
    cleanText = cleanText.replace(/(json|```|`)/g, "");

    try {
      return JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };

  const generateResult = async (
    qst: string,
    qstAns: string,
    userAns: string
  ): Promise<AIResponse> => {
    setIsAiGenerating(true);
    const prompt = `
      Question: "${qst}"
      User Answer: "${userAns}"
      Correct Answer: "${qstAns}"
      Please compare the user's answer to the correct answer, and provide a rating (from 1 to 10) based on answer quality, and offer feedback for improvement.
      Return the result in JSON format with the fields "ratings" (number) and "feedback" (string).
    `;

    try {
      const aiResult = await chatSession.sendMessage(prompt);

      const parsedResult: AIResponse = cleanJsonResponse(
        aiResult.response.text()
      );
      return parsedResult;
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "An error occurred while generating feedback.",
      });
      return { ratings: 0, feedback: "Unable to generate feedback" };
    } finally {
      setIsAiGenerating(false);
    }
  };

  const recordNewAnswer = () => {
    setUserAnswer("");
    setAiResult(null);
    stopSpeechToText();
    startSpeechToText();
  };

  const saveUserAnswer = async () => {
    setLoading(true);

    if (!aiResult) {
      return;
    }

    const currentQuestion = question.question;
    try {
      const userAnswerQuery = query(
        collection(db, "userAnswers"),
        where("userId", "==", userId),
        where("question", "==", currentQuestion)
      );

      const querySnap = await getDocs(userAnswerQuery);

      if (!querySnap.empty) {
        console.log("Query Snap Size", querySnap.size);
        toast.info("Already Answered", {
          description: "You have already answered this question",
        });
        return;
      } else {
        await addDoc(collection(db, "userAnswers"), {
          mockIdRef: interviewId,
          question: question.question,
          correct_ans: question.answer,
          user_ans: userAnswer,
          feedback: aiResult.feedback,
          rating: aiResult.ratings,
          userId,
          createdAt: serverTimestamp(),
        });

        toast("Saved", { description: "Your answer has been saved.." });
      }

      setUserAnswer("");
      setAiResult(null);
      stopSpeechToText();
    } catch (error) {
      toast("Error", {
        description: "An error occurred while generating feedback.",
      });
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(!open);
    }
  };

  useEffect(() => {
    const combineTranscripts = results
      .filter((result): result is ResultType => typeof result !== "string")
      .map((result) => result.transcript)
      .join(" ");

    setUserAnswer(combineTranscripts);
  }, [results]);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <SaveModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={saveUserAnswer}
        loading={loading}
      />

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col items-center justify-center gap-4">
          <Card className="!hover:!shadow-card !cursor-default w-full overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full min-h-[320px] p-0 flex items-center justify-center bg-muted/30">
            {isWebCam ? (
              <WebCam
                onUserMedia={() => setIsWebCam(true)}
                onUserMediaError={() => setIsWebCam(false)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-3xl bg-muted/70">
                  <WebcamIcon className="w-10 h-10 text-muted-foreground/60" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">Camera Off</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Your video is never recorded or stored
                  </p>
                </div>
              </div>
            )}
          </Card>

          <div className="flex items-center justify-center gap-2 flex-wrap">
            <TooltipButton
              content={isWebCam ? "Turn Camera Off" : "Turn Camera On"}
              icon={
                isWebCam ? (
                  <VideoOff className="w-4.5 h-4.5" />
                ) : (
                  <Video className="w-4.5 h-4.5" />
                )
              }
              onClick={() => setIsWebCam(!isWebCam)}
            />

            <div className="h-8 w-px bg-border mx-1" />

            <Button
              size="sm"
              variant={isRecording ? "destructive" : "default"}
              onClick={recordUserAnswer}
              className={cn(
                "!rounded-xl !px-4",
                isRecording && "animate-pulse"
              )}
            >
              {isRecording ? (
                <>
                  <CircleStop className="w-4 h-4 mr-1.5" />
                  Stop
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 mr-1.5" />
                  Record Answer
                </>
              )}
            </Button>

            <TooltipButton
              content="Record Again"
              icon={<RefreshCw className="w-4.5 h-4.5" />}
              onClick={recordNewAnswer}
            />

            <TooltipButton
              content="Save Result"
              icon={
                isAiGenerating ? (
                  <Loader className="w-4.5 h-4.5 animate-spin" />
                ) : (
                  <Save className="w-4.5 h-4.5" />
                )
              }
              onClick={() => setOpen(!open)}
              disbaled={!aiResult}
            />
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-5">
          <Card className="!hover:!shadow-card !cursor-default p-0 overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-muted/70">
                  <Mic className="w-4.5 h-4.5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Your Answer</h3>
                  <p className="text-xs text-muted-foreground">
                    {isRecording ? "Recording in progress..." : userAnswer ? "Transcript ready" : "Start recording to begin"}
                  </p>
                </div>
              </div>
              {userAnswer && (
                <Badge variant="outline" className="text-xs">
                  {userAnswer.length} chars
                </Badge>
              )}
            </div>
            <div className="p-6">
              <p className="text-sm leading-relaxed text-foreground/80 min-h-[100px] whitespace-pre-wrap">
                {userAnswer || (
                  <span className="text-muted-foreground/70 italic">
                    Press &ldquo;Record Answer&rdquo; and start speaking. Your speech will appear here as text...
                  </span>
                )}
              </p>

              {interimResult && (
                <div className="mt-5 pt-4 border-t border-dashed border-border">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-medium">
                    Live Speech
                  </p>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {interimResult}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {aiResult && (
            <Card className="!hover:!shadow-card !cursor-default p-0 overflow-hidden border-success/20 animate-fade-in">
              <div className="px-6 py-4 border-b border-border bg-success/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-success/15">
                    <Loader className="w-4.5 h-4.5 text-success" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">AI Feedback Ready</h3>
                    <p className="text-xs text-muted-foreground">
                      Based on your answer
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-gradient-primary text-white text-sm font-bold shadow-button">
                    {aiResult.ratings} / 10
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed text-foreground/80">
                  {aiResult.feedback}
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
