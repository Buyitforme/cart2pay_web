import React, { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { Text } from "../../../Components/Typography";
import { Skeleton } from "../../../Components/Skeleton";


type Props = {
  url: string;
  className?: string;
};

const ProductPreviewCard: React.FC<Props> = ({ url, className }) => {
  const [meta, setMeta] = useState<{ title: string; image: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) return;

    // Mock delay
    setLoading(true);
    const timeout = setTimeout(() => {
      setMeta({
        title: "ZW Collection Leather Jacket",
        image:
          "https://unsplash.com/photos/brown-long-sleeve-shirt-on-white-clothes-hanger-Fg15LdqpWrs",
      });
      setLoading(false);
    }, 1000); // simulate network latency

    return () => clearTimeout(timeout);
  }, [url]);

  if (!url) return null;

  return (
    <div
      className={`flex items-center gap-4 p-3 border rounded-xl bg-white shadow-sm ${className}`}
    >
      {loading ? (
        <Skeleton className="w-16 h-16 rounded-md" />
      ) : (
        <img
          src={meta?.image}
          alt={meta?.title}
          className="w-16 h-18 object-cover rounded-md"
        />
      )}

      <div className="flex-1">
        {loading ? (
          <Skeleton className="h-4 w-3/4 mb-2" />
        ) : (
          <>
            <Text weight="semibold" size="sm">
              {meta?.title}
            </Text>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-xs underline"
            >
              View product
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPreviewCard;

