import React, { useState } from "react";

export const StepImage = ({ src, alt, stepNumber }: { src: string; alt: string; stepNumber: number }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex-1 lg:w-1/2 relative">
      {/* Reserve image space to prevent layout shift */}
      <div className="aspect-[4/3] w-full relative">
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-contain transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Step number – fade in only after image loads */}
      {loaded && (
        <div className="absolute top-4 right-0 lg:top-6 lg:right-0 w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center font-bold text-lg transition-opacity duration-500 opacity-100">
          {stepNumber}
        </div>
      )}
    </div>
  );
};
