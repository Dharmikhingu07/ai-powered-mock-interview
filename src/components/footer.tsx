import React from "react";

import { Facebook, Twitter, Instagram, Linkedin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "@/components/container";
import { MainRoutes } from "@/lib/helpers";

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200"
    >
      {icon}
    </a>
  );
};

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, children }) => {
  return (
    <li>
      <Link
        to={to}
        className="text-sm text-gray-400 hover:text-white transition-colors duration-200 leading-relaxed"
      >
        {children}
      </Link>
    </li>
  );
};

export const Footer = () => {
  return (
    <div className="w-full bg-[#0F172A] text-gray-300 mt-16">
      <div className="border-t border-white/5">
        <Container className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            <div className="lg:col-span-1">
              <Link to={"/"} className="flex items-center gap-2 mb-6">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-primary">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-base font-bold tracking-tight text-white">
                    InterviewAI
                  </span>
                  <span className="text-[10px] font-medium text-gray-400 tracking-wider uppercase">
                    Mock Platform
                  </span>
                </div>
              </Link>
              <p className="text-sm leading-relaxed text-gray-400 mb-6">
                We are committed to helping you unlock your full potential with
                AI-powered tools.
              </p>
              <div className="flex gap-3">
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
            </div>

            <div>
              <h3 className="font-semibold text-base mb-5 text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {MainRoutes.map((route) => (
                  <FooterLink key={route.href} to={route.href}>
                    {route.label}
                  </FooterLink>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-5 text-white">
                Services
              </h3>
              <ul className="space-y-3">
                <FooterLink to="/services#ai-mock-interviews">
                  Interview Preparation
                </FooterLink>
                <FooterLink to="/services#career-coaching">
                  Career Coaching
                </FooterLink>
                <FooterLink to="/services#resume-review">
                  Resume Review
                </FooterLink>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-5 text-white">
                Contact Us
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-gray-400 leading-relaxed">
                  123 AI Street, Tech City, 12345
                </p>
                <p className="text-sm text-gray-400">support@interviewai.com</p>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} InterviewAI. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/contact#privacy-policy"
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/contact#terms-of-service"
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
