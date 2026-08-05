import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-5 md:px-8 py-6", className)}
    >
      {children}
    </div>
  );
};
