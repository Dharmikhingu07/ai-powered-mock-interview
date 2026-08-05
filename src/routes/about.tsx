import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Target,
  Brain,
  ShieldCheck,
  Briefcase,
  Video,
  BarChart3,
  Users,
  TrendingUp,
  Bot,
  MessageSquare,
  LayoutDashboard,
  Award,
} from "lucide-react";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AboutPage = () => {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) {
      setTimeout(
        () =>
          document
            .getElementById(id)
            ?.scrollIntoView({ behavior: "smooth", block: "start" }),
        50
      );
    }
  }, []);

  const stats = [
    { value: "250k+", label: "Offers Received", icon: Briefcase },
    { value: "1.2M+", label: "Interviews Aced", icon: TrendingUp },
    { value: "98%", label: "Success Rate", icon: CheckCircle2 },
    { value: "50k+", label: "Active Users", icon: Users },
  ];

  const whyChooseUs = [
    {
      icon: Target,
      title: "Proven Results",
      description:
        "98% of our users report improved confidence and higher success rates in real interviews after just 3 practice sessions.",
    },
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description:
        "Built on Google Gemini, our engine generates role-specific questions that match the exact difficulty of FAANG-level interviews.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted & Secure",
      description:
        "Enterprise-grade security with Clerk authentication, end-to-end encryption, and zero data reselling — ever.",
    },
  ];

  const steps = [
    {
      step: "01",
      icon: Briefcase,
      title: "Configure Interview",
      description:
        "Choose your target role, years of experience, tech stack, and describe the job position you're preparing for.",
    },
    {
      step: "02",
      icon: Sparkles,
      title: "AI Generates Questions",
      description:
        "Our Gemini-powered engine crafts 5 tailored interview questions along with detailed, high-quality reference answers.",
    },
    {
      step: "03",
      icon: Video,
      title: "Practice with Camera On/Off",
      description:
        "Record your responses with optional video and live real-time speech-to-text transcription, reviewing each answer as you go.",
    },
    {
      step: "04",
      icon: BarChart3,
      title: "Get Instant Feedback",
      description:
        "Receive a scored rating (1–10) with specific strengths, areas for improvement, and AI suggestions to refine your answer.",
    },
  ];

  const features = [
    {
      icon: Bot,
      title: "AI Question Generation",
      description:
        "Context-aware questions tailored to your role, seniority, and technology stack.",
    },
    {
      icon: MessageSquare,
      title: "Real-time Speech Analysis",
      description:
        "Live transcription as you speak so you can review and refine every word.",
    },
    {
      icon: Target,
      title: "Role-specific Prep",
      description:
        "Frontend, backend, fullstack, data, DevOps — every specialty gets dedicated attention.",
    },
    {
      icon: Award,
      title: "Unlimited Interviews",
      description:
        "No daily caps. Practice as many interviews as you need until you're confident.",
    },
    {
      icon: Video,
      title: "Video Recording Practice",
      description:
        "Optional camera support so you can improve eye contact, posture, and presence.",
    },
    {
      icon: LayoutDashboard,
      title: "Progress Dashboard",
      description:
        "Track all past interviews, feedback trends, and ratings over time.",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <Container className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            About InterviewAI
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05] mb-6">
            Revolutionizing Interview Prep with{" "}
            <span className="text-gradient-primary">AI</span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto mb-10">
            We started InterviewAI with one simple mission: give every candidate
            the same high-quality interview practice previously available only
            to those with expensive coaches. Today, our AI platform helps
            hundreds of thousands of candidates land their dream jobs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/services">
              <Button size="lg">
                Explore Services
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* Our Mission */}
      <Container className="pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-card-hover border border-border aspect-[4/3]">
            <img
              src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20modern%20AI%20software%20company%20team%20collaborating%20in%20bright%20open-plan%20office%2C%20premium%20SaaS%20marketing%20illustration%2C%20soft%20lighting%2C%20indigo%20violet%20accents%2C%20high%20quality%2C%20photorealistic%2C%20no%20cartoons%2C%20no%20robots&image_size=landscape_4_3"
              alt="Our team working together"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
          </div>
          <div>
            <Badge
              variant="outline"
              className="px-3 py-1 mb-5 border-primary/30 text-primary bg-primary/5"
            >
              Our Mission
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              Equip every candidate with the tools to shine
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-8">
              We believe talent is everywhere, but opportunity isn't. Our
              mission is to level the playing field by combining cutting-edge
              large language models with proven interviewing methodology — so
              candidates can walk into any room with the confidence of someone
              who's already prepared 100 times.
            </p>
            <ul className="space-y-4">
              {[
                "Make quality interview prep accessible to everyone, everywhere, regardless of budget or background.",
                "Leverage AI to deliver personalized, role-specific practice at a scale human coaches simply cannot match.",
                "Close the confidence gap with actionable, unbiased feedback that gets better every single day.",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-success/15 text-success">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-base leading-relaxed text-foreground/80">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Why Choose Us */}
      <Container className="pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
          <Badge
            variant="outline"
            className="px-3 py-1 mb-5 border-primary/30 text-primary bg-primary/5"
          >
            Why Choose Us
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Built by interviewers, for candidates
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            Our founding team has run thousands of real interviews at top-tier
            tech companies. We've baked everything we learned into every
            question, rubric, and line of feedback.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {whyChooseUs.map((item, i) => {
            const Icon = item.icon;
            return (
              <Card key={i} className="p-7 space-y-5 group">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary group-hover:bg-gradient-primary group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>

      {/* How It Works */}
      <Container className="pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
          <Badge
            variant="outline"
            className="px-3 py-1 mb-5 border-primary/30 text-primary bg-primary/5"
          >
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Four steps to interview confidence
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            A complete interview practice loop — configure, generate, practice,
            improve. Repeat until you're ready.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Card
                key={i}
                className="p-6 relative group overflow-hidden"
              >
                <div className="absolute -top-6 -right-6 text-7xl font-extrabold text-primary/5 select-none pointer-events-none">
                  {s.step}
                </div>
                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-primary/10 text-primary group-hover:bg-gradient-primary group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold tracking-wider text-primary">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>

      {/* Features Grid */}
      <Container className="pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
          <Badge
            variant="outline"
            className="px-3 py-1 mb-5 border-primary/30 text-primary bg-primary/5"
          >
            Platform Features
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Everything you need, nothing you don't
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            We deliberately keep the product focused. What's in the box is
            polished, useful, and beautifully designed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Card key={i} className="p-6 group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary group-hover:bg-gradient-primary group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {f.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {f.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>

      {/* Statistics */}
      <Container className="pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Trusted by candidates worldwide
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            Numbers don't lie. Here's what our community has achieved so far.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="relative group p-6 rounded-2xl border border-border bg-card shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary group-hover:bg-gradient-primary group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </Container>

      {/* CTA Banner */}
      <Container className="pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12 lg:p-14">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-primary/20 to-violet-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-br from-violet-500/20 to-primary/10 blur-3xl pointer-events-none" />
          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-5">
              Ready to ace your next interview?
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-8 mx-auto max-w-2xl">
              Join 50,000+ developers who practiced with InterviewAI and
              landed roles at companies they love. Free to start. No credit
              card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
