import React from "react";

type SkillsMarqueeProps = {
  className?: string;
  gap?: string;
  duration?: string;
};

const skillFiles = import.meta.glob<string>(
  "/public/images/skills/*.{png,svg,webp,jpg,jpeg}",
  {
    eager: true,
    as: "url",
  }
);

const normalizePublicUrl = (path: string) => {
  return path.startsWith("/public/") ? path.slice("/public".length) : path;
};

const skillImages = Object.keys(skillFiles)
  .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
  .map((path) => normalizePublicUrl(path));

const labelMap: Record<string, string> = {
  aws: "AWS",
  azure: "Azure",
  "css-3": "CSS",
  dotnet: ".NET",
  gemini: "Gemini",
  git: "Git",
  gpt: "GPT",
  java: "Java",
  js: "JavaScript",
  mysql: "MySQL",
  postgresql: "PostgreSQL",
  react: "React",
  spring: "Spring",
  typescript: "TypeScript",
  vue: "Vue.js",
};

const formatLabel = (url: string) => {
  const fileName = url.split("/").pop() ?? "";
  const base = fileName.replace(/\.[^.]+$/, "");
  const normalized = base.toLowerCase();
  if (labelMap[normalized]) {
    return labelMap[normalized];
  }
  const cleaned = base.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return "Skill";
  }
  return `${cleaned.charAt(0).toUpperCase()}${cleaned.slice(1)}`;
};

const joinClasses = (...classes: Array<string | undefined>) => {
  return classes.filter(Boolean).join(" ");
};

export const SkillsMarquee = ({
  className,
  gap = "2.75rem",
  duration = "48s",
}: SkillsMarqueeProps) => {
  if (!skillImages.length) {
    return null;
  }

  return (
    <div
      className={joinClasses(
        "skills-marquee",
        "w-full",
        "max-w-4xl",
        "overflow-hidden",
        "rounded-3xl",
        "bg-white",
        "px-6",
        "py-4",
        "shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]",
        "sm:px-8",
        "sm:py-5",
        "md:px-10",
        "md:py-6",
        className
      )}
      style={
        {
          "--skills-marquee-gap": gap,
          "--skills-marquee-duration": duration,
        } as React.CSSProperties
      }
    >
      <div className="skills-marquee-track flex w-max items-center">
        {[0, 1].map((groupIndex) => (
          <ul
            key={`group-${groupIndex}`}
            aria-hidden={groupIndex === 1 ? "true" : undefined}
            className="flex items-center gap-[var(--skills-marquee-gap)] pr-[var(--skills-marquee-gap)]"
          >
            {skillImages.map((src) => {
              const label = formatLabel(src);
              return (
                <li
                  key={`${groupIndex}-${src}`}
                  className="flex h-10 w-10 items-center justify-center sm:h-11 sm:w-11"
                >
                  <img
                    src={src}
                    alt={label}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
};
