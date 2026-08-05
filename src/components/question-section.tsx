import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./tooltip-button";
import { Volume2, VolumeX } from "lucide-react";
import { RecordAnswer } from "./record-answer";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Sparkles } from "lucide-react";

interface QuestionSectionProps {
  questions: { question: string; answer: string }[];
}

export const QuestionSection = ({ questions }: QuestionSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWebCam, setIsWebCam] = useState(false);

  const [currentSpeech, setCurrentSpeech] =
    useState<SpeechSynthesisUtterance | null>(null);

  const handlePlayQuestion = (qst: string) => {
    if (isPlaying && currentSpeech) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentSpeech(null);
    } else {
      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(qst);
        window.speechSynthesis.speak(speech);
        setIsPlaying(true);
        setCurrentSpeech(speech);

        speech.onend = () => {
          setIsPlaying(false);
          setCurrentSpeech(null);
        };
      }
    }
  };

  return (
    <div className="w-full space-y-6">
      <Card className="p-2 !hover:!shadow-card !cursor-default bg-muted/30">
        <Tabs
          defaultValue={questions[0]?.question}
          className="w-full space-y-6"
          orientation="vertical"
        >
          <TabsList className="bg-transparent w-full flex flex-wrap items-center justify-start gap-2 p-3">
            {questions?.map((tab, i) => (
              <TabsTrigger
                key={tab.question}
                value={tab.question}
                className={cn(
                  "data-[state=active]:!bg-gradient-primary data-[state=active]:!text-white data-[state=active]:shadow-button"
                )}
              >
                <span className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "px-2 py-0.5 text-[10px]",
                    )}
                  >
                    Q{i + 1}
                  </Badge>
                  <span className="hidden sm:inline">Question {i + 1}</span>
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {questions?.map((tab, i) => (
            <TabsContent key={i} value={tab.question}>
              <Card className="!hover:!shadow-card !cursor-default overflow-hidden border-primary/10">
                <div className="p-2 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-b border-border">
                  <div className="p-5 md:p-6 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-primary shadow-button shrink-0 mt-0.5">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div className="space-y-2">
                        <Badge variant="outline" className="text-xs">
                          Question #{i + 1} of {questions.length}
                        </Badge>
                        <p className="text-base md:text-lg leading-relaxed text-foreground font-medium">
                          {tab.question}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <TooltipButton
                        content={isPlaying ? "Stop Audio" : "Read Question"}
                        icon={
                          isPlaying ? (
                            <VolumeX className="w-4.5 h-4.5 text-muted-foreground" />
                          ) : (
                            <Volume2 className="w-4.5 h-4.5 text-muted-foreground" />
                          )
                        }
                        onClick={() => handlePlayQuestion(tab.question)}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              <div className="mt-8">
                <RecordAnswer
                  question={tab}
                  isWebCam={isWebCam}
                  setIsWebCam={setIsWebCam}
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
};
