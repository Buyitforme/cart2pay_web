import React, { ReactNode } from "react";

interface SideBySideSectionProps {
  left: ReactNode;
  right: ReactNode;
  reverse?: boolean; // Optional prop to swap sides
  gap?: string; // Tailwind gap class, e.g., "gap-10"
}

const SectionRenderer: React.FC<SideBySideSectionProps> = ({
  left,
  right,
  reverse = false,
  gap = "gap-10",
}) => {
  return (
    <div
      className={`w-full flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center ${gap}`}
    >
      <div className="flex-1">{left}</div>
      <div className="flex-1">{right}</div>
    </div>
  );
};

export default SectionRenderer;
