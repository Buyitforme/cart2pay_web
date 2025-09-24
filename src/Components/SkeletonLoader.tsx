interface SkeletonLoaderProps {
  count?: number;
  className?: string;
  lines?: string[]; // Array of Tailwind width classes e.g. ['w-3/4', 'w-1/2']
}

const SkeletonLoader = ({
  count = 4,
  className = "",
  lines = ['w-3/4', 'w-1/2', 'w-2/3'], // default fallback lines
}: SkeletonLoaderProps) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <li
            key={index}
            className={`p-4 border rounded-xl bg-gray-100 animate-pulse space-y-2 ${className}`}
          >
            {lines.map((width, i) => (
              <div key={i} className={`h-4 bg-gray-300 rounded ${width}`} />
            ))}
          </li>
        ))}
    </>
  );
};

export default SkeletonLoader;
