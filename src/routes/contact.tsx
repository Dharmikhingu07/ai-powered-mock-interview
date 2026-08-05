import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Loader2,
  Sparkles,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

import { Container } from "@/components/container";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be 80 characters or less"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(120, "Subject must be 120 characters or less"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long (max 2000 characters)"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string" && error.trim()) return error;
  return "Something went wrong. Please try again.";
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-11 h-11 rounded-2xl bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-200"
  >
    {icon}
  </a>
);

const ContactPage = () => {
  const [mapFallback, setMapFallback] = useState(false);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) {
      setTimeout(
        () =>
          document
            .getElementById(id)
            ?.scrollIntoView({ behavior: "smooth", block: "start" }),
        80
      );
    }
  }, []);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
    mode: "onTouched",
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: ContactFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!data.name || !data.email) throw new Error("Please fill all fields.");
      toast.success("Message sent! 🎉", {
        description:
          "Thanks for reaching out. Our team will get back to you within 24 hours.",
      });
      form.reset();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="w-full">
      {/* Top: Breadcrumb + Hero */}
      <Container className="pt-12 md:pt-16 pb-8">
        <CustomBreadCrumb breadCrumbPage="Contact" />
      </Container>

      <Container className="pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Get in Touch
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.05] mb-6">
            We'd love to{" "}
            <span className="text-gradient-primary">hear from you</span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            Have a question, need help, or want to talk enterprise? Drop us a
            line and our team will respond within one business day.
          </p>
        </div>

        {/* Main grid: Form + Info column */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-3">
            <Card className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6 md:mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary flex-shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    Send us a Message
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Have a question or feedback? Fill out the form below and
                    we'll reply within 24 hours.
                  </p>
                </div>
              </div>

              <FormProvider {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                  noValidate
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-semibold">
                            Your Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Jane Doe"
                              autoComplete="name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-semibold">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="jane@company.com"
                              autoComplete="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-semibold">
                          Subject
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="How can we help you?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-semibold">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us more about your inquiry, use case, or any questions you have..."
                            className="min-h-[160px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-border/70">
                    <p className="text-xs text-muted-foreground">
                      By sending, you agree to our Privacy Policy. We'll never
                      share your email.
                    </p>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 ml-1.5" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </Card>
          </div>

          {/* Right: Info + Socials + Map */}
          <div className="lg:col-span-2 space-y-5">
            {/* Contact Info Card */}
            <Card className="p-6 md:p-7 space-y-6">
              <div className="space-y-1">
                <Badge
                  variant="outline"
                  className="px-3 py-1 border-primary/30 text-primary bg-primary/5"
                >
                  Contact Info
                </Badge>
                <h3 className="text-xl font-bold tracking-tight text-foreground mt-3">
                  Reach us directly
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Prefer email, phone, or a quick visit? We're here.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 pt-1">
                    <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
                      Email
                    </p>
                    <a
                      href="mailto:support@interviewai.com"
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors break-all"
                    >
                      support@interviewai.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-success/15 text-success flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 pt-1">
                    <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
                      Phone
                    </p>
                    <a
                      href="tel:+15551234567"
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 pt-1">
                    <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
                      Office Address
                    </p>
                    <p className="text-sm font-medium text-foreground leading-relaxed">
                      123 AI Street
                      <br />
                      Tech City, 12345
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Social Links Card */}
            <Card className="p-6 md:p-7">
              <h4 className="text-sm font-bold tracking-tight text-foreground mb-4">
                Follow Us
              </h4>
              <div className="flex items-center gap-3">
                <SocialLink
                  href="https://facebook.com"
                  icon={<Facebook size={18} />}
                />
                <SocialLink
                  href="https://twitter.com"
                  icon={<Twitter size={18} />}
                />
                <SocialLink
                  href="https://instagram.com"
                  icon={<Instagram size={18} />}
                />
                <SocialLink
                  href="https://linkedin.com"
                  icon={<Linkedin size={18} />}
                />
              </div>
            </Card>

            {/* Map Card */}
            <Card className="p-0 overflow-hidden">
              {!mapFallback ? (
                <iframe
                  title="InterviewAI Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2391974613933!2d-73.98784492416048!3d40.74844097138966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  className="w-full h-56 md:h-64 border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onError={() => setMapFallback(true)}
                />
              ) : (
                <div className="relative w-full h-56 md:h-64 bg-gradient-to-br from-primary/10 via-[#7C3AED]/5 to-sky-500/10 flex items-center justify-center">
                  <div className="text-center space-y-3 p-6">
                    <div className="mx-auto w-14 h-14 rounded-2xl bg-card shadow-card flex items-center justify-center text-primary">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        InterviewAI HQ
                      </p>
                      <p className="text-sm text-muted-foreground">
                        123 AI Street, Tech City, 12345
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </Container>

      {/* Privacy Policy Section */}
      <Container className="pb-8">
        <Card id="privacy-policy" className="p-7 md:p-10 space-y-4 scroll-mt-24">
          <Badge
            variant="outline"
            className="px-3 py-1 border-primary/30 text-primary bg-primary/5"
          >
            Legal
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Privacy Policy
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Last updated:</strong> August
            2025
          </p>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              At InterviewAI, we take your privacy seriously. This Privacy
              Policy explains how we collect, use, and protect your personal
              information when you use our AI-powered interview preparation
              platform.
            </p>
            <p>
              <strong className="text-foreground">
                Information we collect:
              </strong>{" "}
              When you create an account, we collect basic identifying
              information (name, email, and authentication data via Clerk).
              When you use the service, we store interview configurations,
              your recorded responses, and AI feedback in order to display
              your dashboard and performance analytics over time.
            </p>
            <p>
              <strong className="text-foreground">How we use it:</strong> Your
              data is used solely to provide the service, improve our AI
              models in aggregate, and send occasional product updates (you
              can opt out at any time). We never sell your data to third
              parties, and we never use your interview recordings for public
              model training without explicit written consent.
            </p>
            <p>
              <strong className="text-foreground">Security:</strong> All data
              is encrypted in transit and at rest. Authentication is handled
              by Clerk, a SOC 2 Type II compliant provider. Firestore rules
              restrict access so users can read and write only their own
              data.
            </p>
            <p>
              Questions about privacy? Email{" "}
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "mailto:privacy@interviewai.com";
                }}
                className="text-primary hover:underline font-medium"
              >
                privacy@interviewai.com
              </Link>
              .
            </p>
          </div>
        </Card>
      </Container>

      {/* Terms of Service Section */}
      <Container className="pb-20 md:pb-28">
        <Card id="terms-of-service" className="p-7 md:p-10 space-y-4 scroll-mt-24">
          <Badge
            variant="outline"
            className="px-3 py-1 border-primary/30 text-primary bg-primary/5"
          >
            Legal
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Terms of Service
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Last updated:</strong> August
            2025
          </p>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Welcome to InterviewAI. By accessing or using our platform, you
              agree to be bound by these Terms of Service. If you do not
              agree, please do not use the service.
            </p>
            <p>
              <strong className="text-foreground">Acceptable use:</strong>{" "}
              InterviewAI is intended for individual, educational interview
              preparation. You may not use the service to generate spam,
              abuse the AI API, scrape content, create competing products,
              or submit false or harmful information.
            </p>
            <p>
              <strong className="text-foreground">Account &amp; access:</strong>{" "}
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activity that occurs under your
              account. We reserve the right to suspend or terminate accounts
              that violate these terms, at our sole discretion.
            </p>
            <p>
              <strong className="text-foreground">AI disclaimer:</strong>{" "}
              Questions and feedback are generated by Google Gemini and are
              intended for practice purposes only. While we strive for
              quality, we do not guarantee accuracy, completeness, or
              alignment with any specific employer's real interview process.
            </p>
            <p>
              <strong className="text-foreground">Limitation of liability:</strong>{" "}
              The service is provided "as is" without warranties of any kind.
              To the maximum extent permitted by law, InterviewAI shall not
              be liable for any indirect, incidental, special, or
              consequential damages arising from your use of the service.
            </p>
            <p>
              Questions about these terms? Reach out via the contact form
              above or email{" "}
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "mailto:legal@interviewai.com";
                }}
                className="text-primary hover:underline font-medium"
              >
                legal@interviewai.com
              </Link>
              .
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default ContactPage;
