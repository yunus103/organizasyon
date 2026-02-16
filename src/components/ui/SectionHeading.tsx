import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  center?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  className,
  center = true,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-16 space-y-4", center && "text-center", className)}>
      {subtitle && (
        <span className="block text-sm font-bold uppercase tracking-widest text-secondary/90 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {subtitle}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-bold font-serif text-primary leading-tight drop-shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-700 delay-100">
        {title}
      </h2>
      <div
        className={cn(
          "h-1.5 w-24 bg-gradient-to-r from-secondary to-secondary/60 mt-6 rounded-full animate-in zoom-in duration-500 delay-200",
          center ? "mx-auto" : ""
        )}
      />
    </div>
  );
}
