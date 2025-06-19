import React, { useState } from "react";
import clsx from "clsx";

interface ImageWithLoaderProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  loaderClassName?: string;
}

export const ImageRenderer: React.FC<ImageWithLoaderProps> = ({
  src,
  alt,
  className = "",
  loaderClassName = "",
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={clsx("relative overflow-hidden", className)}>
      {!loaded && (
        <div
          className={clsx(
            "absolute inset-0 bg-gray-100 animate-pulse ",
            loaderClassName
          )}
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={clsx(
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          "w-full h-full object-cover"
        )}
        {...props}
      />
    </div>
  );
};
