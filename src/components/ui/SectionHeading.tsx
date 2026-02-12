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
    <div className={cn("mb-12 space-y-2", center && "text-center", className)}>
      {subtitle && (
        <span className="block text-sm font-bold uppercase tracking-wider text-secondary">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl font-bold font-serif md:text-4xl text-primary">
        {title}
      </h2>
      <div
        className={cn(
          "h-1 w-20 bg-secondary mt-4 rounded-full",
          center ? "mx-auto" : ""
        )}
      />
    </div>
  );
}
