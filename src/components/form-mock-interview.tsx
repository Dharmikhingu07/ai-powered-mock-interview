import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Interview } from "@/types";

import { CustomBreadCrumb } from "./custom-bread-crumb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { Headings } from "./headings";
import { Button } from "./ui/button";
import { Loader, Trash2, Sparkles, Briefcase, FileText, Clock, Layers } from "lucide-react";
import { Separator } from "./ui/separator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { chatSession } from "@/scripts";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { Card } from "./ui/card";

interface FormMockInterviewProps {
  initialData: Interview | null;
}

const formSchema = z.object({
  position: z
    .string()
    .min(1, "Position is required")
    .max(100, "Position must be 100 characters or less"),
  description: z.string().min(10, "Description is required"),
  experience: z.coerce
    .number()
    .min(0, "Experience cannot be empty or negative"),
  techStack: z.string().min(1, "Tech stack must be at least a character"),
});

type FormData = z.infer<typeof formSchema>;

export const FormMockInterview = ({ initialData }: FormMockInterviewProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {},
  });

  const { isValid, isSubmitting } = form.formState;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useAuth();

  const title = initialData
    ? initialData.position
    : "Create a new mock interview";

  const breadCrumpPage = initialData ? initialData?.position : "Create";
  const actions = initialData ? "Save Changes" : "Create Interview";
  const toastMessage = initialData
    ? { title: "Updated..!", description: "Changes saved successfully..." }
    : { title: "Created..!", description: "New Mock Interview created..." };

  const cleanAiResponse = (responseText: string) => {
    let cleanText = responseText.trim();
    cleanText = cleanText.replace(/(json|```|`)/g, "");
    const jsonArrayMatch = cleanText.match(/\[.*\]/s);
    if (jsonArrayMatch) {
      cleanText = jsonArrayMatch[0];
    } else {
      throw new Error("No JSON array found in response");
    }

    try {
      return JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };

  const generateAiResponse = async (data: FormData) => {
    const prompt = `
        As an experienced prompt engineer, generate a JSON array containing 5 technical interview questions along with detailed answers based on the following job information. Each object in the array should have the fields "question" and "answer", formatted as follows:

        [
          { "question": "<Question text>", "answer": "<Answer text>" },
          ...
        ]

        Job Information:
        - Job Position: ${data?.position}
        - Job Description: ${data?.description}
        - Years of Experience Required: ${data?.experience}
        - Tech Stacks: ${data?.techStack}

        The questions should assess skills in ${data?.techStack} development and best practices, problem-solving, and experience handling complex requirements. Please format the output strictly as an array of JSON objects without any additional labels, code blocks, or explanations. Return only the JSON array with questions and answers.
        `;

    const aiResult = await chatSession.sendMessage(prompt);
    const cleanedResponse = cleanAiResponse(aiResult.response.text());

    return cleanedResponse;
  };

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      const msg = error.message.toLowerCase();

      if (msg.includes("permission-denied") || msg.includes("permission denied") || msg.includes("unauthorized")) {
        return "Permission denied. Please check your authentication or database security rules.";
      }
      if (msg.includes("not-found") || msg.includes("not found")) {
        return "Resource not found. The document may have been deleted.";
      }
      if (msg.includes("unavailable") || msg.includes("network") || msg.includes("failed to fetch")) {
        return "Network error. Please check your internet connection and try again.";
      }
      if (msg.includes("deadline-exceeded") || msg.includes("timeout")) {
        return "Request timed out. Please try again.";
      }
      if (msg.includes("invalid json") || msg.includes("no json array found")) {
        return "AI response format error. The AI returned an unexpected response. Please try again.";
      }
      if (msg.includes("api key") || msg.includes("apikey") || msg.includes("quota") || msg.includes("rate limit")) {
        return "AI API error. API key or quota issue. Please check your Gemini API key.";
      }
      if (msg.includes("model") && (msg.includes("not found") || msg.includes("invalid") || msg.includes("unknown"))) {
        return "AI model error. The selected AI model is unavailable or invalid.";
      }
      if (msg.includes("safety") || msg.includes("harm_category") || msg.includes("blocked")) {
        return "Content blocked. The request was blocked by AI safety settings. Try reformulating your inputs.";
      }

      return error.message;
    }

    if (typeof error === "object" && error !== null && "message" in error) {
      return String((error as { message: unknown }).message);
    }

    return "Unknown error occurred. Please try again later.";
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      if (!userId) {
        throw new Error("User not authenticated. Please sign in and try again.");
      }

      if (!isValid) {
        throw new Error("Form is invalid. Please check all fields and try again.");
      }

      if (initialData) {
        const aiResult = await generateAiResponse(data);

        await updateDoc(doc(db, "interviews", initialData.id), {
          questions: aiResult,
          ...data,
          updatedAt: serverTimestamp(),
        });

        toast(toastMessage.title, { description: toastMessage.description });
      } else {
        const aiResult = await generateAiResponse(data);

        await addDoc(collection(db, "interviews"), {
          ...data,
          userId,
          questions: aiResult,
          createdAt: serverTimestamp(),
        });

        toast(toastMessage.title, { description: toastMessage.description });
      }

      navigate("/generate", { replace: true });
    } catch (error) {
      console.error("Interview save error:", error);
      const errorMessage = getErrorMessage(error);
      toast.error("Error", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialData) {
      form.reset({
        position: initialData.position,
        description: initialData.description,
        experience: initialData.experience,
        techStack: initialData.techStack,
      });
    }
  }, [initialData, form]);

  const fields = [
    {
      name: "position" as const,
      label: "Job Role / Job Position",
      placeholder: "e.g. Full Stack Developer",
      icon: Briefcase,
      description: "Enter the position or job role you're interviewing for",
    },
    {
      name: "description" as const,
      label: "Job Description",
      placeholder: "Describe the job role, responsibilities, and requirements...",
      icon: FileText,
      description: "Provide a detailed description to generate relevant questions",
      textarea: true,
    },
    {
      name: "experience" as const,
      label: "Years of Experience",
      placeholder: "e.g. 5",
      icon: Clock,
      description: "Specify the required years of experience",
      type: "number",
    },
    {
      name: "techStack" as const,
      label: "Tech Stacks",
      placeholder: "e.g. React, TypeScript, Node.js, PostgreSQL",
      icon: Layers,
      description: "List the technologies, separated by commas, that should be covered",
      textarea: true,
    },
  ];

  return (
    <div className="w-full flex-col space-y-6">
      <CustomBreadCrumb
        breadCrumbPage={breadCrumpPage}
        breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
      />

      <div className="mt-2 flex items-center justify-between w-full">
        <Headings title={title} isSubHeading />

        {initialData && (
          <Button size={"icon"} variant={"ghost"} className="hover:text-error hover:bg-error/10">
            <Trash2 className="min-w-4 min-h-4" />
          </Button>
        )}
      </div>

      <Separator className="my-2" />

      <FormProvider {...form}>
        <Card className="!hover:!shadow-card p-0 overflow-hidden !cursor-default">
          <div className="p-2 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-b border-border">
            <div className="p-5 md:p-7 flex items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-primary shadow-button">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-foreground mb-1">
                  {initialData ? "Update Interview Setup" : "Configure Interview"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Fill in the details below and let our AI generate 5 tailored interview questions for you
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full p-7 md:p-10 flex-col flex items-start justify-start gap-8"
          >
            {fields.map((field) => {
              const Icon = field.icon;
              return (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ fieldState, formState, ...fieldProps }) => (
                    <FormItem className="w-full space-y-3">
                      <div className="w-full flex items-start justify-between gap-4">
                        <div>
                          <FormLabel className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                              <Icon className="w-4 h-4" />
                            </div>
                            {field.label}
                          </FormLabel>
                          {field.description && (
                            <p className="text-xs text-muted-foreground mt-2 ml-10">{field.description}</p>
                          )}
                        </div>
                        <FormMessage className="text-sm text-right" />
                      </div>
                      <FormControl>
                        {field.textarea ? (
                          <Textarea
                            className="min-h-[120px]"
                            disabled={loading}
                            placeholder={field.placeholder}
                            {...fieldProps.field}
                            value={fieldProps.field.value || ""}
                          />
                        ) : (
                          <Input
                            type={field.type || "text"}
                            disabled={loading}
                            placeholder={field.placeholder}
                            {...fieldProps.field}
                            value={fieldProps.field.value || ""}
                          />
                        )}
                      </FormControl>
                    </FormItem>
                  )}
                />
              );
            })}

            <div className="w-full flex flex-col-reverse sm:flex-row items-center sm:justify-end gap-3 pt-4 border-t border-border mt-2">
              <Button
                type="reset"
                size={"sm"}
                variant={"outline"}
                disabled={isSubmitting || loading}
                className="w-full sm:w-auto"
              >
                Reset
              </Button>
              <Button
                type="submit"
                size={"sm"}
                disabled={isSubmitting || !isValid || loading}
                className="w-full sm:w-auto min-w-[180px]"
              >
                {loading ? (
                  <>
                    <Loader className="text-white animate-spin w-4 h-4" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    {actions}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </FormProvider>
    </div>
  );
};
