import { Sparkles, ArrowRight, CheckCircle2, Briefcase, Users, TrendingUp } from "lucide-react";
import Marquee from "react-fast-marquee";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { MarqueImg } from "@/components/marquee-img";
import { Link } from "react-router-dom";
import bgImage2 from "@/assets/images/bg-image.jpg";
import aiInsight from "@/assets/images/ai-insight.jpg";

const HomePage = () => {
  const stats = [
    {
      value: "250k+",
      label: "Offers Received",
      icon: Briefcase,
    },
    {
      value: "1.2M+",
      label: "Interviews Aced",
      icon: TrendingUp,
    },
    {
      value: "98%",
      label: "Success Rate",
      icon: CheckCircle2,
    },
    {
      value: "50k+",
      label: "Active Users",
      icon: Users,
    },
  ];

  return (
    <div className="flex-col w-full">
      <Container className="pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Powered by AI Interview Intelligence
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05] mb-6">
            Ace your next interview with{" "}
            <span className="text-gradient-primary">AI Superpower</span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto mb-10">
            Boost your interview skills and increase your success rate with
            AI-driven insights. Discover a smarter way to prepare, practice, and
            stand out from the competition.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={"/generate"}>
              <Button size="lg">
                Start Practicing
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to={"/signin"}>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="relative group p-6 rounded-2xl border border-border bg-card shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
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

<div className="relative w-full rounded-3xl overflow-hidden shadow-card-hover border border-border">
          <img
            src={bgImage2}
            alt="AI Mock Interview Platform"
            className="w-full h-[360px] md:h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent pointer-events-none" />

          <div className="absolute top-6 left-6 px-5 py-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-card">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-primary">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-foreground">Interview Copilot&copy;</span>
            </div>
          </div>

          <div className="hidden md:block absolute w-96 bottom-6 right-6 p-6 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/50 shadow-card-hover">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                JD
              </div>
              <div>
                <h3 className="font-semibold text-foreground">John Developer</h3>
                <p className="text-xs text-muted-foreground">Senior Engineer Candidate</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground mb-4">
              Practice with realistic AI-generated questions tailored to your
              role, tech stack, and experience level. Get instant feedback.
            </p>
            <Link to={"/generate"}>
              <Button size="sm">
                Generate <Sparkles className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      <div className="w-full py-8 border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-5 md:px-8 mb-6">
          <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Trusted by teams at leading companies
          </p>
        </div>
        <Marquee pauseOnHover speed={40}>
          <MarqueImg img="/assets/img/logo/firebase.png" />
          <MarqueImg img="/assets/img/logo/meet.png" />
          <MarqueImg img="/assets/img/logo/zoom.png" />
          <MarqueImg img="/assets/img/logo/microsoft.png" />
          <MarqueImg img="/assets/img/logo/react.png" />
          <MarqueImg img="/assets/img/logo/tailwindcss.png" />
        </Marquee>
      </div>

      <Container className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Unleash your potential with{" "}
            <span className="text-gradient-primary">AI insights</span>
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Personalized AI insights and targeted interview practice to help you
            land your dream job.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-card-hover border border-border">
<img
                src={aiInsight}
                alt="Professional workspace"
                className="w-full h-80 md:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
            </div>
          </div>

          <div className="lg:col-span-2 order-1 lg:order-2 flex flex-col gap-6">
            <div className="p-6 rounded-2xl border border-border bg-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground mb-2">
                AI-Powered Questions
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Get questions generated based on your role, tech stack, and
                experience level.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-success/10 text-success mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground mb-2">
                Instant Feedback
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Receive detailed ratings and personalized improvement suggestions
                after each answer.
              </p>
            </div>

            <Link to={"/generate/create"} className="block">
              <Button size="lg" className="w-full">
                Start Your Interview <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
