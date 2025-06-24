import React from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute z-10 hidden group-hover:flex px-2 py-1 bg-gray-800 text-white text-xs rounded-md top-full mt-1 left-1/2 -translate-x-1/2 w-max max-w-xs whitespace-normal">
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
