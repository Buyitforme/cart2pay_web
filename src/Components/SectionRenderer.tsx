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
      {/* Left Section */}
      <div className="flex justify-center items-center w-full">
        {left}
      </div>

      {/* Right Section */}
      <div className="flex justify-center md:justify-start items-center w-full">
        {right}
      </div>
    </div>
  );
};


export default SectionRenderer;
