import React, { useState} from "react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${className || ""}`}>
      {/* Skeleton while loading */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse rounded-xl">
          <span className="text-gray-400 text-sm">Loading...</span>
        </div>
      )}

   <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover transition-opacity duration-500 ${
        loaded ? "opacity-100" : "opacity-0"
      } ${className || ""}`}
      onLoad={() => setLoaded(true)}
      loading="lazy"
    />
    </div>
  );
};

export default LazyImage;

