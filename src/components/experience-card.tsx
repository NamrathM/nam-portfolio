
import { cn } from "@/lib/utils";

interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  description: string;
  isLeft?: boolean;
  isVisible?: boolean;
}

export function ExperienceCard({
  company,
  role,
  period,
  description,
  isLeft = false,
  isVisible = false,
}: ExperienceCardProps) {
  return (
    <div
      className={cn(
        "relative grid md:grid-cols-5 items-start gap-6 md:gap-8",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12",
        "transition-all duration-700"
      )}
    >
      {/* Timeline dot and line */}
      <div className="hidden md:flex absolute top-7 left-1/2 md:left-[20%] transform -translate-x-1/2 md:translate-x-0 items-center justify-center z-10">
        <div className="w-4 h-4 rounded-full bg-primary"></div>
      </div>
      <div className="hidden md:block absolute top-7 left-1/2 md:left-[20%] bottom-0 transform -translate-x-1/2 md:translate-x-0 w-0.5 bg-border h-full z-0"></div>

      {/* Date - Visible on all screens but positioned differently */}
      <div className={cn(
        "md:col-span-1",
        isLeft ? "md:text-right" : "",
        "md:pr-8 mb-2 md:mb-0"
      )}>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
          {period}
        </span>
      </div>

      {/* Content */}
      <div className={cn(
        "md:col-span-4 bg-card p-6 rounded-2xl border shadow-sm",
        isLeft ? "md:col-start-2" : "md:col-start-2",
      )}>
        <h3 className="text-xl font-bold mb-1">{company}</h3>
        <p className="text-primary font-medium mb-3">{role}</p>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
